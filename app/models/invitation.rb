class Invitation < ApplicationRecord

  has_secure_token :invitation_code
  has_one :inviter

  def self.invite_by_email(current_user, invitee_email)
    invitation = current_user.invitations.new(invitee_email: invitee_email)
    invitation.save!

    InvitationMailer.invite_user(current_user.email, invitee_email, invitation.invitation_code).deliver
  end

  def self.is_valid_invitation_token?(email, invitation_code)
    self.exists?(email: email, invitation_code: invitation_code)
  end

end
