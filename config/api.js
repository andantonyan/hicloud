var rootDir = process.cwd();

module.exports.api = {
    binPath: rootDir + '/api/bin', // without trailing slash
    newAppDir: rootDir + '/APPS' // without trailing slash
};

console.log(rootDir + '/api/bin', rootDir + '/APPS')