class Api::V1::ApiController < ActionController::API
  include Api::V1::Apiable
  include ActionController::Serialization
  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :verify_admin

  before_action do
    self.namespace_for_serializer = 'V1'
  end

  def verify_admin
    render_error(:bad_request,'Bad request just for admins users') unless  admin_signed_in?
  end

end
