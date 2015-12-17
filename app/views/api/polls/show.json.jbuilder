# json.extract! @poll, :id, :question, :poll_identifier, :poll_group_id, :locked

json.pollEditData do
  json.poll do
    json.id @poll.id
    json.question @poll.question
    json.poll_identifier @poll.poll_identifier
    json.poll_group_id @poll.poll_group_id
    json.locked @poll.locked
  end

  json.answerChoices @poll.answer_choices do |answer_choice|
    json.id answer_choice.id
    json.poll_id answer_choice.poll_id
    json.letter answer_choice.letter
    json.body answer_choice.body
  end
end
