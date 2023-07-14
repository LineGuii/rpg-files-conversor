#!/usr/bin/env node

const ffmpeg = require("fluent-ffmpeg");
const path = require('path');
const fs = require('fs');
const {allAudioFiles, allImagesFiles} = require("./utils")
const argv = require('minimist')(process.argv.slice(2));
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);
const webp=require('webp-converter');
webp.grant_permission();


function convertAllFromDir(dir) {
    const directoryPath = path.join(dir)
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log("Unable to scan directory:", err);
        }

        console.log("\n----ALL FILES preparation START---")
        console.log('files', files)

        convertFileToOGG(dir, allAudioFiles(files))
        convertFileToWEBP(dir, allImagesFiles(files))

        console.log("\n----ALL FILES preparation END---")
    })
}

function convertFileToOGG(dir, files) {
    console.log("\n----OGG preparation START---")
    files.forEach((f, i) => {
        const fileName = f
        const filePath = path.join(dir, fileName)
        const outputName = path.join(dir, fileName.split('.')[0] + '.ogg')

        console.log(`[${i}] - ${fileName} => ${outputName}`)
        ffmpeg(filePath)
            .on('error', function(err) {
            console.log('An error occurred: ' + err.message);
            })
            .on('end', function() {
            console.log('Processing finished !');
            })
            .outputOptions('-c:a libvorbis')
            .save(outputName);
    });
    console.log("----OGG preparation END---")
}

function convertFileToWEBP(dir, files) {
    console.log("\n----WEBP preparation START---")

    files.forEach((f, i) => {
        const fileName = f
        const filePath = path.join(dir, fileName)
        const outputName = path.join(dir, fileName.split('.')[0] + '.webp')

        console.log(`[${i}] - ${fileName} => ${outputName}`)
        const result = webp.cwebp(filePath,outputName,"-q 80");
        result.then(() => {
            console.log('Processing finished !');
        })
    })
    console.log("\n----WEBP preparation END---")

}

if (argv.f == null) {
    console.log("No argument found, please provide -f argument")
} else {
    const folder = argv.f
    if (folder.includes(':/') || folder.includes(':\\') || folder.startsWith('./') || folder.startsWith('.\\') || folder.startsWith('../') || folder.startsWith('.\\')) {
        convertAllFromDir(path.join(folder));
    } else {
        convertAllFromDir(path.join(__dirname, folder));
    }
}
