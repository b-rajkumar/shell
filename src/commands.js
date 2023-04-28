const fs = require('fs');
const {resolvePath} = require('../lib/utils.js');

const throwError = function(path) {
  console.error(`${path}: no such file or directory`);
  process.exit(1);
};

const isValid = function(path, command) {
  if(!fs.existsSync(path)) {
    throwError(command + path);
  };
};

const ls = function(env, [path = env.PWD]) {
  const resolvedPath = resolvePath(env, path);
  isValid(resolvedPath, 'ls');
  const contents = fs.readdirSync(resolvedPath).join(' '); 
  console.log('ls: ' +  contents);
};

const pwd = function(env) {
  console.log('pwd: ' + env.PWD);
};

const cd = function(env, [path = '~']) {
  const resolvedPath = resolvePath(env, path);
  isValid(resolvedPath, 'cd');
  env.PWD = resolvedPath;
  console.log('cd: ' + resolvedPath);
};

const cat = function(env, [path = '']) {
  if(path === '') {
    throwError('cat');
  }
  const resolvedPath = resolvePath(env, path);
  isValid(resolvedPath, 'cat');
  const contents = fs.readFileSync(resolvedPath, 'utf-8'); 
  console.log('cat: ' + contents);
};

exports.ls = ls;
exports.pwd = pwd;
exports.cd = cd;
exports.cat = cat;
