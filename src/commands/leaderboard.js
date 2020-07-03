// Command for showing the leaderboard -  sorted by the user who has the greatest positive difference between his score and the ai's score
// You caan view top n players
// Or what position you stand at

function leaderboard(id, message, data, userData, num) {
  let keys = Object.keys(data);
  let players = [];
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let userData = data[key];
    if (userData.played) {
      let points = userData.userScore;
      let { name, id } = userData;
      players[i] = { name, points, id };
    }
  }
  players = players.sort((a, b) => b.points - a.points);

  let reply;
  if (num) {
    if (!players.length) {
      reply = 'Nobody has made it to the leaderboard yet!';
    } else if (num > players.length) {
      reply = `${num} players haven't played the game yet!`;
    } else {
      reply = num == 1 ? 'Here is the top player\n\n' : `Here are the top ${num} players - \n\n`;
      for (let i = 0; i < num; i++) {
        let position = addOrdinalSuffix(i + 1);
        let name = players[i].name;
        let points = players[i].points;
        reply += `${'`' + `${position} - ${name} (${points})` + '`'}\n`;
      }
    }
  } else {
    if (!userData.played) {
      reply = "You haven't played yet!";
    } else {
      for (let i = 0; i < players.length; i++) {
        if (players[i].id == id) {
          let points = players[i].points;
          reply = `You're at the ${addOrdinalSuffix(i + 1)} position with a score of ${points} point${points == 1 ? '' : 's'}!`;
        }
      }
      if (!players.length) {
        reply = 'Nobody has made it to the leaderboard yet!';
      }
    }
  }
  message.reply(reply);
}

function addOrdinalSuffix(num) {
  let j = num % 10;
  let k = num % 100;
  if (j == 1 && k != 11) {
    return num + 'st';
  }
  if (j == 2 && k != 12) {
    return num + 'nd';
  }
  if (j == 3 && k != 13) {
    return num + 'rd';
  }
  return num + 'th';
}

module.exports = leaderboard;
