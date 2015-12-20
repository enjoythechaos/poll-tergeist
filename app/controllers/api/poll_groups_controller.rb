class Api::PollGroupsController < ApplicationController
  def update
    @poll_group = PollGroup.find(params[:id])
    @poll_group.title = params[:title]
    @poll_group.save
    render text: @poll_group.author_id
  end
end
