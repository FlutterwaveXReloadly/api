import bcrypt from 'bcrypt';

export const hash = async (raw) => {
    const hashed = await bcrypt.hash(raw, 10);
    return hashed;
}

export const compare = async (raw, hashed) => {
    const status = await bcrypt.compare(raw, hashed);
    return status;
}