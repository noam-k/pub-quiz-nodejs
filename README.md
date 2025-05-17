# pub-quiz-nodejs

This is a fun project for me to learn NodeJs.

The premise of this software is a backend website where pub-quizes can be managed:
- There's an API point for participants to send their answers
- There are multiple API points for the quiz manager to administrate the quiz
  - Delete all data (i.e. before starting a new quiz)
  - Mark answers as right / wrong
  - Get a summary of a quiz: which teams scored what


## How to run
`npm install`
I'm using nodemon to run my app:
`nodemon app`
but if you just want to see the results the following should suffice:
`npm run app`

## Don't actually use this
If nothing else, allowing internet usage to your pub-quiz participants will make it very easy to cheat.
It's also taking away some of the fun of playing in a social setting.

#### This is only meant for me to learn NodeJS
