class MarkersController < ApplicationController
respond_to :json

def create

  marker_params = params.permit!

  marker = Marker.new #create(params.permit!)

  marker.user_id = 1 #session[:user_id]
  marker.tag = marker_params[:tag]
  marker.video_time = marker_params[:video_time]
  marker.video_id = marker_params[:video_id]
  marker.video_length = marker_params[:video_length]
  marker.comment = marker_params[:comment]

  marker.save
  # binding.pry
  render json: marker

end

def index
  markers = Marker.all
  render json: markers
end

end
