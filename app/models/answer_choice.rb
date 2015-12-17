class AnswerChoice < ActiveRecord::Base
  belongs_to :poll,
  primary_key: :id,
  foreign_key: :poll_id,
  class_name: "Poll"

  has_one :poll_group,
  through: :poll,
  source: :poll_group

  has_one :author,
  through: :poll_group,
  source: :author

  has_many :responses,
  primary_key: :id,
  foreign_key: :answer_choice_id,
  class_name: "Response"
end
