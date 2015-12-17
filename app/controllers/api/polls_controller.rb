class Api::PollsController < ApplicationController
  def index
    @polls = Poll.where(author_id: params[:user_id])
  end

  def show
    @poll = Poll.includes(:answer_choices).find_by(id: params[:id])
  end

end
