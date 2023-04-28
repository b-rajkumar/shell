const fs = require('fs');
const commands = require('./commands.js');
const env = {
  PWD: process.env.PWD, 
  HOME: process.env.HOME, 
};

const isValid = function(command) {
  return commands[command] !== undefined;
};

const execute = function({command, args}) {
  if(!isValid(command)) {
    console.error(`${command} Invalid token`);
    console.exit(1);
  }
  commands[command](env, args);
};

const run = function(instructions) {
  instructions.forEach(execute);
};

exports.run = run;
