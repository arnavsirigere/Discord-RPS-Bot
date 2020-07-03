require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const firebase = require('firebase');
const game = require('./commands/game');
const tellScore = require('./commands/score');
const help = require('./commands/help');
const { replies, shortReply } = require('./commands/phrases');
const leaderboard = require('./commands/leaderboard');

// Keeping the bot alive
const keepAlive = require('../server');
keepAlive();

// Getting all the data of the game history from Firebase
const firebaseConfig = process.env.FIREBASE_CONFIG.split(' ');
const app = firebase.initializeApp({
  apiKey: firebaseConfig[0],
  authDomain: firebaseConfig[1],
  databaseURL: firebaseConfig[2],
  projectId: firebaseConfig[3],
  storageBucket: firebaseConfig[4],
  messagingSenderId: firebaseConfig[5],
  appId: firebaseConfig[6],
});
const database = app.database();
const ref = database.ref('/users');
let data;
ref.on('value', (res) => {
  data = res.val();
});

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log('Discord bot is starting!');
  client.user.setActivity('Rock Paper Scissors');
});

client.on('message', (message) => {
  if (message.author.bot) return;
  let command = message.content.toLowerCase().split(/\s+/);
  if (command[0] == 'rps!') {
    let id = message.author.id;
    let name = message.author.username;
    let userData = getUserData(id, name, data);
    userData.name = name; // Just in case user changes username later
    if (['rock', 'paper', 'scissors'].includes(command[1])) {
      game(userData, command[1], message, ref, data, database);
    } else if (command[1] == 'score') {
      tellScore(userData, message);
    } else if (command[1] == 'help') {
      help(message);
    } else if (Object.keys(replies).includes(command[1])) {
      shortReply(command[1], message);
    } else if (command[1] == 'leaderboard') {
      if (command[2] && /\d+/.test(command[2])) {
        leaderboard(id, message, data, userData, command[2]);
      } else {
        leaderboard(id, message, data, userData);
      }
    } else {
      message.reply(`That command doesn't exist ¯\\_(ツ)_/¯ , yet`);
    }
  }
});

// Get all the game history of the user
function getUserData(id, name, data) {
  // Just in case user doesn't have a game history
  let newData = {
    id,
    name,
    history: [0], // We're putting dummy data just so firebase registers it
    userScore: 0,
    aiScore: 0,
    played: false,
  };

  if (data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (data[key].id == id) {
        let userData = data[key];
        return userData;
      }
    }
    ref.push(newData);
    return newData;
  } else {
    ref.push(newData);
    return newData;
  }
}
