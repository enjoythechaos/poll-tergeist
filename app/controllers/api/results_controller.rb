class Api::ResultsController < ApplicationController
  def show
    @poll = Poll.find(params[:id])
    @results = @poll.answer_choices_with_totals
  end
end
