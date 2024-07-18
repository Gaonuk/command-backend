import { db } from "./drizzle";
import { block } from "./block.sql";
import { transaction } from "./transaction.sql";
import { publicClient } from "../helpers/client";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { decodeFunctionData } from "viem";
import { worldAbi, worldContract } from "../constants";
import "../helpers/utils";

export async function sync() {
	const result = await db.select().from(block).execute();

	return {
		statusCode: 200,
		body: JSON.stringify(result),
	};
}

export const latestBlock: APIGatewayProxyHandlerV2 = async () => {
	const { number: blockNumber, timestamp } = await publicClient.getBlock({
		blockNumber: 9113443n,
	});

	for (let k = blockNumber; k < blockNumber + 10n; k++) {
		const transactionsInBlock = await publicClient.getBlockTransactionCount({
			blockNumber: k,
		});

		for (let i = 0; i < transactionsInBlock; i++) {
			const transactionData = await publicClient.getTransaction({
				blockNumber: k,
				index: i,
			});

			if (transactionData.to !== "0xcdde8dc29bcb7a7b30e22318746dfd81f0510b43")
				continue;

			const data = decodeFunctionData({
				abi: worldAbi,
				data: transactionData.input,
			});

			if (
				data.args &&
				data.args.length === 3 &&
				data.functionName === "callFrom"
			) {
				const innerData = decodeFunctionData({
					abi: worldContract,
					data: data.args[2],
				});

				const argsInString = innerData.args.map(
					(
						value:
							| number
							| `0x${string}`
							| bigint
							| { x: number; y: number; parentEntity: `0x${string}` }
							| readonly bigint[]
							| readonly `0x${string}`[]
							| readonly number[],
					) => value.toString(),
				);
				await db
					.insert(transaction)
					.values({
						function_name: innerData.functionName,
						args: argsInString,
						wallet: data.args[0].toLowerCase(),
						timestamp: timestamp.toString(),
					})
					.returning()
					.execute();
			}
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "success",
		}),
	};
};
