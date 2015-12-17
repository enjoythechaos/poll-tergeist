Rails.application.routes.draw do
  root to: "static_pages#index"

  resources :users, only: [:new, :create, :destroy] do
    namespace :api, defaults: {format: :json} do
      resources :polls, only: [:index]
    end
  end

  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :polls, only: [:show, :update] do
      resources :answer_choices, only: [:index]
    end
  end
end
