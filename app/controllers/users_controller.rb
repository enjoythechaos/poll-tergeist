class UsersController < ApplicationController
  def new
  end

  def create
    username = params[:user][:username]
    password = params[:user][:password]

    existing_user = User.find_by(username: username)
    if existing_user
      flash[:errors] = ["A user with that name already exists"]
      redirect_to new_user_url
      return
    end

    @user = User.new(username: username, password: password)
    if @user.save
      user_id = @user.id
      @ungrouped_poll_group = PollGroup.new({author_id: user_id, title: "Ungrouped"})
      @ungrouped_poll_group.save
      log_in!(@user)
      flash[:messages] = ["User Signed Up and Logged In Successfully"]
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to new_user_url
    end
  end
end
