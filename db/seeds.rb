# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

mike = User.new({
  id: 1,
  username: "mike",
  session_token: nil
})
mike.password = "password"
mike.save

Poll.create({
  id: 1,
  question: "What's the most ridiculous thing you've seen today?",
  poll_identifier: "MIKE29",
  poll_group_id: 1,
  locked: false,
  author_id: mike.id
})

AnswerChoice.create({
  id: 1,
  poll_id: 1,
  letter: "A",
  body: "Two Donald Trump supporters arguing with each other"
})

AnswerChoice.create({
  id: 2,
  poll_id: 1,
  letter: "B",
  body: "A squirrel riding a bike"
})

AnswerChoice.create({
  id: 3,
  poll_id: 1,
  letter: "C",
  body: "A guy dressed up as a plant, but he was walking around"
})

AnswerChoice.create({
  id: 4,
  poll_id: 1,
  letter: "D",
  body: "A clown wearing a hat that was much too small for his head"
})

Poll.create({
  id: 2,
  question: "What time is it?",
  poll_identifier: "MIKE39",
  poll_group_id: 1,
  locked: false,
  author_id: mike.id
})

AnswerChoice.create({
  id: 5,
  poll_id: 3,
  letter: "A",
  body: "10:11 AM"
})

AnswerChoice.create({
  id: 6,
  poll_id: 2,
  letter: "B",
  body: "I don't know"
})

Poll.create({
  id: 3,
  question: "How many Mountain Dews have you had today, dude?",
  poll_identifier: "MIKE41",
  poll_group_id: 1,
  locked: false,
  author_id: mike.id
})

AnswerChoice.create({
  id: 7,
  poll_id: 3,
  letter: "A",
  body: "0 - I haven't gotten to App Academy yet"
})

AnswerChoice.create({
  id: 8,
  poll_id: 3,
  letter: "B",
  body: "1 - It's between 9 and 9:30 AM"
})

AnswerChoice.create({
  id: 9,
  poll_id: 3,
  letter: "C",
  body: "3 - It's early afternoon"
})

AnswerChoice.create({
  id: 10,
  poll_id: 3,
  letter: "D",
  body: "4+ - it must be final project time"
})

Poll.create({
  id: 4,
  question: "Dude, where's my car?",
  poll_identifier: "MIKE59",
  poll_group_id: 1,
  locked: false,
  author_id: mike.id
})

AnswerChoice.create({
  id: 11,
  poll_id: 4,
  letter: "A",
  body: "I'm not going to enable your bad behavior by answering this question"
})

AnswerChoice.create({
  id: 12,
  poll_id: 4,
  letter: "B",
  body: "It's in a barn in upstate New York"
})

AnswerChoice.create({
  id: 13,
  poll_id: 4,
  letter: "C",
  body: "What car?"
})

AnswerChoice.create({
  id: 14,
  poll_id: 1,
  letter: "D",
  body: "No."
})

PollGroup.create({
  id: 1,
  author_id: 1,
  title: "Serious Questions"
})

Poll.create({
  id: 5,
  question: "How many siblings do you have?",
  poll_identifier: "MIKE202",
  poll_group_id: 2,
  locked: false,
  author_id: mike.id
})

AnswerChoice.create({
  id: 15,
  poll_id: 5,
  letter: "A",
  body: "0 - Only Child FTW!"
})

AnswerChoice.create({
  id: 16,
  poll_id: 5,
  letter: "B",
  body: "1"
})

AnswerChoice.create({
  id: 17,
  poll_id: 5,
  letter: "C",
  body: "2"
})

AnswerChoice.create({
  id: 18,
  poll_id: 5,
  letter: "D",
  body: "3"
})

AnswerChoice.create({
  id: 19,
  poll_id: 5,
  letter: "E",
  body: "4+"
})

Poll.create({
  id: 6,
  question: "How much money do you spend per week on groceries?",
  poll_identifier: "MIKE555",
  poll_group_id: 2,
  locked: false,
  author_id: mike.id
})

AnswerChoice.create({
  id: 20,
  poll_id: 6,
  letter: "A",
  body: "$0 - $20"
})

AnswerChoice.create({
  id: 21,
  poll_id: 6,
  letter: "B",
  body: "$20 - $50"
})

