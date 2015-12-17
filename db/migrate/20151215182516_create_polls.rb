class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.text :question, null: false
      t.string :poll_identifier, null: false
      t.integer :poll_group_id, null: false
      t.boolean :locked, null: false, default: false

      t.timestamps null: false
    end
  end
end
