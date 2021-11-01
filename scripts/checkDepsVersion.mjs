import pkg from '../package.json';
import { exec } from './utils/exec.mjs';
import ora from 'ora';

const deps = Object.keys(pkg.dependencies);
const devDeps = Object.keys(pkg.devDependencies);

async function main() {
    try {
        const needToUpdate = new Set();
        const spinner = ora('').start();

        for (const depName of deps) {
            spinner.text = `fetching ${depName} latest version...`;
            const version = await exec(`npm view ${depName} version`, { showProcess: false });
            const latest = version && version.replace('\n', '');
            const currentVersion = pkg.dependencies[depName].replace('^', '');
            if (latest !== currentVersion) {
                needToUpdate.add({ name: depName, current: currentVersion, latest });
            }
        }

        for (const depName of devDeps) {
            spinner.text = `fetching ${depName} latest version...`;
            const version = await exec(`npm view ${depName} version`, { showProcess: false });
            const latest = version && version.replace('\n', '');
            const currentVersion = pkg.devDependencies[depName].replace('^', '');
            if (latest !== currentVersion) {
                needToUpdate.add({ name: depName, current: currentVersion, latest });
            }
        }

        spinner.stop();

        console.info('following dependencies need to update');
        needToUpdate.forEach(item => {
            console.info(`${item.name} ${item.current} ${item.latest}`);
        });
    } catch(e) {
        throw e;
    }
}

main();
