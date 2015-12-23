class Api::SessionsController < ApplicationController
  def show
    @user = User.find_by(session_token: session[:session_token])
    if !@user
      @user = {id: 0, username: "NULL", session_token: nil}
    end
  end
end
