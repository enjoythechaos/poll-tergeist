class Poll < ActiveRecord::Base
  belongs_to :poll_group,
  primary_key: :id,
  foreign_key: :poll_group_id,
  class_name: "PollGroup"

  has_many :answer_choices,
  primary_key: :id,
  foreign_key: :poll_id,
  class_name: "AnswerChoice",
  dependent: :destroy

  has_many :responses,
  through: :answer_choices,
  source: :responses

  has_one :author,
  through: :poll_group,
  source: :author

  def url_string
    return self.author.username.upcase + self.poll_identifier.to_s
  end

  def answer_choices_with_totals
    @results = ActiveRecord::Base.connection.execute("
      SELECT choices.id, choices.body, COUNT(responses.answer_choice_id)
      FROM
        (SELECT
          answer_choices.body, answer_choices.id
        FROM
          answer_choices
        WHERE
          answer_choices.poll_id = #{self.id}) choices
        LEFT OUTER JOIN responses ON choices.id = responses.answer_choice_id
      GROUP BY choices.id, choices.body
      ORDER BY choices.id;
    ")
  end
end
