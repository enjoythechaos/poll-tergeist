class Response < ActiveRecord::Base
  belongs_to :answer_choice,
  primary_key: :id,
  foreign_key: :answer_choice_id,
  class_name: "AnswerChoice"

  has_one :poll,
  through: :answer_choice,
  source: :poll

  has_one :poll_group,
  through: :poll,
  source: :poll_group

  has_one :author,
  through: :poll_group,
  source: :author
end
