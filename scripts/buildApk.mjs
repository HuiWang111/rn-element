import { exec } from './utils/exec.mjs';
import { openApkDir } from './utils/openApkDir.mjs';
import path from 'path';

async function build() {
    try {
        await exec('gradlew assembleRelease', { cwd: path.join(process.cwd(), 'android') });
        openApkDir();
    } catch (e) {
        console.error(e);
    }
}

build();
