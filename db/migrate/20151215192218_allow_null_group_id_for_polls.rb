class AllowNullGroupIdForPolls < ActiveRecord::Migration
  def change
    change_column :polls, :poll_group_id, :integer, :null => true
  end
end
