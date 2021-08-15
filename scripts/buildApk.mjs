import { exec } from 'child_process';
import { openApkDir } from './utils/openApkDir.mjs';

process.chdir('android');
const proc = exec('gradlew assembleRelease');

proc.stdout.on('data', (chunk) => {
    console.log(chunk);
});

proc.stdout.on('end', () => {
    process.chdir('..');
    openApkDir();
});

proc.stderr.on('data', (chunk) => {
    console.log(chunk);
});
