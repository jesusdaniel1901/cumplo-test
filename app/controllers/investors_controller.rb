class InvestorsController < ApplicationController

  before_action :set_investor,only: [:edit]

  def index
    # redirect_to admin_login_path unless admin_signed_in?
  end

  def new
    @investor = Investor.new

  end

  def edit
    @investor = Investor.find_by(id: params[:id])
  end

  def transfer

  end

  private

  def set_investor
    @investor = Investor.find_by(id: params[:id])
  end

end
