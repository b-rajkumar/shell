const fs = require('fs');

const resolvePath = function(env, relativePath) {
  if(relativePath.startsWith('/')) {
    return formatPath(relativePath);
  }

  let postfix = relativePath;
  let prefix = env.pwd;

  if(relativePath.includes('~')) {
    postfix = relativePath.replace('~', '');
    prefix = env.HOME;
  }

  return formatPath(`${prefix}/${postfix}`);
};

const parent = function(components) {
  return components.slice(0, -1);
};

const formatPath = function(path) {
  return path.split('/').reduce(function(components, currentComponent, index) {
    if(currentComponent === '.') return components;
    if(currentComponent === '..') return parent(components);
    return [...components, currentComponent];
  }, []).join('/');

  return formattedPath;
};

const display = function(outputs) {
  outputs.forEach(function({command, cmdOut, error}) {

    if(error === '') {
      console.log(`${command}: ${cmdOut}`);
    }else {
      console.log(`${command}: ${error}`);
    }

  });
};

exports.resolvePath = resolvePath;
exports.display = display;
