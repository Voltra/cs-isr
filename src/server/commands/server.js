import { createServer } from "http";
import { createApp, createRouter, sendError, toNodeListener } from "h3"
import { queueRegeneration } from "../endpoints/queueRegeneration";

//TODO: Make it a CLI app too

export const serve = args => {
	const app = createApp({
		onError(error, event) {
			sendError(event, error);
		},
	});

	const router = createRouter();

	router.post("/isr/:appId", queueRegeneration);

	app.use(router);

	const server = createServer(toNodeListener(app)).listen(args.port);

	process.once("SIGTERM", () => server.close());
};