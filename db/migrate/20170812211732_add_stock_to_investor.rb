class AddStockToInvestor < ActiveRecord::Migration[5.1]
  def change
    add_column :investors, :stock, :decimal
  end
end
