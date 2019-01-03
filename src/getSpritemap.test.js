const getSpritemap = require('./getSpritemap');

test('generates svg spritemap for files in directory', async () => {
  expect(
    await getSpritemap('./fixtures', { optimize: true })
  ).toMatchSnapshot();
});

test('omits svg tag', async () => {
  expect(
    await getSpritemap('./fixtures', { withSvgTag: false, optimize: true })
  ).toMatchSnapshot();
});

test('does not insert new title if old exists', async () => {
  expect(await getSpritemap('./fixtures/3')).toMatchSnapshot();
});
