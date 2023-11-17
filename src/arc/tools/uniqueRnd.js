




export const uniqueRnd = (factory, overflow=10)=>{
    const used = new Set();
    return _=>{
        let r, s = used.size;
        for (let i=0; i<overflow; i++) {
            used.add(r = factory());
            if (used.size > s) { return r; }
        }
        throw Error("Unable to create unique random key");
    }
}