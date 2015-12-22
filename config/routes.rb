Rails.application.routes.draw do
  root to: "static_pages#index"

  resources :users, only: [:new, :create, :destroy] do
    namespace :api, defaults: {format: :json} do
      resources :polls, only: [:index, :create] do
        collection do
          put :create_batch
        end
      end
    end
  end

  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :results, only: [:show]
    resources :responses, only: [:create]
    resources :answer_choices, only: [:destroy] do
      collection do
        patch :update_batch
        put :create_batch
      end
    end

    resources :polls, only: [:show]
    resources :polls, only: [:show, :update] do
      collection do
        patch :group
        post :ungroup
      end
      resources :answer_choices, only: [:index, :create]
    end

    resources :poll_groups, only: [:update]
  end

end
