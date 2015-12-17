poll_groups = Hash.new{|h, k| h[k] = []}

@polls.each do |poll|
  poll_groups[poll.poll_group_id].push(poll)
end

json.pollGroups poll_groups do |poll_group|
  json.pollGroupId poll_group[0]
  json.polls poll_group[1] do |poll|
    json.partial! "api/polls/poll", poll: poll
  end
end
