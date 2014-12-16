class UsersController < ApplicationController

  def index
      redirect_to('/videos')
  end


  def show
    @user = User.find_by_id(params[:id])
    prevent_user(@user)
  end

  def edit
    @user = User.find_by_id(params[:id])
    prevent_user(@user)
  end

   def update
    @user = User.find(params[:id])
    @user.update_attributes(user_params)

    if(@user.save)
      session[:user_id] = @user.id
      flash[:success] = "You're profile is updated"
      redirect_to '/home'
    else
      render :edit
    end

   end

  def destroy
    user = User.find_by_id(params[:id])
    user.destroy
    redirect_to '/index'
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

end
