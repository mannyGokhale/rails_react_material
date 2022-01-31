class RegistrationsController < Devise::RegistrationsController
  respond_to :json
  def create
    @user = User.new(user_params)
    if @user.save
      sign_in :user, @user
      render json: @user
    else
      warden.custom_failure!
      render json: { error: 'Error while signing up. Please try again with valid details.' }, status: :unprocessable_entity
    end
  end

private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :ok
  end
end