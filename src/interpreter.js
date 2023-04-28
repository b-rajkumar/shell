const fs = require('fs');
let {HOME, PWD} = process.env;
//const {resolvePath} = require('../lib/utils.js');

const resolvePath = function(relativePath) {
  const regx = /\.\./;
  let path = PWD;
  relativePath = relativePath.replace(/^\.\/(.*)/, `$1`);

  if(PWD === relativePath) {
    return PWD;
  }

  if(/~/.test(relativePath)) {
    relativePath = relativePath.replace(/~/, '');
    path = HOME;
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

const isValidToken = function(token) {
  return commands[token] !== undefined;
};

const executeInstruction = function({command, args}) {
  if(!isValidToken(command)) {
    console.error('Invalid token');
    console.exit(1);
  }
  commands[command](args);
};

const execute = function(instructions) {
  instructions.forEach(executeInstruction);
};

const pwd = function() {
  console.log('pwd: ' + PWD);
};

const ls = function([path = PWD]) {
  const resolvedPath = resolvePath(path);

  if(!fs.existsSync(resolvedPath)) {
    throwError('ls: ' + resolvedPath);
  };

  const contents = fs.readdirSync(resolvedPath).join(' '); 
  console.log('ls: ' +  contents);
};

const cd = function([path = '~']) {
  const resolvedPath = resolvePath(path);
  if(!fs.existsSync(resolvedPath)) {
    throwError('cd: ' + resolvedPath);
  };
  PWD = resolvedPath;
  console.log('cd: ' + resolvedPath);
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

const commands = {ls, pwd, cd, cat};
exports.execute = execute;
