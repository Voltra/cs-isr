import JSON5 from "json5";
import { decipher } from "../shared/cipher";
import { payloadSchema, rawPayloadSchema, CsIsrPayload } from "../shared/schema";

export const transcodePayload = async (payload: object, appSecretKey: string): Promise<CsIsrPayload> => {
	const rawPayload = await rawPayloadSchema.parseAsync(payload);

	const decrypted = decipher(rawPayload.routesInfo, appSecretKey, rawPayload.appPublicId);

	const routes = JSON5.parse(decrypted);

	return payloadSchema.parseAsync({
		appPublicId: rawPayload.appPublicId,
		routes,
	});
};