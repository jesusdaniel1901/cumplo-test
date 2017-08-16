class CreateTransfers < ActiveRecord::Migration[5.1]
  def change
    create_table :transfers do |t|
      t.decimal :stock

      t.timestamps
    end
  end
end
