require 'acceptance_helper'

resource 'Investors' do
  json
  authenticated

  put '/api/v1/investors/:id' do

    example 'Edit investors' do
      explanation 'This method edits an investor'
      legal_representative = FactoryGirl.create(:legal_representative)
      investor = FactoryGirl.create(:investor,legal_representative: legal_representative)

      do_request({
        id: investor.id,
        email: 'admin@cumplo.cl',
      })

      json_response = JSON.parse(response_body)

      expect(json_response['id']).to eq investor.id
      expect(json_response['email']).to eq 'admin@cumplo.cl'
      expect(json_response['name']).to eq investor.name
      expect(json_response['stock']).to eq investor.stock
      expect(json_response['address']).to eq investor.address
      expect(json_response['phone']).to eq investor.phone
      expect(json_response['nationality']).to eq investor.nationality
      expect(json_response['rut']).to eq investor.rut

      expect(response_status).to eq(200)
    end

    example 'Edit investors with an invalid ID',document: false do

      legal_representative = FactoryGirl.create(:legal_representative)
      investor = FactoryGirl.create(:investor,legal_representative: legal_representative)

      do_request({
        id: 'bla',
        email: 'admin@cumplo.cl',
      })

      expect(response_status).to eq(400)
      expect(response_body).to include_json({
        errors: ["Investor no encontrado"]
      })
    end
  end
end