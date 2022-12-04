import { createApp, createRouter, toNodeListener } from "h3"
import { queueRegeneration } from "../endpoints/queueRegeneration";

//TODO: Make it a CLI app too

export const serve = args => {
	const app = createApp();

	const router = createRouter();

	router.post("/isr/:appId", queueRegeneration);

	app.use(router);

	createServer(toNodeListener(app)).listen(args.port);
};