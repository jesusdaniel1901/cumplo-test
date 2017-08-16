FactoryGirl.define do
  factory :admin do
    email { Faker::Internet.email }
    name { Faker::Name.first_name }
    password 'foobar123'
  end
end