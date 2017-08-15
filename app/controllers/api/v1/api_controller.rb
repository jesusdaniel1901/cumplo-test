class Api::V1::ApiController < ActionController::API
  include Api::V1::Apiable
  include ActionController::Serialization
  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action do
    self.namespace_for_serializer = 'V1'
  end

end
