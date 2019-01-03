# svg-spritemap

> Generate svg spritemap string from folder with svg files

## Usage

Look at tests.

With React and [preval.macro](https://github.com/kentcdodds/preval.macro):
```JSX
import React from 'react';
import preval from 'preval.macro'

const spritemap = preval`
import { getSpritemapSync } from 'svg-spritemap';
module.exports = getSpritemapSync('logos', { withSvgTag: false });
`;

export default () => (
  <svg
    width="0"
    height="0"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    dangerouslySetInnerHTML={{ __html: spritemap }}
  />
);
```
