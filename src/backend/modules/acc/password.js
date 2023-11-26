import jet from "@randajan/jet-core";


const _passwordRequirments = {
    // short:/.{8,}/,
    // symbols:/[^a-zA-Z0-9]/,
    // numbers:/[0-9]/,
    // lowerCase:/[a-z]/,
    // upperCase:/[A-Z]/
}

export const validatePassword = (password)=>{
    const p = String.jet.to(password);
    return jet.forEach(_passwordRequirments, (rg, k)=>{ if (!rg.test(p)) { return k; } });
}