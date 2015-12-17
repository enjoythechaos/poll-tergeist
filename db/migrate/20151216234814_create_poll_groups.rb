class CreatePollGroups < ActiveRecord::Migration
  def change
    create_table :poll_groups do |t|
      t.integer :author_id, null: false
      t.string :title, null: false
      t.text :description

      t.timestamps null: false
    end

    add_index :poll_groups, :author_id
  end
end
