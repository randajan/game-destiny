


export const generateId = (letters=6, numbers=2) =>{
    const pw = Math.pow(10, Math.max(0, numbers-1));
    return String.jet.rnd(letters, letters) + Math.round(Number.jet.rnd(pw, pw*10));
}