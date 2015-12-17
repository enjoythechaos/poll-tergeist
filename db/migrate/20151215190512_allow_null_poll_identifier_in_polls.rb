class AllowNullPollIdentifierInPolls < ActiveRecord::Migration
  def change
    change_column :polls, :poll_identifier, :string, :null => true
  end
end
