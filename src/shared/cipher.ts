import crypto from "crypto";

export const CIPHER_ALGO = "aes-256-gcm";
export const CIPHER_ENCODING = "hex";
export const NATURAL_ENCODING = "utf-8";

export const decipher = (encrypted: string, key: string, iv: string) => {
	const decipher = crypto.createDecipheriv(CIPHER_ALGO, key, iv);
	let decrypted = decipher.update(encrypted, CIPHER_ENCODING, NATURAL_ENCODING);
	decrypted += decipher.final(NATURAL_ENCODING);

	return decrypted;
};