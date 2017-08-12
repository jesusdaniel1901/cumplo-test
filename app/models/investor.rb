class Investor < ApplicationRecord


  def self.params
    [
      :name,
      :email,
      :nationality
    ]
  end

end
