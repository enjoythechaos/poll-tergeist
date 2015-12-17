class CreateAnswerChoices < ActiveRecord::Migration
  def change
    create_table :answer_choices do |t|
      t.integer :poll_id, null: false
      t.string :letter, null: false
      t.string :body, null: false

      t.timestamps null: false
    end

    add_index :answer_choices, :poll_id
  end
end
