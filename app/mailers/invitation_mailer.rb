class InvitationMailer < ApplicationMailer

  def invite_user(inviter_email, invitee_email, invitation_code)
    @inviter_email = inviter_email
    @invitee_email = invitee_email
    @link = "http://localhost:4001/sign_up?token=#{invitation_code}"
    mail(to: @invitee_email, subject: 'Invitation to join Awesome App' )
  end

end
