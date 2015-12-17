class AddAuthorIdToPolls < ActiveRecord::Migration
  def change
    add_column :polls, :author_id, :integer, null: false
  end
end
