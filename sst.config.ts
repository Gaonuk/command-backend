/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'command-backend',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
		};
	},
	async run() {
		const vpc = new sst.aws.Vpc('MainVpc');
		const rds = new sst.aws.Postgres('CommandDatabase', { vpc });

		const api = new sst.aws.ApiGatewayV2('MyApi');
		api.route('GET /latest-block', {
			link: [rds],
			handler: 'src/api.latestBlock',
			timeout: '60 seconds',
		});
		api.route('GET /sync', {
			link: [rds],
			handler: 'src/api.sync',
			timeout: '60 seconds',
		});

		return {
			api: api.url,
		};
	},
});
