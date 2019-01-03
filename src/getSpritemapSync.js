const crossSpawn = require('cross-spawn');

// ugly hack 🤮
module.exports = (dir, settings = {}) => {
  const results = crossSpawn.sync('node', [
    '-e',
    `(async () => {
        try {
          console.log(await require('${__dirname}/getSpritemap')('${dir}', ${JSON.stringify(settings)}));
        } catch (err) {
          console.error(JSON.stringify(err));
        }
      })();`,
  ]);

  if (results.stderr.length) {
    // throw JSON.parse(results.stderr);
    throw (results.stderr);
  }

  return results.stdout.toString().trim();
};
