import { exec } from 'ks-script-utils';
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
