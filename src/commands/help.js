// Command for sending a message with instructions

function help(message) {
  let reply = `
Here are the commands you can use - 

${'`' + 'rps! score' + '`'} - To view your overall score and my score against you!
${'`' + 'rps! [rock | paper | scissors]' + '`'} - To play a round with me!
${'`' + 'rps! help' + '`'} - Well, what you just used.
${'`' + 'rps! ping' + '`'} - Pong!
${'`' + 'rps! cheat?' + '`'} - I promise I don't cheat! 😊
${'`' + 'rps! rules' + '`'} - I'll tell you the rules of the game
${'`' + 'rps! leaderboard' + '`'} - I'll give you the entire leaderboard
${'`' + 'rps! leaderboard me' + '`'} - I'll tell you what place you stand at in the leaderboard
${'`' + 'rps! leaderboard [n]' + '`'} - I'll tell you the top n players in the leaderboard!
${'`' + 'rps! congrats' + '`'} - 'Thank You 😊'
`;
  message.channel.send(reply);
}

module.exports = help;
