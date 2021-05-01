
export const generateId = (length: number): string => {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) id += characters.charAt(Math.floor(Math.random() * characters.length));
    return id;
}

export const validateUsername = (username: string) => {
    const regex = /<|>/g;
    if(typeof(username) === 'string' && username.trim().length > 0 && !username.match(regex)) return true;
    return false;
}

export const validateEmail = (email: string): boolean => {
    const re = /^[\w\.\-]+@[\w\-]+\.?[\w\-]+\.\w{2,}$/;
    return re.test(email)
}

export const exists = (...values: any[]) => {
    for(let i in values) if(values[i] === null || values[i] === undefined) return false;
    return true;
}

export const either = (value1: any, value2: any) => {
    return value1 ? value1 : value2;
}
