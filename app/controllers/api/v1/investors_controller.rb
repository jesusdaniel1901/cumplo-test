class Api::V1::InvestorsController < Api::V1::ApiController

  before_action :set_investor,only: [:update]

  def index
    @investors = Investor.all
    render_json @investors
  end

  def create
    @investor = Investor.new(params.permit(Investor.params))

    if @investor.save
      render_json @investor
    else
      render_error(:unprocessable_entity,@investor.errors.full_messages)
    end
  end

  def update
    if @investor.update(params.permit(Investor.params))
      render_json @investor
    else
      render_error(:unprocessable_entity,@investor.errors.full_messages)
    end
  end

  def transfer_stock

  end


  private

  def set_investor
    @investor = Investor.find_by(id: params[:id])
    render_error(:not_found,'Investor not found') unless @investor.present?
  end

end
