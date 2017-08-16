Rails.application.routes.draw do

  mount_devise_token_auth_for 'Admin', at: 'auth'

  namespace :api do
    namespace :v1 do
      resources :investors do
        collection do
          post 'transfer-stock',action: :transfer_stock
        end
      end
      mount_devise_token_auth_for 'Admin', at: :admin_auth, controllers: {
        confirmations: 'api/v1/admin_auth/confirmations',
        passwords: 'api/v1/admin_auth/passwords',
        omniauth_callbacks: 'api/v1/admin_auth/omniauth_callbacks',
        registrations: 'api/v1/admin_auth/registrations',
        sessions: 'api/v1/admin_auth/sessions',
        token_validations: 'api/v1/admin_auth/token_validations'
      }
    end
  end

  # get 'homes/index'

  root 'investors#index'
  get 'admin/login' => 'admin#login'

  resources :investors,only: [:new,:edit] do
    get :transfer,on: :collection
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
