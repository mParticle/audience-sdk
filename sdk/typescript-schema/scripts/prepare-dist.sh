#!/bin/sh

# Check if dist directory exists
if [ -d "dist" ]; then
    # Remove any pre-existing tgz packages
    rm -f dist/*.tgz

    # Copy LICENSE file to dist directory
    cp -f ../../LICENSE .

    # Overwrite any version file
    VERSION=$(node -p "require('./package.json').version")
    echo "export const VERSION = '$VERSION';" > version.ts

    # Compile version.ts to JavaScript and declaration files
    npx tsc version.ts --outDir dist --declaration --skipLibCheck

    # Create tarball for Github release assets
    npm pack --pack-destination dist
fi
