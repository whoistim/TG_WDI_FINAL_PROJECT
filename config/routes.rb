Rails.application.routes.draw do

   ### ACCESS + MAIN ROUTES
  root 'access#login'

  get '/', to: 'access#login'

  get 'index', to: 'access#login'

  post 'signup', to: 'access#create', as: 'create_user'

  get 'signup', to: 'access#new'

  get 'home', to: 'users#index'

  get 'login', to: 'access#login', as: 'login'

  get 'logout', to: 'access#logout'

  post 'login', to: 'access#attempt_login'

  ### USERS ROUTES
  get 'users', to: 'users#index', as: 'users'

  get 'users/:id/edit', to: 'users#edit', as: 'users_edit'

  get 'users/:id', to: 'users#show', as: 'users_show'

  delete 'users/:id', to: 'users#destroy'

  patch 'users/:id/edit', to: 'users#update'

  ### VIDEOS ROUTES
  get 'videos', to: 'videos#index', as: 'videos'

  ### MARKERS ROUTES

  post 'markers', to: 'markers#create', as: 'markers'

end
