import { rawPayloadSchema } from "../../shared/schema";
import { PrismaClient } from "@prisma/client";
import { eventHandler } from "h3";
import { zh } from "h3-zod";
import { z } from "zod";
import { transcodePayload } from "../payload";

const paramsSchema = z.object({
	appId: z.string(),
});

export const queueRegeneration = eventHandler(async event => {
	const { appId } = zh.useValidatedParams(event, paramsSchema);

	const prisma = new PrismaClient();

	try {
		const isrApp = await prisma.app.findFirstOrThrow({
			where: {
				publicId: appId,
			},
			// select: ["secretKey"],
		});

		const body = zh.useValidatedBody(event, rawPayloadSchema);
		const payload = await transcodePayload(body, isrApp.secretKey);

		if (payload.appPublicId !== appId) {
			throw new Error("appId mismatch");
		}

		const regenerations = await prisma.regeneration.createMany({
			data: payload.routes,
			skipDuplicates: true,
		});

		return {
			data: regenerations,
		}
	} finally {
		await prisma.$disconnect();
	}
});