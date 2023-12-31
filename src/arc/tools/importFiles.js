

export const importFiles = (files, prefix="./", suffix=".js")=>{
    const r = {};

    files?.filenames?.forEach((pathname, i)=>{
        if (!pathname.startsWith(prefix) || !pathname.endsWith(suffix)) { return; }
        const name = pathname.substring(prefix.length).slice(0, -suffix.length);
        const exports = files.default[i];
        r[name] = exports[name] || exports.default;
    });

    return r;
}