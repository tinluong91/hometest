import 'tsconfig-paths/register'; // no need this one when moving moleculer-apollo-server-mixin to a separate package

import { Types } from '@graphql-codegen/plugin-helpers';

const headerContent = `
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/ban-types */
/* tslint:disable */
/* This file was automatically generated and should not be edited. */
`;

const plugins: Types.OutputConfig[] = [
  'typescript',
  'typescript-resolvers',
  {
    add: {
      content: headerContent,
    },
  },
];
const pluginsConfigs: Types.PluginConfig = {
  federation: true,
  useIndexSignature: true,
  defaultMapper: 'Partial<{T}>',
  namingConvention: {
    enumValues: 'keep',
  },
  inputMaybeValue: 'undefined | T',
};

export default {
  generates: {
    'src/shared/graphql/generated.ts': {
      schema: ['src/modules/**/*.schema.ts'],
      plugins,
      config: pluginsConfigs,
    },
  },
};
