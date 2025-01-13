import crypto from "crypto";

const ALG = "aes_256-cbc"; // key length is 32 bytes 
// openssl rand -hex 32
// https://generate-random.org/encryption-key-generator


export const symmetricEncrypt = (data:string) => {
    const key = process.env.ENCRYPYION_KEY;
    if (!key) throw new Error("Encryption key not found");

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(ALG, Buffer.from(key, "hex"), iv);

    // abcd => d43d
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");

};

export const symmetricDecrypt = (encryted: string) => {
    const key = process.env.ENCRYPYION_KEY;
    if (!key) throw new Error("Encryption key not found");
    
    const textParts = encryted.split(":");
    const iv = Buffer.from(textParts.shift() as string, "hex");
}