AnswerChoice.create({
  id: 22,
  poll_id: 6,
  letter: "C",
  body: "$50 - $100"
})

AnswerChoice.create({
  id: 23,
  poll_id: 6,
  letter: "D",
  body: "$100 +"
})

PollGroup.create({
  id: 2,
  author_id: 1,
  title: "Standard questions about household and family size"
})

Poll.create({
  id: 7,
  question: "Who is your cell phone provider?",
  poll_identifier: "MIKE291",
  poll_group_id: 0,
  locked: false,
  author_id: mike.id
})

AnswerChoice.create({
  id: 24,
  poll_id: 7,
  letter: "A",
  body: "Verizon"
})

AnswerChoice.create({
  id: 25,
  poll_id: 7,
  letter: "B",
  body: "AT&T"
})

AnswerChoice.create({
  id: 26,
  poll_id: 7,
  letter: "C",
  body: "Sprint"
})

AnswerChoice.create({
  id: 27,
  poll_id: 7,
  letter: "D",
  body: "Boost"
})

PollGroup.create({
  id: 0,
  author_id: 1,
  title: "Ungrouped"
})

Poll.create({
  id: 8,
  question: "How much are you spending on Christmas presents this year?",
  poll_identifier: "MIKE745",
  poll_group_id: 3,
  locked: false,
  author_id: mike.id
})

AnswerChoice.create({
  id: 28,
  poll_id: 8,
  letter: "A",
  body: "$0 - $20"
})

AnswerChoice.create({
  id: 29,
  poll_id: 8,
  letter: "B",
  body: "$20 - $50"
})

AnswerChoice.create({
  id: 30,
  poll_id: 8,
  letter: "C",
  body: "$50 - $100"
})

AnswerChoice.create({
  id: 31,
  poll_id: 8,
  letter: "D",
  body: "$100 +"
})

Poll.create({
  id: 9,
  question: "How many hours per week do you spend watching television?",
  poll_identifier: "MIKE924",
  poll_group_id: 3,
  locked: false,
  author_id: mike.id
})

AnswerChoice.create({
  id: 32,
  poll_id: 9,
  letter: "A",
  body: "0 - 5"
})

AnswerChoice.create({
  id: 33,
  poll_id: 9,
  letter: "B",
  body: "5 - 10"
})

AnswerChoice.create({
  id: 34,
  poll_id: 9,
  letter: "C",
  body: "10 - 20"
})

AnswerChoice.create({
  id: 35,
  poll_id: 9,
  letter: "D",
  body: "20 +"
})

PollGroup.create({
  id: 3,
  author_id: 1,
  title: "More consumer data type information"
})

moonshine = User.new({
  id: 2,
  username: "moonshine",
  session_token: nil
})
moonshine.password = "meowmeow"
moonshine.save


Poll.create({
  id: 10,
  question: "Can you please let me out?",
  poll_identifier: "MOONSHINE44",
  poll_group_id: 0,
  locked: false,
  author_id: moonshine.id
})

AnswerChoice.create({
  id: 36,
  poll_id: 10,
  letter: "A",
  body: "Yes"
})

AnswerChoice.create({
  id: 37,
  poll_id: 10,
  letter: "B",
  body: "No"
})

PollGroup.create({
  id: 4,
  author_id: 2,
  title: "Ungrouped"
})

Poll.create({
  id: 11,
  question: "Can I chase the red dot around for a bit?",
  poll_identifier: "MOONSHINE44",
  poll_group_id: 5,
  locked: false,
  author_id: moonshine.id
})

AnswerChoice.create({
  id: 38,
  poll_id: 11,
  letter: "A",
  body: "Yes"
})

AnswerChoice.create({
  id: 39,
  poll_id: 11,
  letter: "B",
  body: "Not today, you've been doing it a lot today."
})

AnswerChoice.create({
  id: 40,
  poll_id: 11,
  letter: "C",
  body: "Later today.  You're such a good kitty."
})

Poll.create({
  id: 12,
  question: "How much catnip is left?",
  poll_identifier: "MOONSHINE77",
  poll_group_id: 5,
  locked:false,
  author_id: moonshine.id
})

