require 'rails_helper'
require 'rspec_api_documentation'
require 'rspec_api_documentation/dsl'
# require 'sidekiq/testing'
# Sidekiq::Testing.inline!

ENV["DOC_FORMAT"] ||= "json"

RspecApiDocumentation.configure do |config|
  config.format = ENV["DOC_FORMAT"]
  config.curl_host = 'https://localhost:3000'
  config.api_name = 'Cumplo Chile'
  config.docs_dir = Rails.root.join('docs')
  # config.request_headers_to_include = ['Content-Type', 'Uid', 'Access-Token', 'Client', 'Token-Type', 'Expiry']
  # config.curl_headers_to_filter = ['Cookie', 'Host']
  # config.response_headers_to_include = ['uid', 'access-token', 'client', 'token-type', 'expiry']
  config.request_body_formatter = :json

  # # Todo - append_json is not working well with define_group
  # config.define_group :public do |config_group|
  #   config_group.filter = :public
  #   config_group.docs_dir = Rails.root.join('public', 'developer', 'docs')
  #   config_group.api_name = 'Scorebook Live Public API'
  #   config_group.request_headers_to_include = ['x-api-key']
  # end
end

# def authenticated
#   header "token-type", "Bearer"
#   header "uid", :uid
#   header "client", :client_id
#   header "access-token", :access_token
#   header "expiry", :expiry
#   let(:user) { FactoryGirl.create(:user) }
#   let(:auth_headers) { user.create_new_auth_token }
#
#   let(:uid) { user.uid }
#   let(:client_id) { auth_headers["client"] }
#   let(:access_token) { auth_headers["access-token"] }
#   let(:expiry) { auth_headers["expiry"] }
# end

def json
  header "Content-Type", "application/json"
end

def json_req(params = nil)
  do_request(params)
  JSON.parse(response_body)['data']
end