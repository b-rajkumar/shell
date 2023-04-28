const resolvePath = function(env, relativePath) {
  const regx = /\.\./;
  let postfix = relativePath;
  let prefix = env.PWD;

  if(!/^[~\.]/.test(postfix)) {
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

exports.resolvePath = resolvePath;
