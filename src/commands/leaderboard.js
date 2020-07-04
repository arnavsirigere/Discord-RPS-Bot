// Command for showing the leaderboard -  sorted by user with highest points
// You can view top n players
// Or what position you stand at
// Or entire leaderboard

function leaderboard(id, message, data, userData, cmd) {
  let keys = Object.keys(data);
  let players = [];
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let userData = data[key];
    if (userData.played) {
      let points = userData.userScore;
      let { name, id } = userData;
      players.push({ name, points, id });
    }
  }
  players = players.sort((a, b) => b.points - a.points);

  let reply;
  if (cmd && cmd == 'me') {
    if (!userData.played) {
      reply = "You haven't played yet!";
    } else {
      for (let i = 0; i < players.length; i++) {
        if (players[i].id == id) {
          let points = players[i].points;
          reply = `You're at ${addOrdinalSuffix(i + 1)} place with ${points} point${points == 1 ? '' : 's'}!`;
        }
      }
    }
  } else if (!players.length) {
    reply = 'Nobody has made it to the leaderboard yet!';
  } else if (/\d+/.test(cmd)) {
    if (cmd > players.length) {
      reply = `${cmd} players haven't played the game yet!`;
    } else if (cmd == 0) {
      reply = 'Seriously, 0?';
    } else {
      reply = getLeaderBoard(cmd, players, false);
    }
  } else if (!cmd) {
    reply = getLeaderBoard(players.length, players, true);
  }
  message.reply(reply);
}

function getLeaderBoard(num, players, getFull) {
  let reply = getFull ? 'Here is the leaderboard - \n\n' : num == 1 ? 'Here is the top player\n\n' : `Here are the top ${num} players - \n\n`;
  let position = 1;
  let streak = 1;
  let streakOngoing = false;
  for (let i = 0; i < num; i++) {
    let name = players[i].name;
    let points = players[i].points;
    if (i > 0) {
      if (players[i - 1].points == points) {
        streak++;
      } else {
        position += streak;
        streak = 1;
      }
    }
    let place = addOrdinalSuffix(position);
    reply += `${'`' + `${place} - ${name} (${points})` + '`'}\n`;
  }
  return reply;
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
