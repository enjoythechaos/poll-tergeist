class Api::PollsController < ApplicationController
  def index
    @poll_groups = PollGroup.includes(:polls).where(author_id: params[:user_id])
  end

  def show
    @poll = Poll.includes(:answer_choices).find_by(id: params[:id])
  end

  def create
    @poll = Poll.new({question: params[:poll][:questionText], author_id: params[:user_id]})
    @poll.save
  end

  def ungroup
    poll_ids = params[:polls].keys
    if !poll_ids.empty?
      first_poll = Poll.find(poll_ids[0])
      author_id = first_poll.author_id
      poll_group_id = PollGroup.where(title: "Ungrouped").where(author_id: author_id)[0].id
      poll_ids.each do |poll_id|
        poll = Poll.find(poll_id)
        old_poll_group_id = poll.poll_group_id
        poll.poll_group_id = poll_group_id
        poll.save
        pg = PollGroup.find(old_poll_group_id)
        if pg.title != 'Ungrouped' && pg.polls.empty?
          pg.destroy
        end
      end
    end
    render text: "200 OK"
  end

  def group
    poll_ids = params[:polls].keys
    if !poll_ids.empty?
      first_poll = Poll.find(poll_ids[0])
      author_id = first_poll.author_id
      new_poll_group = PollGroup.new({title: "New Group", author_id: author_id})
      new_poll_group.save
      poll_group_id = new_poll_group.id
      poll_ids.each do |poll_id|
        poll = Poll.find(poll_id)
        old_poll_group_id = poll.poll_group_id
        poll.poll_group_id = poll_group_id
        poll.save
        pg = PollGroup.find(old_poll_group_id)
        if pg.title != 'Ungrouped' && pg.polls.empty?
          pg.destroy
        end
      end
    end
    render text: "200 OK"
  end

  def create_batch
    poll_group_id = PollGroup.where(title: "Ungrouped").where(author_id: params[:user_id])[0].id
    params[:batch].each do |key, poll_form|
      if key.match(/[0-9]+/)
        @poll = Poll.new({question: poll_form[:questionText], author_id: params[:user_id], poll_group_id: poll_group_id})
        @poll.save
        poll_id = @poll.id
        poll_form[:answerChoices].each do |key, answer_choice|
          if key.match(/[0-9]+/)
            @answer_choice = AnswerChoice.new({poll_id: poll_id, body: answer_choice[:answerText], letter: "Z"})
            @answer_choice.save
          end
        end
      end
    end
    render text: "200 OK"
  end

  def update
    id = params[:poll][:id]
    @poll = Poll.find(id)
    @poll.question = params[:poll][:question]
    @poll.poll_identifier = params[:poll][:poll_identifier]
    @poll.poll_group_id = params[:poll][:poll_group_id]
    @poll.locked = params[:poll][:locked]
    @poll.save
  end

  private

  def update_poll_params
    params.require(:poll).permit(:id, :question, :poll_identifier, :poll_group_id, :locked)
  end
end
