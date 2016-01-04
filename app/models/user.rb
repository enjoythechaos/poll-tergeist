class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true}
  attr_reader :password

  after_initialize :ensure_session_token!

  has_many :poll_groups,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: "PollGroup",
  dependent: :destroy

  has_many :polls,
  through: :poll_groups,
  source: :polls

  has_many :answer_choices,
  through: :poll_groups,
  source: :answer_choices

  has_many :responses,
  through: :answer_choices,
  source: :responses

  def self.create_guest_data
    @guest = User.find_by(username: "guest")
    if !@guest
      @guest = User.new({username: "guest"})
      @guest.password = "password"
      @guest.save
    else
      PollGroup.where(author_id: @guest.id).destroy_all
    end

    pg = PollGroup.create({author_id: @guest.id, title: "Ungrouped"})

    p = Poll.create({
      question: "Do you have any pets?",
      poll_identifier: 307,
      poll_group_id: pg.id,
      locked: false,
      author_id: @guest.id
    })

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Yes"
    })

    3.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "No"
    })

    2.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    p = Poll.create({
      question: "Do you intend to vote in the next election?",
      poll_identifier: 509,
      poll_group_id: pg.id,
      locked: false,
      author_id: @guest.id
    })

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Yes"
    })

    3.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Yes"
    })

    1.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    pg = PollGroup.create({author_id: @guest.id, title: "Demographic Questions"})

    p = Poll.create({
      question: "How many people live in your household?",
      poll_identifier: 96,
      poll_group_id: pg.id,
      locked: false,
      author_id: @guest.id
    })

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "1"
    })

    3.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "2"
    })

    4.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "3"
    })

    5.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "4"
    })

    4.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "5"
    })

    1.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "6"
    })

    1.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "7"
    })

    0.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "8 or more"
    })

    1.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    p = Poll.create({
      question: "What is your household's annual income?",
      poll_identifier: 202,
      poll_group_id: pg.id,
      locked: false,
      author_id: @guest.id
    })

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Less than $15,000"
    })

    4.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$15,001 - $20,000"
    })

    7.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$20,001 - $30,000"
    })

    4.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$30,001 - $40,000"
    })

    3.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$40,001 - $50,000"
    })

    2.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$50,001 - $60,000"
    })

    4.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$60,001 - $70,000"
    })

    3.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$70,001 - $80,000"
    })

    6.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$80,001 - $90,000"
    })

    5.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$90,001 - $100,000"
    })

    2.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$100,001 - $125,000"
    })

    4.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$125,001 - $150,000"
    })

    7.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$150,001 - $175,000"
    })

    3.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "$175,001 - $200,000"
    })

    1.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Over $200,000"
    })

    1.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    p = Poll.create({
      question: "How many times did you fly this year?",
      poll_identifier: 534,
      poll_group_id: pg.id,
      locked: false,
      author_id: @guest.id
    })

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "0"
    })

    5.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "1"
    })

    4.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "2"
    })

    3.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "3"
    })

    1.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "4+"
    })

    0.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    pg = PollGroup.create({author_id: @guest.id, title: "Questions About Education"})

    p = Poll.create({
      question: "What is your highest level of educational achievement?",
      poll_identifier: 907,
      poll_group_id: pg.id,
      locked: false,
      author_id: @guest.id
    })

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Some high school"
    })

    3.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "High school graduate"
    })

    4.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Some college"
    })

    7.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "College graduate"
    })

    10.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Some graduate school"
    })

    5.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Masters degree"
    })

    6.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Doctorate"
    })

    1.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    p = Poll.create({
      question: "What was your undergraduate GPA?",
      poll_identifier: 233,
      poll_group_id: pg.id,
      locked: false,
      author_id: @guest.id
    })

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Less than 2.0"
    })

    1.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Less than 2.01 - 2.50"
    })

    2.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "2.51 - 2.75"
    })

    4.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "2.76 - 3.0"
    })

    5.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Less than 3.01 - 3.25"
    })

    6.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "3.26 - 3.50"
    })

    7.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "3.51 - 3.75"
    })

    7.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "3.76 - 3.9"
    })

    4.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "3.91 - 3.95"
    })

    2.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

    ac = AnswerChoice.create({
      poll_id: p.id,
      letter: "Z",
      body: "Over 3.95"
    })

    1.times { Response.create({answer_choice_id: ac.id, respondent_id: 1}) }

  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token!
    self.session_token ||= self.class.generate_session_token
  end
end
