"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fluent_ffmpeg_1 = require("fluent-ffmpeg");
var path_1 = require("path");
var fs_1 = require("fs");
var utils_1 = require("./utils");
var argv = require('minimist')(process.argv.slice(2));
var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
fluent_ffmpeg_1.default.setFfmpegPath(ffmpegPath);
var webp = require('webp-converter');
webp.grant_permission();
function convertAllFromDir(dir) {
    var directoryPath = path_1.default.join(dir);
    fs_1.default.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log("Unable to scan directory:", err);
        }
        console.log("\n----ALL FILES preparation START---");
        console.log('files', files);
        convertFileToOGG(dir, (0, utils_1.allAudioFiles)(files));
        convertFileToWEBP(dir, (0, utils_1.allImagesFiles)(files));
        console.log("\n----ALL FILES preparation END---");
    });
}
function convertFileToOGG(dir, files) {
    console.log("\n----OGG preparation START---");
    files.forEach(function (f, i) {
        var fileName = f;
        var filePath = path_1.default.join(dir, fileName);
        var outputName = path_1.default.join(dir, fileName.split('.')[0] + '.ogg');
        console.log("[".concat(i, "] - ").concat(fileName, " => ").concat(outputName));
        (0, fluent_ffmpeg_1.default)(filePath)
            .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
        })
            .on('end', function () {
            console.log('Processing finished !');
        })
            .outputOptions('-c:a libvorbis')
            .save(outputName);
    });
    console.log("----OGG preparation END---");
}
function convertFileToWEBP(dir, files) {
    console.log("\n----WEBP preparation START---");
    files.forEach(function (f, i) {
        var fileName = f;
        var filePath = path_1.default.join(dir, fileName);
        var outputName = path_1.default.join(dir, fileName.split('.')[0] + '.webp');
        console.log("[".concat(i, "] - ").concat(fileName, " => ").concat(outputName));
        var result = webp.cwebp(filePath, outputName, "-q 80");
        result.then(function () {
            console.log('Processing finished !');
        });
    });
    console.log("\n----WEBP preparation END---");
}
if (argv.f == null) {
    console.log("No argument found, please provide -f argument");
}
else {
    var folder = argv.f;
    if (folder.includes(':/') || folder.includes(':\\') || folder.startsWith('./') || folder.startsWith('.\\') || folder.startsWith('../') || folder.startsWith('.\\')) {
        convertAllFromDir(path_1.default.join(folder));
    }
    else {
        convertAllFromDir(path_1.default.join(__dirname, folder));
    }
}
