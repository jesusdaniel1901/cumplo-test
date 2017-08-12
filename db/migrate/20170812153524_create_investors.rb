class CreateInvestors < ActiveRecord::Migration[5.1]
  def change
    create_table :investors do |t|
      t.string :name
      t.string :email
      t.string :nationality

      t.timestamps
    end
  end
end
