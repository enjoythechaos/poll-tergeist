class Api::ResponsesController < ApplicationController
  def create
    @answer_choice_id = params[:answerChoiceId]
    @answer_choice = Response.create({answer_choice_id: @answer_choice_id, respondent_id: 0})
    render text: "200 OK"
  end
end
