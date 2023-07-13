export function allImagesFiles(files: string[]): string[] {
    return files.filter((f) => (
        f.endsWith('.png') ||
        f.endsWith('.jpg') ||
        f.endsWith('.jpeg') ||
        f.endsWith('.bmp') ||
        f.endsWith('.gif')
    ))
}

export function allAudioFiles(files: string[]): string[] {
    return files.filter((f) => (
        f.endsWith('.mp3') ||
        f.endsWith('.acc') ||
        f.endsWith('.wav') ||
        f.endsWith('.wma') ||
        f.endsWith('.raw')
    ))
}