class LegalRepresentative < ApplicationRecord

  has_many :investors

  def full_name
    "#{first_name} #{last_name}"
  end

end
