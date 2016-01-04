class AnswerController < ApplicationController
  def get_by_poll_identifier
    m = params[:id].match(/([a-zA-Z]+)([0-9]+)/)
    user = ActiveRecord::Base.connection.execute("SELECT * FROM users WHERE LOWER(username) = '#{m[1].downcase}';")[0]
    if user
      @poll = Poll.where(author_id: user["id"], poll_identifier: m[2])[0]
      if @poll
        render "/api/polls/show.json.jbuilder"
      end
    end
  end
end
