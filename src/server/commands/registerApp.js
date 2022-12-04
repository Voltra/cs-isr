import { PrismaClient } from "@prisma/client";
import fs from "fs-extra";
import JSON5 from "json5";

export const registerApp = async args => {
	//TODO: Insert into DB

	//TODO: Validate and parse using zod schema

	/**
	 * @type {import("../../client/index").CsIsrConfig}
	 */
	const config = JSON5.parse(await fs.readFile(args.configFile));

	const prisma = new PrismaClient();

	try {
		await prisma.app.create({
			data: {
				name: config.appName,
				publicId: config.appPublicId,
				secretKey: config.appSecretKey,
			},
		});
	} finally {
		await prisma.$disconnect();
	}
};