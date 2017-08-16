require 'acceptance_helper'

resource 'Investors' do
  json
  authenticated

  post '/api/v1/investors' do

    example 'Create investors' do
      explanation 'This method creates an investor'
      legal_representative = FactoryGirl.create(:legal_representative)
      investor = FactoryGirl.build(:investor,legal_representative: legal_representative)

      do_request({
        name: investor.name,
        email: investor.email,
        stock: investor.stock,
        address: investor.address,
        phone: investor.phone,
        nationality: investor.nationality,
        rut: investor.rut,
        legal_representative_id: legal_representative.id
      })

      json_response = JSON.parse(response_body)

      expect(json_response['email']).to eq investor.email
      expect(json_response['name']).to eq investor.name
      expect(json_response['stock']).to eq investor.stock
      expect(json_response['address']).to eq investor.address
      expect(json_response['phone']).to eq investor.phone
      expect(json_response['nationality']).to eq investor.nationality
      expect(json_response['rut']).to eq investor.rut

      expect(response_status).to eq(200)
    end
  end
end