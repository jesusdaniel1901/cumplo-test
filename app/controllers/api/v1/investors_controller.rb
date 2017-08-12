class Api::V1::InvestorsController < Api::V1::ApiController

  def index
    @investors = Investor.all
    render_json @investors
  end

end
