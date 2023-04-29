const fs = require('fs');
const {resolvePath} = require('../lib/utils.js');

const throwError = function(path) {
  console.error(`${path}: no such file or directory`);
  process.exit(1);
};

const formatOutput = function(cmdOut, env) {
  return {
    cmdOut, 
    env
  }
};

const isValid = function(path, command) {
  if(!fs.existsSync(path)) {
    throwError(command + ': ' + path);
  };
};

const pwd = function(env) {
  return formatOutput(env.pwd, env);
};

const ls = function(env, [path = env.pwd]) {
  const resolvedPath = resolvePath(env, path);
  isValid(resolvedPath, 'ls');
  const contents = fs.readdirSync(resolvedPath).join(' '); 

  return formatOutput(contents, env);
};

const cd = function(env, [path = '~']) {
  const resolvedPath = resolvePath(env, path);
  isValid(resolvedPath, 'cd');
  env.pwd = resolvedPath;

  return formatOutput('', env);
};

const cat = function(env, [path = '']) {
  if(path === '') {
    throwError('cat');
  }
  const resolvedPath = resolvePath(env, path);
  isValid(resolvedPath, 'cat');
  const contents = fs.readFileSync(resolvedPath, 'utf-8'); 

  return formatOutput(contents, env);
};

exports.ls = ls;
exports.pwd = pwd;
exports.cd = cd;
exports.cat = cat;
