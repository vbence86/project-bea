#!/bin/bash
set -e

npm run lint
npm run webpack

SOURCE=src
DIST=dist
DIR_CSS=css
DIR_FONTS=fonts

cp -r $SOURCE/$DIR_CSS $DIST/$DIR_CSS
cp -r $SOURCE/$DIR_FONTS $DIST/$DIR_FONTS

echo "Build successful!";