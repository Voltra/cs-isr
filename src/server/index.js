import "./env"

import path from "path";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers"
import { serve } from "./commands/server";
import { installDb } from "./commands/installDb";
import { registerApp } from "./commands/registerApp";

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
	.command("app:register [configFile]", "Register an application", cmd => {
		return cmd.option("configFile", {
			alias: "c",
			describe: "Path to the config file (isr.config.js) describing the app to register",
			default: path.resolve(process.cwd(), "isr.config.js"),
		})
		.option("database", {
			alias: "db",
			describe: "path to the sqlite3 database file",
			default: process.env.DATABASE_URL,
		});
	}, registerApp)
	.command("db:install [path]", "Install database files at the given location", cmd => {
		return cmd.option("path", {
			describe: "Path to the folder to which the Prisma files will be copied into",
		});
	}, installDb)
	.strictCommands()
	.demandCommand(1)
	.help()
	.parse();