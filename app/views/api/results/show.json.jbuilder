json.pollResult do
  json.pollId @poll.id
  json.question @poll.question
  json.author_id @poll.author_id
  json.results @results do |result|
    json.answerChoiceId result["id"]
    json.answerChoiceText result["body"]
    json.count result["count"]
  end
end
