FactoryGirl.define do
  factory :investor do
    email { Faker::Internet.email }
    name { Faker::Name.first_name }
    nationality { Faker::Address.country }
    phone { Faker::PhoneNumber.cell_phone }
    address { Faker::Address.full_address }
    rut { Faker::Lorem.word }
    stock { Faker::Number.decimal(2) }
  end
end
