class CreateInvitation < ActiveRecord::Migration[6.1]
  def change
    create_table :invitations do |t|
      t.references :inviter, index: true, foreign_key: { to_table: :users }, null: false
      t.string :invitee_email, null: false
      t.string :invitation_code, null: false
      t.timestamps
    end
  end
end
