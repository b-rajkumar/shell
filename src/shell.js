const fs = require('fs');

const ls = function(path = pwd) {
  console.log(fs.readdirSync(path));
};

const pwd = function() {
  console.log('pwd');
};

const cd = function() {
  console.log('cd');
};

const tokenize = function(code) {
  const commands = code.replace(/\n\n*/g,'\n').replace(/  */g, ' ');
  return commands.split('\n').slice(0, -1);
};

const resolvePath = function(pwd, relativePath) {
  const regx = /\.\./;
  let path = pwd;
  relativePath = relativePath.replace(/^\.\/(.*)/, `$1`);

  while(regx.test(relativePath)) {
    path = path.replace(/(.*)\/(.*)$/, `$1`);
    relativePath = relativePath.replace(/^\.\.\/(.*)/, `$1`);
  }

  return `${path}/${relativePath}`;
};

const commands = {ls, pwd, cd};

const isValidCommand = function(command) {

};

const executeCommands = function(token) {
  tokens.forEach(function(token) {
    const parsedToken = token.split(' ');
    const command = token[0];



  };
};

const run = function() {
  const code = fs.readFileSync('./src/shell-script.txt', 'utf-8');
  const tokens = tokenize(code);
  const pwd = process.env.PWD;
  executeCommands(tokens);
};

run();
