class MarkersController < ApplicationController
respond_to :json

def create

  marker_params = params.permit!

  marker = Marker.new #create(params.permit!)

  marker.user_id = 1 #session[:user_id]
  marker.tag = 'time' #marker_params[:tag]
  marker.video_time = '11212' #marker_params[:video_time]
  marker.video_id = '12121' #marker_params[:video_id]
  marker.video_length = '2323' #marker_params[:video_length]

  marker.save
  # binding.pry
  render json: marker

end



end
