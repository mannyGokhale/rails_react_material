class User < ApplicationRecord

  include Devise::JWT::RevocationStrategies::JTIMatcher

  validates_confirmation_of :password

  devise :database_authenticatable, :registerable, :validatable,
         :recoverable, :rememberable, :validatable,  :jwt_authenticatable,jwt_revocation_strategy: self

  self.skip_session_storage = [:http_auth, :params_auth]

  has_many :invitations, foreign_key: :inviter_id

end
