// Command for sending a message with instructions

const { MessageEmbed } = require('discord.js');

function help(message) {
  const embed = new MessageEmbed()
    .setColor('#64E9EE')
    .setTitle('Here are the commands you can use  - ')
    .addField('`' + 'rps! [rock | paper | scissors]' + '`', 'To play a round with me!')
    .addField('`' + 'rps! score' + '`', 'To view your overall score and my score against you!')
    .addField('`' + 'rps! rules' + '`', "I'll tell you the rules of the game!")
    .addField('`' + 'rps! leaderboard me' + '`', "I'll tell you what place you stand at in the leaderboard!")
    .addField('`' + 'rps! leaderboard' + '`', "I'll give you the entire leaderboard!")
    .addField('`' + 'rps! leaderboard [n]' + '`', "I'll tell you the top n players in the leaderboard!")
    .addField('`' + 'rps! help' + '`', 'Well, what you just used!')
    .addField('`' + 'rps! cheat?' + '`', "I promise I don't cheat! 😊")
    .addField('`' + 'rps! ping' + '`', 'Pong!')
    .addField('`' + 'rps! congrats' + '`', 'Thank You 😊');
  message.channel.send(embed);
}

module.exports = help;
