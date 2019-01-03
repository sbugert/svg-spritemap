const { promisify } = require('util');
const { join, basename } = require('path');
const fs = require('fs');
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const cheerio = require('cheerio');
const svgo = require('./svgo');

module.exports = async (dir, settings = {}) => {
  const { optimize = true, withSvgTag = true, idPrefix = 'svg-' } = settings;
  const dirContent = await readdir(dir);
  const files = dirContent.filter(elm => elm.match(/.*\.(svg)/gi));

  const symbols = await Promise.all(
    files.map(async file => {
      let svg = await readFile(join(dir, file));
      if (optimize) {
        svg = (await svgo.optimize(svg)).data;
      }
      const name = basename(file, '.svg');
      const $ = cheerio.load(svg, { xmlMode: true });
      const $root = $('svg');
      if (!$('title').length) {
        $root.prepend(`<title>${name}</title>`);
      }
      $root.attr('id', idPrefix + name);
      $root.removeAttr('xmlns');
      $root[0].tagName = 'symbol';
      return $.html();
    })
  );
  return withSvgTag
    ? `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><defs>${symbols.join(
        ''
      )}</defs></svg>`
    : `<defs>${symbols.join('')}</defs>`;
};
