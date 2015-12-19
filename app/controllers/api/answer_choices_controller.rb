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

  def update_batch
    answer_choices = params[:answerChoices]
    answer_choices.each do |index, answer_choice|
      id = answer_choice[:id]
      @answer_choice = AnswerChoice.find(id) rescue nil
      if @answer_choice
        # Happy Case: the answer choice was there and can be updated.
        @answer_choice.poll_id = answer_choice[:poll_id].to_i
        @answer_choice.letter = answer_choice[:letter]
        @answer_choice.body = answer_choice[:body]
        @answer_choice.save
      else
        # The answer choice was deleted elsewhere and needs to be added as a new one.
      end
    end
    render text: "ok!"
  end

  def update
    fail
  end
end
