// All the simple short replies

let replies = {
  ping: 'Pong!',
  'cheat?': "I promise I don't cheat! 😊",
  rules: 'Paper wraps rock! Rock smashes scissors! Scissors cuts paper!',
  congrats: 'Thank You 😊',
};

function shortReply(prompt, message) {
  message.reply(replies[prompt]);
}

module.exports = { replies, shortReply };
