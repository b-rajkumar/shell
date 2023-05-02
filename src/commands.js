const fs = require('fs');
const {resolvePath} = require('../lib/utils.js');

const pwd = function(env) {
  const cmdOut = env.pwd;
  return {cmdOut, env};
};

const ls = function(env, [path = env.pwd, ...rest]) {
  const paths = [path, ...rest];

  const cmdOut = paths.reduce(function(lists, path) {
    return lists + '\n' +  list(env, path);
  }, '');

  return {cmdOut, env};
};

const list = function(env, path) {
  const resolvedPath = resolvePath(env, path);
  const error = `${path}: No such file or directory`

  if(!fs.existsSync(resolvedPath)) {
    return error;
  }

  const cmdOut = fs.readdirSync(resolvedPath).join(' ');

  return `${path}:
  ${cmdOut}`;
};

const cd = function(env, [path = '~']) {
  if(path === '-') {
    path = env.oldPwd;
  }
  const resolvedPath = resolvePath(env, path);
  const cmdOut = resolvedPath; 
  const error = `${path}: No such file or directory`

  if(!fs.existsSync(resolvedPath)) {
    return {env, error};
  }

  env.oldPwd = env.pwd;
  env.pwd = resolvedPath;

  return {cmdOut, env};
};

const cat = function(env, [path = '']) {
  const resolvedPath = resolvePath(env, path);
  const error = `${path}: No such file or directory`

  if(!fs.existsSync(resolvedPath)) {
    return {env, error};
  }

  const cmdOut = fs.readFileSync(resolvedPath, 'utf-8'); 

  return {cmdOut, env};
};

const echo = function(env, text) {
  const cmdOut = text.join(' ');
  return {cmdOut, env};
};

exports.ls = ls;
exports.pwd = pwd;
exports.cd = cd;
exports.cat = cat;
exports.echo = echo;
