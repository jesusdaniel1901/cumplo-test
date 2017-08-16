class AddInvestorsToTransfer < ActiveRecord::Migration[5.1]
  def change
    add_column :transfers, :investor_seller_id,:integer,:limit => 8
    add_foreign_key :transfers,:investors,column: :investor_seller_id

    add_column :transfers, :investor_buyer_id,:integer,:limit => 8
    add_foreign_key :transfers,:investors,column: :investor_buyer_id
  end
end
