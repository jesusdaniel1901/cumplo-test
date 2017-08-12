FactoryGirl.define do
  factory :investor do
    email { Faker::Internet.email }
    name { Faker::Name.first_name }
    nationality { Faker::Address.country }
  end
end
