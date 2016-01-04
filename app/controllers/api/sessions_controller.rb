class Api::SessionsController < ApplicationController
  def show
    @user = User.find_by(session_token: session[:session_token])
    if !@user
      @user = {id: 0, username: "NULL", session_token: nil}
    end
  end

  def create
    if (@current_user)
      log_out!
    end

    username = params[:user][:username]
    password = params[:user][:password]
    if username == 'guest'
      User.create_guest_data
    end
    @user = User.find_by_credentials(username, password)
    if @user
      log_in!(@user)
      flash[:messages] = ["User Logged In Successfully"]
      if params[:url]
        render status: :ok, json: @user
      else
        render status: :ok, json: @user
      end
    else
      flash[:errors] = ["Invalid Log In Credentials"]
      if params[:url]
        render status: :unauthorized, json: flash[:errors]
      else
        render status: :unauthorized, json: flash[:errors]
      end
    end
  end

  def destroy
    log_out!
    flash[:messages] = ["User Logged Out Successfully"]
    render status: :ok, json: ""
  end
end
