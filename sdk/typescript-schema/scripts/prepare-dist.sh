#/bin/sh

# Check if dist directory exists
if [ -d "dist" ]; then
    # Copy LICENSE file to dist directory
    cp -f ../../LICENSE .

    # Overwrite any version file
    VERSION=$(node -p "require('./package.json').version")
    echo "export const VERSION = '$VERSION';" > version.ts

    # Compile version.ts to JavaScript and move to dist directory
    npx tsc version.ts --outDir dist --emitDeclarationOnly true --declaration true
fi
