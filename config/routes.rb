Rails.application.routes.draw do
  root to: "static_pages#index"

  resources :users, only: [:new, :create, :destroy] do
    namespace :api, defaults: {format: :json} do
      resources :polls, only: [:index]
    end
  end

  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :answer_choices, only: [:destroy] do
      collection do
        patch :update_batch
      end
    end
    resources :polls, only: [:show, :update] do
      resources :answer_choices, only: [:index, :create]
    end
  end
end
