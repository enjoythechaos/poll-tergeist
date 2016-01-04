Rails.application.routes.draw do
  root to: "static_pages#index"
  resources :colortest, only: [:index]

  namespace :api, defaults: {format: :json} do
    resources :answer_choices, only: [:destroy] do # Destroy happens from poll edit.
      collection do
        patch :update_batch # Should be okay.  Need to find where this is happening.
        put :create_batch # Should be okay  Need to find where this is happening.
      end
    end

    resources :responses, only: [:create]

    resources :results, only: [:show]

    resources :poll_groups, only: [:update]

    resources :polls, only: [:show, :create, :update] do
      collection do
        patch :group
        patch :ungroup
        patch :update_with_answer_choices
        delete :delete_batch
        delete :delete_responses
      end
      member do
        get :get_by_poll_identifier
      end

      resources :answer_choices, only: [:index, :create]
    end

    resource :session, only: [:show, :create, :destroy]

    resources :users, only: [:create] do
      resources :polls, only: [:index] do
        collection do
          post :create_batch
        end
      end
    end
  end
end
