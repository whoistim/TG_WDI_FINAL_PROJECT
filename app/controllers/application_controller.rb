class ApplicationController < ActionController::Base
 # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

private

  # Ensure a user is logged in
  def confirm_logged_in
    unless session[:user_id]
      flash[:notice] = "Please log in."
      redirect_to('/login')
    end
  end

  # Stop a logged in user from going to the sign up page
  def prevent_login_signup
    if session[:user_id]
      redirect_to('/home')
    end
  end

  # Prevent a user from going to another users page
  def prevent_user(user)
    if user.nil? or session[:user_id] != user.id
      redirect_to('/videos')
    end
  end

  # Assign a current_user
  def current_user
    return unless session[:user_id]
    @current_user ||= User.find(session[:user_id])
  end

end