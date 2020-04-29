#!/bin/sh
./build.sh 
echo "Removing previous installation..."
plasmapkg2 -t kwinscript -r hide-titles.kwinscript
echo "Installing script..."
plasmapkg2 -t kwinscript -i hide-titles.kwinscript
echo "Deleting remaining files..."
rm -f hide-titles.kwinscript
echo "Done!"