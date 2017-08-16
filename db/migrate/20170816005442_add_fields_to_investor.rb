class AddFieldsToInvestor < ActiveRecord::Migration[5.1]
  def change
    add_column :investors, :rut, :string
    add_column :investors, :address, :string
    add_column :investors, :phone, :string
  end
end
