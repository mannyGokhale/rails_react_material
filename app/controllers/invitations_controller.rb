class InvitationsController < ApplicationController

  def create
    email = invitation_params[:email]
    Invitation.invite_by_email(current_user, email)

    render json: { success: true, message: 'Invitation send successfully.' }
  end

  def validate_invitation
  end

  private

  def invitation_params
    params.require(:invitation).permit(:email)
  end
end
