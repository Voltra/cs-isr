import { eventHandler } from "h3";
import { zh } from "h3-zod";
import { z } from "zod";

const paramsSchema = z.object({
	appId: z.string(),
});

export const queueRegeneration = eventHandler(event => {
	const { appId } = zh.useValidatedParams(event, paramsSchema);

	//TODO: Interact w/ database
});