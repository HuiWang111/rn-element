import fs from 'fs';
import path from 'path';

const docs = fs.readdirSync(path.join(process.cwd(), 'docs'));
const baseURL = 'https://github.com/HuiWang111/rn-element/blob/main/docs/';
let READMEContent = initializeREADME();

docs.forEach(doc => {
    const fileName = doc.split('.')[0];

    READMEContent += `- [${fileName}](${baseURL}${doc})
`;
});

fs.writeFileSync(
    path.join(process.cwd(), 'README.md'),
    READMEContent
)

function initializeREADME(content = '# rn-element\n') {
    content += '\n';
    content += '## install\n';
    content += '```shell\n';
    content += 'npm i rn-element\n';
    content += '```\n';

    content += '\n';
    content += '## generate version\n';
    content += '```shell\n';
    content += 'npm run version -- --patch # bugfix\n';
    content += 'npm run version -- --minor # new feature\n';
    content += 'npm run version -- --major # break api\n';
    content += '```\n';

    content += '\n';
    content += '## usage docs\n';

    return content;
}

