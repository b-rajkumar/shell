const fs = require('fs');
const commands = require('./commands.js');
const env = {
  PWD: process.env.PWD, 
  HOME: process.env.HOME, 
};

const isValid = function(command) {
  return commands[command] !== undefined;
};

const executeInstruction = function({command, args}) {
  if(!isValid(command)) {
    console.error('Invalid token');
    console.exit(1);
  }
  commands[command](env, args);
};

const execute = function(instructions) {
  instructions.forEach(executeInstruction);
};

exports.execute = execute;
