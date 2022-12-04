import "./env"

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers"
import { serve } from "./commands/server";
import { installDb } from "./commands/installDb";

yargs(hideBin(process.argv))
	.command("serve", "Start the server", cmd => {
		return cmd.option("port", {
			alias: "p",
			describe: "port to listen on",
			default: parseInt(process.env.CS_ISR_PORT, 10) ?? 4000,
		}).option("database", {
			alias: "db",
			describe: "path to the sqlite3 database file",
			default: process.env.DATABASE_URL,
		});
	}, serve)
	.command("db:install [path]", "Install database files at the given location", cmd => {
		return cmd.option("path", {
			describe: "Path to the folder to which the Prisma files will be copied into",
		});
	}, installDb)
	.strictCommands()
	.demandCommand(1)
	.help()
	.parse();