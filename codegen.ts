import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "https://ap-southeast-2.aws.realm.mongodb.com/api/client/v2.0/app/my-store-znppl/graphql",
	documents: ["src/**/*.tsx"],
	generates: {
		"./src/__generated__/": {
			preset: "client",
			plugins: [],
			presetConfig: {
				gqlTagName: "gql",
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
