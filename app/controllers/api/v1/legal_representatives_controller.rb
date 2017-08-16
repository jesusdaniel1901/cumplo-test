class Api::V1::LegalRepresentativesController < Api::V1::ApiController

  # before_action :verify_admin

  def index
    @legal_representatives = LegalRepresentative.all
    render_json @legal_representatives
  end

  private

  def verify_admin
    render_error(:bad_request,'Bad request just for admins users') unless  admin_signed_in?
  end

end
