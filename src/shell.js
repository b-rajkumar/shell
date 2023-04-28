const fs = require('fs');

const HOME = process.env.HOME;
let PWD = process.env.PWD;

const ls = function([path = PWD]) {
  const resolvedPath = resolvePath(path);
  console.log(`ls : ${resolvedPath}`);
  console.log(fs.readdirSync(resolvedPath));
};

const pwd = function() {
  console.log(`pwd: ${PWD}`);
};

const cd = function([path = '~']) {
  const resolvedPath = resolvePath(path);
  console.log(`cd : ${resolvedPath}`);
  PWD = resolvedPath;
};

const tokenize = function(code) {
  const commands = code.replace(/\n\n*/g,'\n').replace(/  */g, ' ');
  return commands.split('\n').slice(0, -1);
};

const resolvePath = function(relativePath) {
  const regx = /\.\./;

  if(PWD === relativePath) {
    return PWD;
  }

  if(/~/.test(relativePath)) {
    relativePath = relativePath.replace(/~/, HOME);
    return relativePath;
  }

  let path = PWD;
  relativePath = relativePath.replace(/^\.\/(.*)/, `$1`);

  while(regx.test(relativePath)) {
    path = path.replace(/(.*)\/(.*)$/, `$1`);
    relativePath = relativePath.replace(/^\.\.(.*)/, `$1`);
    relativePath = relativePath.replace(/^\/(.*)/, `$1`);
  }

  let resolvedPath = path;
  resolvedPath = `${path}/${relativePath}`;

  return resolvedPath.replace(/(.*)\/\/(.*)/, `$1/$2`);
};

const commands = {ls, pwd, cd};

const isValidToken = function(token) {
  return commands[token] !== undefined;
};

const executeCommand = function([command, ...args]) {
  commands[command](args);
};

const parseTokens = function(tokens) {
  tokens.forEach(function(token) {
    const parsedToken = token.split(' ');

    if(!isValidToken(parsedToken[0])) {
      console.error(`${parsedToken[0]} : Invalid token!`);
      process.exit(1);
    }
    executeCommand(parsedToken);
  });
};

const run = function() {
  const code = fs.readFileSync('./src/shell-script.txt', 'utf-8');
  const tokens = tokenize(code);
  parseTokens(tokens);
};

run();
