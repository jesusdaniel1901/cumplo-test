class Investor < ApplicationRecord

  belongs_to :legal_representative

  def sale_action(buyer,stock)
    Transfer.transaction do

      buyer.stock += stock
      self.stock -= stock

      transfer = Transfer.new(investor_seller: self,investor_buyer: buyer,stock: stock)
      transfer.save

      buyer.save
      self.save

      return true
    end



  end


  def self.params
    [
      :name,
      :email,
      :nationality,
      :phone,
      :address,
      :rut,
      :stock,
      :legal_representative_id
    ]
  end

end
