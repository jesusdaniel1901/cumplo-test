class Api::V1::InvestorsController < Api::V1::ApiController

  before_action :verify_admin

  before_action :set_investor,only: [:update, :destroy]

  def index
    @investors = Investor.all
    render_json @investors,include: ['legal_representative']
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

    return render_error(:not_found,'Vendedor o comprador no encontrado') unless @seller.present?

    return render_error(:bad_request,'Parametro stock invalido') if params[:stock].is_a?(Array) || !params[:stock].is_a?(Numeric)

    return render_error(:bad_request,'El vendedor no puede vender mas de las accciones que tiene') if params[:stock] > @seller.stock

    if @seller.sale_action(params[:buyer_id],params[:stock])
      render_json @seller
    else
      render_error(:unprocessable_entity,'Fallo la transaccion')
    end
  end

  def destroy
    if @investor.destroy
      render json: {}
    else
      render_error(:unprocessable_entity,@investor.errors.full_messages)
    end
  end


  private

  def set_investor
    @investor = Investor.find_by(id: params[:id])
    render_error(:not_found,'Investor no encontrado') unless @investor.present?
  end

  def verify_admin
    render_error(:bad_request,'Bad request just for admins users') unless  admin_signed_in?
  end

  def transfer_params
    params.permit(:buyer_id,:stock)
  end

end
