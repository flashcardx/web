var path = require('path');
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

var nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(resolveApp);

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/html/index.html'),
  appIndexJs: resolveApp('react/index.jsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('react'),
  testsSetup: resolveApp('react/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
  nodePaths: nodePaths
};



// config before publish: we're in ./packages/react-scripts/config/
if (__dirname.indexOf(path.join('packages', 'react-scripts', 'config')) !== -1) {
  module.exports = {
    appBuild: resolveOwn('../../../build'),
    appPublic: resolveOwn('../template/public'),
    appHtml: resolveOwn('../template/public/html/index.html'),
    appIndexJs: resolveOwn('../template/react/index.jsx'),
    appPackageJson: resolveOwn('../package.json'),
    appSrc: resolveOwn('../template/react'),
    testsSetup: resolveOwn('../template/react/setupTests.js'),
    appNodeModules: resolveOwn('../node_modules'),
    ownNodeModules: resolveOwn('../node_modules'),
    nodePaths: nodePaths
  };
}
