class VideosController < ApplicationController
  before_action :current_user
  before_action :confirm_logged_in

  def index
  end


end