const fs = require('fs');
const commands = require('./commands.js');

const isValid = function(command) {
  return commands[command] !== undefined;
};

const execute = function(env, {command, args}) {
  if(!isValid(command)) {
    console.error(`shell: ${command}: Invalid token`);
    process.exit(1);
  }

  return commands[command](env, args);
};

const run = function(instructions) {
  const HOME = process.env.HOME;
  let pwd = process.env.PWD;

  return instructions.reduce(
    function(output, cmd){
      ({cmdOut, env:{pwd}} =  execute({pwd, HOME}, cmd));
      const command = cmd.command;
      output.push({command, cmdOut});
      return output;
    } , []);
};

exports.run = run;
