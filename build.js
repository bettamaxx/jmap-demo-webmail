#!/usr/bin/env node

import esbuild from 'esbuild';
import * as path from "path";
import * as fs from "fs/promises";
Promise.all([
    esbuild.build({
        entryPoints: ['app/JMAPDemo.js'],
        bundle: true,
        target: 'es6',
        format: 'iife',
        outfile: 'dist/JMAPDemo.js',
    }),
    esbuild.build({
        entryPoints: ['app/JMAPDemo.js'],
        bundle: true,
        minify: true,
        sourcemap: 'linked',
        target: 'es6',
        format: 'iife',
        outfile: 'dist/JMAPDemo.min.js',
    }),
    CopyFile("node_modules/dompurify/dist/purify.js","dist/libs/DOMPurify.js"),
    CopyFile("node_modules/fastmail-overture/dist/O.js","dist/libs/Overture.js"),
    CopyFile("node_modules/fastmail-overture/source/Legacy.js","dist/libs/Legacy.js"),
    CopyFile("node_modules/jmap-js/build/JMAP.js","dist/libs/JMAP.js"),
    CopyFile("app/","dist/app"),
    CopyFile("styles/","dist/styles"),
    CopyFile("index.html","dist/index.html"),
    CopyFile("libs/timezones-raw.js","dist/libs/timezones-raw.js")
]);

async function CopyFile(source, dest) {
    console.log("Copying File")
    const source_final = path.resolve(source);
    const dest_final = path.resolve(dest);
    console.log("inside if")
    // Ensure parent directory exists.
    //await fs.mkdir(`${dest_final}/..`);

    console.log(`Copying from "${source_final}" to "${dest_final}".`);
    await fs.cp(source_final, dest_final, {recursive: true});
}