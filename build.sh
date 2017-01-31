#!/bin/bash

set -e

SOURCE=src
DIST=dist
DIR_SASS=scss
DIR_CSS=css
DIR_FONTS=fonts

RESOURCES=resources

export NODE_ENV=production
export CONTENTFUL_SPACE=v9u7v7jawm36
export CONTENTFUL_ACCESS_TOKEN=a15a60af447bb88662e7eed5dc8ed2042d623307cfbda6b9c1e7aa849ca15ef7
export MESSAGE_SERVICE=http://nuevasaventuras.es:8095/email/send

if [ -d "$DIST" ]; then rm -Rf $DIST; fi

npm run lint
webpack -p --bail

# RESOURCES
cp -r $SOURCE/$DIR_SASS $DIST/$DIR_CSS
cp -r $SOURCE/$DIR_FONTS $DIST/$DIR_FONTS
cp -r $RESOURCES $DIST/$RESOURCES

# SEO
cp $SOURCE/favicon.ico $DIST
cp $SOURCE/sitemap.xml $DIST
cp $SOURCE/robots.txt $DIST

echo "----------------------------------------------";
echo "             Build is successful!";
echo "----------------------------------------------";
