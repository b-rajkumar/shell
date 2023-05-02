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

  return resolveStar(argument, pwd).flat();
};

const resolveStar = function(argument, pwd) {
  let [prefix, ...postfix] = argument.split('*');
  let parentDir =  pwd + '/' + prefix;
  postfix = postfix.join('*');

  if(prefix.startsWith('/')) {
    parentDir = prefix;
  };

  if(!fs.existsSync(parentDir + '/')) {
    return parentDir;
  }

  let contents = fs.readdirSync(parentDir);

  return contents.map(function(content) {
    let path = prefix + content + postfix;
    if(path.includes('*')) {
      path = resolveStar(path, pwd);
    }
    return path;
  }).flat();
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
