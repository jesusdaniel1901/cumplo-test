class InvestorsController < ApplicationController

  def index

  end

  def new
    @investor = Investor.new

  end

  def edit
    @investor = Investor.find_by(id: params[:id])
  end

end
