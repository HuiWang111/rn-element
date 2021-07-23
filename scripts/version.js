const { execSync } = require('child_process');
const { version } = require('../package.json');

console.info('> change branch to master...');
execSync('git checkout master');

console.info('> commit version change in package.json...');
const addFileRes = execSync('git add .');
console.info(addFileRes.toString());

const commitFileRes = execSync('git commit -m "update version in package.json"');
console.info(commitFileRes.toString());

const pushFileRes = execSync('git push');
console.info(pushFileRes.toString());

console.info('');
console.info(`> create version tag: ${version}...`);
const createTagRes = execSync(`git tag ${version}`);
console.info(createTagRes.toString());

console.info('');
console.info(`> push version tag: ${version}...`);
const pushTagRes = execSync(`git push origin ${version}`);
console.info(pushTagRes.toString());