AnswerChoice.create({
  id: 41,
  poll_id: 12,
  letter: "A",
  body: "Not telling"
})

AnswerChoice.create({
  id: 42,
  poll_id: 12,
  letter: "B",
  body: "Enough for you to have a little fun"
})

AnswerChoice.create({
  id: 43,
  poll_id: 12,
  letter: "C",
  body: "Lots!  We just got back from the farmers market!"
})

Poll.create({
  id: 13,
  question: "How many nights per week do you eat fish?",
  poll_identifier: "MOONSHINE592",
  poll_group_id: 5,
  locked:false,
  author_id: moonshine.id
})

AnswerChoice.create({
  id: 44,
  poll_id: 13,
  letter: "A",
  body: "0"
})

AnswerChoice.create({
  id: 45,
  poll_id: 13,
  letter: "B",
  body: "1"
})

AnswerChoice.create({
  id: 46,
  poll_id: 13,
  letter: "C",
  body: "2"
})

AnswerChoice.create({
  id: 47,
  poll_id: 13,
  letter: "D",
  body: "3+"
})

PollGroup.create({
  id: 5,
  author_id: 2,
  title: "Standard Cat-Type Questions"
})

Poll.create({
  id: 14,
  question: "How much longer do you plan on sitting in my chair?",
  poll_identifier: "MOONSHINE925",
  poll_group_id: 6,
  locked:false,
  author_id: moonshine.id
})

AnswerChoice.create({
  id: 48,
  poll_id: 14,
  letter: "A",
  body: "I'll get up for you right now, your majesty"
})

AnswerChoice.create({
  id: 49,
  poll_id: 14,
  letter: "B",
  body: "Not too much longer"
})

AnswerChoice.create({
  id: 50,
  poll_id: 14,
  letter: "C",
  body: "I'm going to be here for quite some time"
})

Poll.create({
  id: 15,
  question: "How much longer until I can get out of this awful cat carrier?",
  poll_identifier: "MOONSHINE749",
  poll_group_id: 6,
  locked:false,
  author_id: moonshine.id
})

AnswerChoice.create({
  id: 51,
  poll_id: 15,
  letter: "A",
  body: "You can come out right now!"
})

AnswerChoice.create({
  id: 52,
  poll_id: 15,
  letter: "B",
  body: "It's going to be a little while, but we're almost there."
})

AnswerChoice.create({
  id: 53,
  poll_id: 15,
  letter: "C",
  body: "Quite some time."
})

AnswerChoice.create({
  id: 54,
  poll_id: 15,
  letter: "D",
  body: "I don't know."
})

Poll.create({
  id: 16,
  question: "How many toys are you planning on getting me for Christmas?",
  poll_identifier: "MOONSHINE945",
  poll_group_id: 6,
  locked:false,
  author_id: moonshine.id
})

AnswerChoice.create({
  id: 55,
  poll_id: 16,
  letter: "A",
  body: "0"
})

AnswerChoice.create({
  id: 56,
  poll_id: 16,
  letter: "B",
  body: "1"
})

AnswerChoice.create({
  id: 57,
  poll_id: 16,
  letter: "C",
  body: "2"
})

AnswerChoice.create({
  id: 58,
  poll_id: 16,
  letter: "D",
  body: "3+"
})

PollGroup.create({
  id: 6,
  author_id: 2,
  title: "More Cat-Style Questions"
})

tibby = User.new({
  id: 3,
  username: "tibby",
  session_token: nil
})

tibby.password = "imreallyadog"
tibby.save

Poll.create({
  id: 17,
  question: "Where's something I can sit on and get fur all over?",
  poll_identifier: "TIBBY22",
  poll_group_id: 7,
  locked: false,
  author_id: tibby.id
})

AnswerChoice.create({
  id: 59,
  poll_id: 17,
  letter: "A",
  body: "Try the quilt I'm making downstairs in the sewing room"
})

AnswerChoice.create({
  id: 60,
  poll_id: 17,
  letter: "B",
  body: "How about this cake I just made?"
})

AnswerChoice.create({
  id: 61,
  poll_id: 17,
  letter: "C",
  body: "I just made the bed.  Try that."
})

PollGroup.create({
  id: 7,
  author_id: 3,
  title: "Ungrouped"
})
