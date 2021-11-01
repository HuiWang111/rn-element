import { exec as nodeExec } from 'child_process';

export function exec(cmd, options) {
    return new Promise((resolve, reject) => {
        try {
            const showProcess = options.showProcess == null ? true : options.showProcess;
            delete options.showProcess;
            const proc = nodeExec(cmd, options);
            let data = '';

            proc.stdout.on('data', (chunk) => {
                if (showProcess) {
                    console.info('data');
                } else {
                    data += chunk;
                }
            });

            proc.stderr.on('data', (chunk) => {
                console.error(chunk);
            });

            proc.stdout.on('close', () => {
                showProcess ? resolve() : resolve(data);
            });
        } catch(e) {
            reject(e);
        }
    });
}
