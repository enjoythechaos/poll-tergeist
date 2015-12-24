class SessionsController < ApplicationController
  def new
  end

  def create
    username = params[:user][:username]
    password = params[:user][:password]
    @user = User.find_by_credentials(username, password)
    if @user
      log_in!(@user)
      flash[:messages] = ["User Logged In Successfully"]
      if params[:url]
        redirect_to root_url + "#" + params[:url]
      else
        redirect_to root_url + "#/users/" + @user.id + "/polls"
      end
    else
      flash[:errors] = ["Invalid Log In Credentials"]
      if params[:url]
        redirect_to new_session_url + "?url=" + params[:url]
      else
        redirect_to new_session_url
      end
    end
  end

  def destroy
    log_out!
    flash[:messages] = ["User Logged Out Successfully"]
    redirect_to root_url
  end
end
