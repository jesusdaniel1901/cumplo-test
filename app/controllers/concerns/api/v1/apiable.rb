module Api::V1::Apiable
  extend ActiveSupport::Concern

  def render_json(obj, options = {})
    render({ json: obj, include: []}.merge(options))
  end

  def render_error(code, messages = nil)
    render json: { errors: Array.wrap(messages) }, status: code
  end

end