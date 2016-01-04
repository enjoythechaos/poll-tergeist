class Api::AnswerChoicesController < ApplicationController
  def destroy
    @answer_choice = AnswerChoice.find(params[:id])
    @answer_choice.destroy
  end

  def create
    @answer_choice = AnswerChoice.new(poll_id: params[:poll_id], letter: "", body: "")
    @answer_choice.save
  end

  def create_batch
    answerChoices = params[:answerChoices]
    answerChoices.each do |index, answer_choice|
      @answer_choice = AnswerChoice.create({poll_id: answer_choice.poll_id, body: answer_choice.answerText})
    end
    render text: "ok"
  end
end
