npm run webpack

SOURCE=src
DIST=dist
DIR_CSS=css
DIR_FONTS=fonts

cp -R $SOURCE/$DIR_CSS $DIST/$DIR_CSS
cp -R $SOURCE/$DIR_FONTS $DIST/$DIR_FONTS

echo "Build successful!";