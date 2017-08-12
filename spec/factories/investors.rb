FactoryGirl.define do
  factory :investor do
    email { Faker::Internet.email }
    name { Faker::Name.first_name }
    nationality { Faker::Address.country }
    stock { Faker::Number.decimal(2) }
  end
end
