class Api::UsersController < ApplicationController
  def create
    username = params[:user][:username]
    password = params[:user][:password]

    existing_user = User.find_by(username: username)
    if existing_user
      flash[:errors] = ["A user with that name already exists"]
      render status: :not_acceptable, json: flash[:errors]
      return
    end

    @user = User.new(username: username, password: password)

    if @user.save
      user_id = @user.id
      @ungrouped_poll_group = PollGroup.new({author_id: user_id, title: "Ungrouped"})
      @ungrouped_poll_group.save

      log_in!(@user)
      flash[:messages] = ["User Signed Up and Logged In Successfully"]
      render status: :ok, json: @user
    else
      flash[:errors] = @user.errors.full_messages
      render status: :not_acceptable, json: flash[:errors]
    end
  end
end
