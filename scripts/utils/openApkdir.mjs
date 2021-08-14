import { exec } from 'child_process';

export function openApkDir() {
    exec('explorer ./android/app/build/outputs/apk/release/'.replace(/\//g, '\\'));
}