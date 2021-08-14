export class Version {
    static parse(versionStr) {
        if (typeof versionStr !== 'string') {
            throw new Error('Version.parse only accept string as param');
        }

        return versionStr.split('.').map(Number);
    }

    static stringify(versionArr) {
        if (!Array.isArray(versionArr)) {
            throw new Error('Version.stringify only accept array as param');
        }

        return versionArr.join('.');
    }

    static update(versionArr, options) {
        if (!Array.isArray(versionArr)) {
            throw new Error('Version.update only accept array as param');
        }
        if (typeof options !== 'object') {
            throw new Error('Version.update param options is required');
        }

        const [major, minor, patch] = versionArr;

        if (options.major === true) {
            return [major + 1, 0, 0];
        } else if (options.minor === true) {
            return [major, minor + 1, 0];
        } else if (options.patch === true) {
            return [major, minor, patch + 1];
        }
    }

    static generateNewVersion(versionStr, options) {
        const versionArr = Version.parse(versionStr);
        const newVersionArr = Version.update(versionArr, options);

        return Version.stringify(newVersionArr);
    }
}
