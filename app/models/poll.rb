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

  def answer_choices_with_totals
    @results = ActiveRecord::Base.connection.execute("
      SELECT
        answer_choices.id, answer_choices.body, COUNT(responses.answer_choice_id)
      FROM
        answer_choices INNER JOIN responses ON answer_choices.id = responses.answer_choice_id
      WHERE
        answer_choices.poll_id = #{self.id}
      GROUP BY
        answer_choices.id, answer_choices.body
    ")
  end
end
