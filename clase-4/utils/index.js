import { createRequire } from 'node:module';

export const readJSON = (importUrl, path) => {
  const require = createRequire(importUrl);
  return require(path);
};
