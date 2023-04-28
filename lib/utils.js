const resolvePath = function(env, relativePath) {
  if(!/^[~\.]/.test(relativePath)) {
    return relativePath;
  }
  const regx = /\.\./;

  let path = env.PWD;

  if(/~/.test(relativePath)) {
    relativePath = relativePath.replace(/~/, '');
    path = env.HOME;
  }

  relativePath = relativePath.replace(/^\.\/(.*)/, `$1`);
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
