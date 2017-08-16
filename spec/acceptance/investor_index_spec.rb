require 'acceptance_helper'

resource 'Investors' do
  json
  authenticated

  get '/api/v1/investors' do

    example 'Get investors' do
      explanation 'This returns all the investors in the system'
      legal_representative = FactoryGirl.create(:legal_representative)
      investors = []

      5.times{
        investors.push(FactoryGirl.create(:investor,legal_representative: legal_representative))
      }

      do_request

      json_response = JSON.parse(response_body)

      json_response.each_with_index do |json,i|
        expect(json['id']).to eq investors[i].id
        expect(json['name']).to eq investors[i].name
        expect(json['email']).to eq investors[i].email
        expect(json['nationality']).to eq investors[i].nationality
        expect(json['stock']).to eq investors[i].stock
        expect(json['rut']).to eq investors[i].rut
        expect(json['address']).to eq investors[i].address
        expect(json['phone']).to eq investors[i].phone
        expect(json['legal_representative']['id']).to eq legal_representative.id
        expect(json['legal_representative']['full_name']).to eq legal_representative.full_name
      end

      expect(response_status).to eq(200)
    end
  end

end