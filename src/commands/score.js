// Command for telling the user his score and the ai's score against him

function tellScore(userData, message) {
  let { aiScore, userScore } = userData;
  let userIsWinner = userScore >= aiScore;
  let reply = `
  ${userIsWinner ? `Your score against me : ${'`' + userScore + '`'}` : `My Score against you  : ${'`' + aiScore + '`'}`}
  ${userIsWinner ? `My Score against you   : ${'`' + aiScore + '`'}` : `Your score against me : ${'`' + userScore + '`'}`}
  ${aiScore > userScore ? 'I am winning! 😁' : userScore > aiScore ? 'You are winning! 😓' : 'We are all tied up! 🙌'}`;
  message.reply(reply);
}

module.exports = tellScore;
