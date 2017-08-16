class AddLegalRepresentativeToInvestor < ActiveRecord::Migration[5.1]
  def change
    add_reference :investors, :legal_representative, foreign_key: true
  end
end
