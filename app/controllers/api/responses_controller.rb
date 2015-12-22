class Api::ResponsesController < ApplicationController
  def create
    @answer_choice_id = params[:answerChoiceId]
    @answer_choice = Response.create({answer_choice_id: @answer_choice_id, respondent_id: 0})
    poll_id = AnswerChoice.find(@answer_choice_id).poll_id

    render status: :ok, json: poll_id
  end
end
