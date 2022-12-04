import { PrismaClient } from "@prisma/client";
import fs from "fs-extra";
import JSON5 from "json5";
import { clientConfigSchema } from "../../shared/schema";

export const registerApp = async args => {
	const config = clientConfigSchema.parse(
		JSON5.parse(await fs.readFile(args.configFile))
	);

	const prisma = new PrismaClient();

	try {
		await prisma.app.create({
			data: {
				name: config.appName,
				publicId: config.appPublicId,
				secretKey: config.appSecretKey,
			},
			select: {},
		});
	} finally {
		await prisma.$disconnect();
	}
};