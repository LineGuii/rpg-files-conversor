"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allAudioFiles = exports.allImagesFiles = void 0;
function allImagesFiles(files) {
    return files.filter(function (f) { return (f.endsWith('.png') ||
        f.endsWith('.jpg') ||
        f.endsWith('.jpeg') ||
        f.endsWith('.bmp') ||
        f.endsWith('.gif')); });
}
exports.allImagesFiles = allImagesFiles;
function allAudioFiles(files) {
    return files.filter(function (f) { return (f.endsWith('.mp3') ||
        f.endsWith('.acc') ||
        f.endsWith('.wav') ||
        f.endsWith('.wma') ||
        f.endsWith('.raw')); });
}
exports.allAudioFiles = allAudioFiles;
