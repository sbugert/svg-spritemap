const getSpritemapSync = require('./getSpritemapSync');
const getSpritemap = require('./getSpritemap');

test('Returns', async () => {
  expect(getSpritemapSync('./fixtures')).toEqual(
    await getSpritemap('./fixtures')
  );
});

test('throws error', async () => {
  expect(() => getSpritemapSync('./wrong')).toThrow();
});
