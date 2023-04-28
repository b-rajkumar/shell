const fs = require('fs');

const {HOME, PWD} = process.env;

const ls = function([path = env.PWD]) {
  const resolvedPath = resolvePath(path);

  if(!fs.existsSync(resolvedPath)) {
    throwError('ls: ' + resolvedPath);
  };

  const contents = fs.readdirSync(resolvedPath).join(' '); 
  console.log('ls: ' +  contents);
};

const pwd = function() {
  console.log('pwd: ' + env.PWD);
};

const cd = function([path = '~']) {
  const resolvedPath = resolvePath(path);

  if(!fs.existsSync(resolvedPath)) {
    throwError('cd: ' + resolvedPath);
  };

  console.log('cd: ' + resolvedPath);
  env.PWD = resolvedPath;
};

const cat = function([path = '']) {
  if(path === '') {
    throwError('cat');
  }

  const resolvedPath = resolvePath(path);

  if(!fs.existsSync(resolvedPath)) {
    throwError(resolvedPath);
  };

  const contents = fs.readFileSync(resolvedPath, 'utf-8'); 
  console.log('cat: ' + contents);
};

const tokenize = function(code) {
  const commands = code.replace(/\n\n*/g,'\n').replace(/  */g, ' ');
  return commands.split('\n').slice(0, -1);
};

const resolvePath = function(relativePath) {
  const regx = /\.\./;
  let path = env.PWD;
  relativePath = relativePath.replace(/^\.\/(.*)/, `$1`);

  if(env.PWD === relativePath) {
    return env.PWD;
  }

  if(/~/.test(relativePath)) {
    relativePath = relativePath.replace(/~/, '');
    path = env.HOME;
  }

  relativePath = relativePath.replace(/^\/(.*)/, `$1`);
  while(regx.test(relativePath)) {
    path = path.replace(/(.*)\/(.*)$/, `$1`);
    relativePath = relativePath.replace(/^\.\.(.*)/, `$1`);
    relativePath = relativePath.replace(/^\/(.*)/, `$1`);
  }

  let resolvedPath = path;
  resolvedPath = `${path}/${relativePath}`.replace(/(.*)\/\/(.*)$/, `$1/$2`);

  return resolvedPath;
};

const commands = {ls, pwd, cd, cat};

const throwError = function(path) {
  console.error(`${path}: no such file or directory`);
  process.exit(1);
};

const isValidToken = function(token) {
  return commands[token] !== undefined;
};

const executeCommand = function([command, ...args]) {
  commands[command](args);
};

const parseTokens = function(tokens) {
  tokens.forEach(function(token) {
    const parsedToken = token.replace(/  */, ' ').split(' ');

    if(!isValidToken(parsedToken[0])) {
      console.error(`${parsedToken[0]} : Invalid token!`);
      process.exit(1);
    }
    executeCommand(parsedToken);
  });
};
