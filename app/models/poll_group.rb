class PollGroup < ActiveRecord::Base
  belongs_to :author,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: "User"

  has_many :polls,
  primary_key: :id,
  foreign_key: :poll_group_id,
  class_name: "Poll"

  has_many :answer_choices,
  through: :polls,
  source: :answer_choices

  has_many :responses,
  through: :answer_choices,
  source: :responses
end
