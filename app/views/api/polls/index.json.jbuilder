
json.pollGroups @poll_groups do |poll_group|
  json.pollGroupId poll_group.id
  json.pollGroupTitle poll_group.title
  json.polls poll_group.polls do |poll|
    json.partial! "api/polls/poll", poll: poll
  end
end
