class Investor < ApplicationRecord

  def sale_action(buyer,amount)
    begin
      puts "ENTRE AQUI #{buyer} #{amount}"
      buyer.stock += amount
      self.stock -= amount

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
