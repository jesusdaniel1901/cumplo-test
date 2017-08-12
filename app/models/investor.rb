class Investor < ApplicationRecord

  def sale_action(buyer,amount)

    buyer.stock += amount
    self.stock -= amount

    buyer.save
    self.save
  end


  def self.params
    [
      :name,
      :email,
      :nationality
    ]
  end

end
