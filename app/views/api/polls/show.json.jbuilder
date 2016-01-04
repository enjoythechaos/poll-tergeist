json.pollData do
  json.poll do
    json.id @poll.id
    json.question @poll.question
    json.poll_identifier @poll.poll_identifier
    json.poll_group_id @poll.poll_group_id
    json.locked @poll.locked
    json.author_id @poll.author_id
    json.url_string @poll.url_string
  end

  json.answerChoices @poll.answer_choices.order(:created_at) do |answer_choice|
    json.id answer_choice.id
    json.poll_id answer_choice.poll_id
    json.letter answer_choice.letter
    json.body answer_choice.body
  end
end
