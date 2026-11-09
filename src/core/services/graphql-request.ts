import { ClientError, GraphQLClient } from "graphql-request";

import { getSdk, SdkFunctionWrapper } from "@generated/sdk";

const MAX_RATE_LIMIT_RETRIES = 4;

function wait(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function rateLimitDelay(error: ClientError, attempt: number): number {
	const headers = error.response.headers as
		| { get?: (name: string) => string | null }
		| undefined;
	const retryAfter =
		headers && typeof headers.get === "function"
			? Number(headers.get("retry-after"))
			: NaN;

	if (Number.isFinite(retryAfter) && retryAfter > 0) {
		return retryAfter * 1000;
	}

	return 400 * 2 ** attempt + Math.floor(Math.random() * 300);
}

async function runWithRateLimitRetry<T>(
	action: () => Promise<T>,
	attempt = 0
): Promise<T> {
	try {
		return await action();
	} catch (error) {
		const hitRateLimit =
			error instanceof ClientError && error.response.status === 429;
		if (!hitRateLimit || attempt >= MAX_RATE_LIMIT_RETRIES) {
			throw error;
		}

		await wait(rateLimitDelay(error, attempt));
		return runWithRateLimitRetry(action, attempt + 1);
	}
}

const retryOnRateLimit: SdkFunctionWrapper = (action) =>
	runWithRateLimitRetry(() => action());

export const graphqlClient = new GraphQLClient(
	process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
);

export const graphSDK = getSdk(graphqlClient, retryOnRateLimit);
