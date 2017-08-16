class Transfer < ApplicationRecord
  belongs_to :investor_seller, class_name: 'Investor', foreign_key: 'investor_seller_id'
  belongs_to :investor_buyer, class_name: 'Investor', foreign_key: 'investor_buyer_id'

end
