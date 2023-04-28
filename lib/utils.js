const resolvePath = function(env, relativePath) {
  const regx = /\.\./;
  let path = env.pwd;
  relativePath = relativePath.replace(/^\.\/(.*)/, `$1`);

  if(env.pwd === relativePath) {
    return env.pwd;
  }

  if(/~/.test(relativePath)) {
    relativePath = relativePath.replace(/~/, '');
    path = env.home;
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

exports.resolvePath = resolvePath;
