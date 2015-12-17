class Poll < ActiveRecord::Base
  belongs_to :poll_group,
  primary_key: :id,
  foreign_key: :poll_group_id,
  class_name: "PollGroup"

  has_many :answer_choices,
  primary_key: :id,
  foreign_key: :poll_id,
  class_name: "AnswerChoice"

  has_many :responses,
  through: :answer_choices,
  source: :responses

  has_one :author,
  through: :poll_group,
  source: :author
end
