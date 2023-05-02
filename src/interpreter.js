const fs = require('fs');
const commands = require('./commands.js');

const isValid = function(command) {
  return command !== undefined;
};

const execute = function(env, {command, args}) {
  const commandToExecute = commands[command];
  if(!isValid(commandToExecute)) {
    console.error(`shell: ${command}: Invalid token`);
    process.exit(1);
  }

  args = args.map(function(argument) {
    return expandWildCard(argument, env.pwd);
  }).flat();

  return commandToExecute(env, args);
};

const expandWildCard = function(argument, pwd) {
  const startsWithQuote = /^[\"\']/;

  if(startsWithQuote.test(argument) || (!argument.includes('*'))) {
    return argument;
  }

  argument = argument.replace(/\*\**/, '*');
  const [prefix, postfix] = argument.split('*');
  const parentDir = pwd + '/' +  prefix;
  let contents = fs.readdirSync(parentDir);

  contents = contents.map(function(content) {
    return prefix + content + postfix;
  });

  return contents.filter(function(content) {
    return fs.existsSync(pwd + '/' + content);
  }); 

  return contents;
};

const run = function(instructions) {
  const HOME = process.env.HOME;
  let pwd = process.env.PWD;
  let oldPwd = HOME;

  return instructions.reduce(
    function(output, cmd){
      ({cmdOut = '', env:{pwd, oldPwd}, error = ''} =  execute({pwd, HOME, oldPwd}, cmd));
      const command = cmd.command;
      output.push({command, cmdOut, error});
      return output;
    } , []);
};

exports.run = run;
