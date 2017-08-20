require 'acceptance_helper'

resource 'Investors' do
  json
  authenticated

  delete '/api/v1/investors/:id' do

    example 'Delete investors' do
      explanation 'This method deletes an investor'
      legal_representative = FactoryGirl.create(:legal_representative)
      investor = FactoryGirl.create(:investor,legal_representative: legal_representative)

      do_request({
        id: investor.id,
      })

      expect(response_status).to eq(200)
    end
    example 'Delete investors with an invalid ID',document: false do

      legal_representative = FactoryGirl.create(:legal_representative)
      investor = FactoryGirl.create(:investor,legal_representative: legal_representative)

      do_request({
        id: 'bla'
      })

      expect(response_status).to eq(404)
      expect(response_body).to include_json({
        errors: ["Investor no encontrado"]
      })
    end
  end
end