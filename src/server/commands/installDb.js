import fs from "fs-extra";
import path from "path";

const here = (uri = "") => path.resolve(__dirname, uri);
const prismaFile = (uri = "") => here(`../../../prisma/${uri}`);

export const installDb = args => {
	const target = (uri = "") => path.resolve(args.path, uri);

	fs.mkdirSync(target());

	[
		"schema.prisma",
		"migrations/",
	].forEach(file => {
		fs.copySync(prismaFile(file), target(file));
	});
};