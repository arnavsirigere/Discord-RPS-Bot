// Command for telling the user his score and the ai's score against him

const { MessageEmbed } = require('discord.js');

function tellScore(userData, message) {
  const { aiScore, userScore } = userData;
  const userIsWinner = userScore >= aiScore;
  const title = `${aiScore > userScore ? 'I am winning! 😁' : userScore > aiScore ? 'You are winning! 😓' : 'We are all tied up! 🙌'}`;
  const embed = new MessageEmbed()
    .setColor('#5603AD')
    .setTitle(title)
    .addField(`${userIsWinner ? 'Your score' : 'My score'}`, userIsWinner ? userScore : aiScore)
    .addField(`${userIsWinner ? 'My score' : 'Your score'}`, userIsWinner ? aiScore : userScore);

  message.reply(embed);
}

module.exports = tellScore;
