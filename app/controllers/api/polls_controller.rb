class Api::PollsController < ApplicationController
  def index
    @polls = Poll.where(author_id: params[:user_id])
  end

  def show
    @poll = Poll.includes(:answer_choices).find_by(id: params[:id])
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
