require 'acceptance_helper'

resource 'Investors' do
  json
  authenticated

  post '/api/v1/investors/transfer-stock' do

    example 'Make a transfer bewtween investors' do
      explanation 'This method makes a transfer between investors'
      legal_representative = FactoryGirl.create(:legal_representative)
      seller = FactoryGirl.create(:investor,legal_representative: legal_representative)
      buyer = FactoryGirl.create(:investor,legal_representative: legal_representative)

      do_request({
        seller_id: seller.id ,
        buyer_id: buyer.id,
        stock: seller.stock
      })

      json_response = JSON.parse(response_body)

      expect(json_response['id']).to eq seller.id
      expect(json_response['name']).to eq seller.name
      expect(json_response['email']).to eq seller.email
      expect(json_response['stock']).to eq 0
      expect(json_response['address']).to eq seller.address
      expect(json_response['phone']).to eq seller.phone
      expect(json_response['nationality']).to eq seller.nationality
      expect(json_response['rut']).to eq seller.rut

      expect(response_status).to eq(200)


    end

    example 'Make a transfer bewtween investors with a bad stock',document: false do

      legal_representative = FactoryGirl.create(:legal_representative)
      seller = FactoryGirl.create(:investor,legal_representative: legal_representative)
      buyer = FactoryGirl.create(:investor,legal_representative: legal_representative)

      do_request({
        seller_id: seller.id ,
        buyer_id: buyer.id,
        stock: seller.stock + 10
      })

      expect(response_status).to eq(400)
      expect(response_body).to include_json({
        errors: ["El vendedor no puede vender mas de las accciones que tiene"]
      })
    end

    example 'Make a transfer bewtween investors with a bad stock' do
      legal_representative = FactoryGirl.create(:legal_representative)
      seller = FactoryGirl.create(:investor,legal_representative: legal_representative)
      buyer = FactoryGirl.create(:investor,legal_representative: legal_representative)

      do_request({
        seller_id: seller.id ,
        buyer_id: buyer.id,
        stock: [10]
      })

      expect(response_status).to eq(400)
      expect(response_body).to include_json({
        errors: ["Parametro stock invalido"]
      })
    end

  end
end
