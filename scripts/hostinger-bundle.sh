#!/bin/sh
# Builds the exact folder to drop into Hostinger's public_html.
# ponytail: Hostinger serves these files flat, so the only transforms are the
# index rename and the links that follow from it. public/asset/ is already on
# the server and unchanged, so it stays out of the bundle.
set -e
cd "$(dirname "$0")/.."
rm -rf dist-hostinger webbify-hostinger.zip
mkdir dist-hostinger
cp founder.html insights.html insights-product-designer-age-of-ai.html dist-hostinger/
cp webbify-index.html dist-hostinger/index.html
perl -pi -e 's/webbify-index\.html/index.html/g' dist-hostinger/*.html
cd dist-hostinger && zip -qr ../webbify-hostinger.zip . && cd ..
echo "dist-hostinger/ and webbify-hostinger.zip ready:"
ls -1 dist-hostinger
