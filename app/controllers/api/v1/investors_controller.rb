class Api::V1::InvestorsController < Api::V1::ApiController

  before_action :verify_admin

  before_action :set_investor,only: [:update]

  def index
    puts current_admin.email
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
    @seller = Investor.find_by(id: params[:seller_id])
    @buyer = Investor.find_by(id: params[:buyer_id])

    return render_error(:not_found,'Vendedor o comprador no encontrado') unless @seller.present? || @buyer.present?

    if @seller.sale_action(@buyer,params[:stock])
      render_json @seller
    else
      render_error(:unprocessable_entity,'Fallo la transaccion')
    end
  end


  private

  def set_investor
    @investor = Investor.find_by(id: params[:id])
    render_error(:not_found,'Investor not found') unless @investor.present?
  end

  def verify_admin
    render_error(:bad_request,'Bad request just for admins users') unless  admin_signed_in?
  end

end
