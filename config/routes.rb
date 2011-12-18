ExampleApp::Application.routes.draw do
  resources :albums do
    resources :attachments, :only => [:create, :show]
  end

  root :to => 'albums#index'

  if ["development", "test"].include? Rails.env
    mount Jasminerice::Engine => "/jasmine"
  end
end
