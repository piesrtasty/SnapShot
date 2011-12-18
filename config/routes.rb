PhotoAlbum::Application.routes.draw do
  # resources :tasks do
  #      resources :attachments, :only => [:create, :show]
  #    end
  
   resources :albums
  
   root :to => 'albums#index'

   if ["development", "test"].include? Rails.env
     mount Jasminerice::Engine => "/jasmine"
   end
end
