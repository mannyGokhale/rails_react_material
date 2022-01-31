Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
  root 'pages#home'

  resources :invitations, only: [:create] do
    collection do
      get 'validate_invitation'
    end
  end

  get "*path",
    to: "pages#home",
    contraints: lambda { |req|
      !req.format.xhr? && req.format.html?
    }
end
