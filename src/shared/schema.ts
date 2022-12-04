import { z } from "zod";

export const clientConfigSchema = z.object({
	appName: z.string({
		description: "Human-readable name given to your application",
	}),
	appSecretKey: z.string({
		description: "The secret key used to authentify Webhook requests",
	}),
	appPublicId: z.string({
		description: "The unique identifier for your app",
	}),
	serverBaseUrl: z.string({
		description: "The URL of the CS-ISR server",
	}),
}).strict();

export type CsIsrConfig = z.infer<typeof clientConfigSchema>;

export const payloadSchema = z.object({
	appPublicId: z.string({
		description: "The unique identifier of the desired app",
	}),
	routes: z.array(z.string({
		description: "The URI of the route to regenerate (e.g. '/blog/article/my-slug')",
	}), {
		description: "The URIs of the route to regenerate",
	}),
}).strict();

export const rawPayloadSchema = z.object({
	appPublicId: z.string({
		description: "The unique identifier of the desired app",
	}),
	routesInfo: z.string({
		description: "Array of the URIs of the route to regenerate, encoded in JSON and encrypted using",
	}),
}).strict();

export type CsIsrPayload = z.infer<typeof payloadSchema>;
export type CsIsrRawPayload = z.infer<typeof rawPayloadSchema>;