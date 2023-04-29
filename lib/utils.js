const fs = require('fs');

const resolvePath = function(env, relativePath) {
  if(relativePath.startsWith('/')) {
    return formatPath(relativePath);
  }

  let postfix = relativePath.replace(/^\.\/(.*)/, '$1');
  let prefix = env.pwd;

  if(relativePath.includes('~')) {
    postfix = relativePath.replace('~', '');
    prefix = env.HOME;
  }

  return formatPath(`${prefix}/${postfix}`);
};

const formatPath = function(path) {
  let formattedPath = '/' + path.split('/').reduce(function(components, currentComponent, index) {
    if(currentComponent === '..') {
      components.pop(currentComponent);
      return components;
    }
    components.push(currentComponent);
    return components;
  }, []).join('/');

  return formattedPath.replace('//', '/');
};

const display = function(output) {
  output.forEach(function({command, cmdOut}) {
    console.log(`${command}: ${cmdOut}`);
  });
};

exports.resolvePath = resolvePath;
exports.display = display;
