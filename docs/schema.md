# Schema Information

## polls
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
poll_identifier | string    | not null
question        | text      | not null
poll_group_id   | integer   | not null, foreign key (references poll_groups), indexed
locked          | boolean   | not null, default: false

## poll_groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
title       | string    | not null
description | string    |

## answer_choices
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
poll_id     | integer   | not null, foreign key (references polls), indexed
letter      | string    | not null
body        | string    | not null
date        | datetime  | not null
prev_id     | integer   | foreign key (references reminders), indexed

## response
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
answer_choice_id | integer   | not null
resondent_id     | integer   | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
