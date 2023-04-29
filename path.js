const ormatPath = function(path) {
  const pathParts = path.split('/');
  const newParts = [];
  for(let i = 0; i < pathParts.length; i++) {
    if(pathParts[i + 1] !== '..' && pathParts[i] !== '..') {
      newParts.push(pathParts[i]);
    }
  }
  return newParts.join('/');
};

const formatPath = function(path) {
  const pathParts = path.split('/');
  return pathParts.reduce(function(parts, currentPart, index) {
    if(currentPart === '..') {
      parts.pop(currentPart);
      return parts;
    }
    parts.push(currentPart);
    return parts;
  }, []).join('/');
};

