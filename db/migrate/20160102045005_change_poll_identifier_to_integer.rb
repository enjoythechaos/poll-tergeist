class ChangePollIdentifierToInteger < ActiveRecord::Migration
  def change
    remove_column :polls, :poll_identifier
    add_column :polls, :poll_identifier, :integer
  end
end
