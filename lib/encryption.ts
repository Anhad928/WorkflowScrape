import crypto from "crypto";

const ALG = "aes_256-cbc"; // key length is 32 bytes 
// openssl rand -hex 32
// https://generate-random.org/encryption-key-generator


export const symmetricEncrypt = (data:string) => {
    const key = process.env.ENCRYPYION_KEY;
    if (!key) throw new Error("Encryption key not found");

    const iv = crypto.randomBytes(16);

    
}