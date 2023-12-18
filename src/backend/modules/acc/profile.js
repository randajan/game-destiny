



export const getProfile = async account=>{
    if (!account) { return; }

    return account.table.cols.map(async c=>c.display > 0 ? account(c) : undefined, { byKey:true });
}

export const setProfile = async (account, data)=>{
    if (!account) { return; }

    await account.update(data);

    return true;
}

export const getProfiles = async (account)=>{
    if (!account) { return; }

    return account.rows.getList();
}