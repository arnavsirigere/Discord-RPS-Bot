// Command for executing the game

let gameMechanics = { rock: 'paper', paper: 'scissors', scissors: 'rock' };

function game(userData, move, message, ref, data, database) {
  userData.played = true;
  let history = userData.history;
  history.push(move);
  if (history[0] == 0 || history.length > 23) {
    history.shift();
  }
  let prevMove = history[history.length - 2];
  let prediction = predictMove(prevMove, history.slice().splice(0, history.length - 1));
  let aiChoice = gameMechanics[prediction];
  let winner = gameMechanics[move] == aiChoice ? 'AI' : gameMechanics[aiChoice] == move ? 'USER' : 'TIE';
  let reply = `
  I chose ${'`' + aiChoice + '`'}!
  `;
  if (winner == 'AI') {
    userData.aiScore++;
    reply += 'I win this round! 😁';
  } else if (winner == 'USER') {
    userData.userScore++;
    reply += 'You win this round! 😓';
  } else {
    reply += 'This round is a tie! 🙌';
  }
  message.reply(reply);
  updateData(userData, ref, data, database);
}

function predictMove(prevMove, history) {
  if (history.length < 2) {
    return randomMove();
  }
  let ngrams = {};
  for (let i = 0; i < history.length - 1; i++) {
    let selection = history[i];
    if (!ngrams[selection]) {
      ngrams[selection] = [];
    }
    ngrams[selection].push(history[i + 1]);
  }
  let moves = ngrams[prevMove];
  let prediction;
  if (moves) {
    prediction = random(ngrams[prevMove]);
  } else {
    prediction = predictMove(history[history.length - 2], history);
  }
  return prediction;
}

function randomMove() {
  let moves = Object.keys(gameMechanics);
  return random(moves);
}

function random(arr) {
  // To return random element of array
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function updateData(userData, ref, data, database) {
  let keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (data[key].id == userData.id) {
      let userRef = database.ref(`users/${key}`);
      userRef.set(userData);
    }
  }
}

module.exports = game;
