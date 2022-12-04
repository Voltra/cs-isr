export interface CsIsrConfig {
	/**
	 * The secret key used to authentify Webhook requests
	 */
	appSecretKey: string;

	/**
	 * The unique identifier for your app
	 */
	appPublicId: string;

	/**
	 * The URL of the CS-ISR server
	 */
	serverBaseUrl: string;
}