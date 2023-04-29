const fs = require('fs');

const isAbsPath = function(path) {
  return !(/^[~\.]/.test(postfix));

};

const resolvePath = function(env, relativePath) {
  const regx = /\.\./;
  let postfix = relativePath;
  let prefix = env.pwd;

  if(isAbsPath) {
    let resolvedPath = `${prefix}/${postfix}`;
    if(fs.existsSync(resolvedPath)) {
      return resolvedPath;
    }
    return postfix;
  }

  if(/~/.test(postfix)) {
    postfix = postfix.replace(/~/, '');
    prefix = env.HOME;
  }

  postfix = postfix.replace(/^[\.\/][^\.](.*)/, `$1`);
  while(regx.test(postfix)) {
    prefix = prefix.replace(/(.*)\/(.*)$/, `$1`);
    postfix = postfix.replace(/^\.\.(.*)/, `$1`);
    postfix = postfix.replace(/^\/(.*)/, `$1`);
  }

  let resolvedPath = prefix;
  resolvedPath = `${prefix}/${postfix}`.replace(/(.*)\/\/(.*)$/, `$1/$2`);

  return resolvedPath;
};

const display = function(output) {
  output.forEach(function({command, cmdOut}) {
    console.log(`${command}: ${cmdOut}`);
  });
};

exports.resolvePath = resolvePath;
exports.display = display;
