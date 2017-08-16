class V1::InvestorSerializer < ActiveModel::Serializer
  attributes :id,:name,:email,:nationality,:stock,:rut,:address,:phone

  has_one :legal_representative

end
