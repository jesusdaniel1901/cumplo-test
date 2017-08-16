class Investor < ApplicationRecord

  belongs_to :legal_representative

  def sale_action(buyer,amount)
    begin
      buyer.stock += amount
      self.stock -= amount

      transfer = Transfer.new(investor_seller: self,investor_buyer: buyer,stock: amount)
      transfer.save

      buyer.save
      self.save
      return true
    rescue
      return false
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
      :stock
    ]
  end

end
