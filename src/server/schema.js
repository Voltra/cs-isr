import { z } from "zod";
import crypto from "crypto";

export const payloadSchema = z.object({
	appPublicId: z.string(),
	routes: z.array(z.string()),
}).strict();

export const rawPayloadSchema = z.object({
	appPublicId: z.string(),
	routesInfo: z.string(),
}).strict();

export const transcodePayload = async (payload, appSecretKey) => {
	const rawPayload = await rawPayloadSchema.parseAsync(payload);

	const decipher = crypto.createDecipheriv("aes-256-gcm", appSecretKey, rawPayload.appPublicId);
	let decrypted = decipher.update(rawPayload.routesInfo, "hex", "utf-8");
	decrypted += decipher.final("utf-8");

	const routes = JSON.parse(decrypted);

	return payloadSchema.parseAsync({
		appPublicId: rawPayload.appPublicId,
		routes,
	});
};