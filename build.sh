#!/bin/bash

export NODE_ENV=production
export CONTENTFUL_SPACE=v9u7v7jawm36
export CONTENTFUL_ACCESS_TOKEN=a15a60af447bb88662e7eed5dc8ed2042d623307cfbda6b9c1e7aa849ca15ef7

set -e

npm run lint
webpack --bail

SOURCE=src
DIST=dist
DIR_SASS=scss
DIR_CSS=css
DIR_FONTS=fonts

cp -r $SOURCE/$DIR_SASS $DIST/$DIR_CSS
cp -r $SOURCE/$DIR_FONTS $DIST/$DIR_FONTS

echo "----------------------------------------------";
echo "Build successful!";
echo "----------------------------------------------";
