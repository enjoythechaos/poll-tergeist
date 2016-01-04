class Api::PollsController < ApplicationController
  def index
    @poll_groups = PollGroup.includes(:polls).where(author_id: params[:user_id]).order(:created_at)
  end

  def show
    @poll = Poll.includes(:author).where(id: params[:id])[0]
  end

  def create
    @poll = Poll.new({question: params[:poll][:questionText], author_id: params[:user_id]})
    @poll.save
  end

  def ungroup
    poll_ids = params[:polls].map{|x| x.to_i}

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
    @poll_groups = PollGroup.includes(:polls).where(author_id: author_id).order(:created_at)
    render :index
  end

  def group
    poll_ids = params[:polls].map{|x| x.to_i}
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
    @poll_groups = PollGroup.includes(:polls).where(author_id: author_id).order(:created_at)
    render :index
  end

  def delete_batch
    poll_ids = params[:polls].map{|x| x.to_i}
    if !poll_ids.empty?
      first_poll = Poll.find(poll_ids[0])
      author_id = first_poll.author_id
      poll_ids.each do |poll_id|
        poll = Poll.find(poll_id)
        # How to delete answer choices and responses?
        old_poll_group_id = poll.poll_group_id
        poll.destroy!
        pg = PollGroup.find(old_poll_group_id)
        if pg.title != 'Ungrouped' && pg.polls.empty?
          pg.destroy!
        end
      end
    end
    @poll_groups = PollGroup.includes(:polls).where(author_id: author_id).order(:created_at)
    render :index
  end

  def delete_responses
    poll_ids = params[:polls].map{|x| x.to_i}
    if !poll_ids.empty?
      first_poll = Poll.find(poll_ids[0])
      author_id = first_poll.author_id
      poll_ids.each do |poll_id|
        poll = Poll.find(poll_id)
        responses = poll.responses
        responses.each{|response| response.destroy!}
      end
    end
    @poll_groups = PollGroup.includes(:polls).where(author_id: author_id).order(:created_at)
    render :index
  end

  def create_batch
    poll_group_id = PollGroup.where(title: "Ungrouped").where(author_id: params[:user_id])[0].id
    params[:batch].each do |key, poll_form|
      # Here's where I'm going to create the poll id.
      used_identifiers = User.uniq.pluck(:id).sort
      lower_exp = 0
      upper_exp = 2
      valid_new_identifiers = [];
      poll_identifier = nil
      loop do
        i = 10**lower_exp
        loop do
          if !used_identifiers.include?(i)
            valid_new_identifiers << i
          end

          if i == 10**upper_exp - 1
            if !valid_new_identifiers.empty?
              poll_identifier = valid_new_identifiers.sample
              break
            else
              lower_exp = 10**upper_exp
              upper_exp+= 1
              break
            end
          else
            i += 1
          end
        end
        if poll_identifier
          break
        end
      end
      @poll = Poll.new({question: poll_form[:questionText], author_id: params[:user_id], poll_group_id: poll_group_id, poll_identifier: poll_identifier})
      @poll.save!
      poll_id = @poll.id
      poll_form[:answerChoices].each do |key, answer_choice|
        @answer_choice = AnswerChoice.new({poll_id: poll_id, body: answer_choice[:answerText], letter: "Z"})
        @answer_choice.save
      end
    end
    @poll_groups = PollGroup.includes(:polls).where(author_id: params[:user_id]).order(:created_at)
    render :index
  end

  def get_by_poll_identifier
    m = params[:id].match(/([a-zA-Z]+)([0-9]+)/)
    user = ActiveRecord::Base.connection.execute("SELECT * FROM users WHERE LOWER(username) = '#{m[1].downcase}';")[0]
    if user
      @poll = Poll.where(author_id: user["id"], poll_identifier: m[2])[0]
      if @poll
        render :show
      end
    end
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

  def update_with_answer_choices
    @poll = Poll.find(params[:poll][:id])
    if @poll
      @poll.question = params[:poll][:question]
      @poll.save

      answer_choices = params[:answerChoices]
      answer_choices.each do |index, answer_choice|
        id = answer_choice[:id]
        if id != ""
          # The answer choice was already in the database and should be UPDATEd
          @answer_choice = AnswerChoice.find(id) rescue nil
        else
          # The answer choice is new.
          @answer_choice = AnswerChoice.new;
        end
        if @answer_choice
          @answer_choice.poll_id = answer_choice[:poll_id].to_i
          @answer_choice.letter = answer_choice[:letter]
          @answer_choice.body = answer_choice[:body]
          @answer_choice.save
        end
      end
      to_be_deleted = params[:toBeDeleted]
      if to_be_deleted
        to_be_deleted.each do |answer_choice_id|
          answer_choice = AnswerChoice.find(answer_choice_id)
          answer_choice.destroy
        end
      end
    end
    render "api/polls/show.json.jbuilder"
  end

  private

  def update_poll_params
    params.require(:poll).permit(:id, :question, :poll_identifier, :poll_group_id, :locked)
  end
end
