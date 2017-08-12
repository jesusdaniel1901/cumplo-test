class InvestorsController < ApplicationController

  before_action :set_investor,only: [:edit]

  def index

  end

  def new
    @investor = Investor.new

  end

  def edit
    @investor = Investor.find_by(id: params[:id])
  end

  def transfer
    # @seller = Investor.find_by(id: params[:seller_id])
    # @buyer = Investor.find_by(id: params[:buyer_id])
    #
    # @seller.sale_action(@buyer,params[:amount])

  end

  private

  def set_investor
    @investor = Investor.find_by(id: params[:id])
  end

end
