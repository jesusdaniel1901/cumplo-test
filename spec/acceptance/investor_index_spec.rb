require 'acceptance_helper'

resource 'Investors' do

  get '/api/v1/investors' do

    example 'Get investors' do
      explanation 'This returns all the investors in the system'

      5.times{FactoryGirl.create(:investor)}

      do_request

      json_response = JSON.parse(response_body)

      puts JSON.pretty_generate(json_response)

      expect(response_status).to eq(200)
    end
  end

end