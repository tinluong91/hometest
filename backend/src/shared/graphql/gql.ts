import gqlTag from 'graphql-tag'

import type { DocumentNode } from 'graphql'

export const gql: (
    template: TemplateStringsArray | string,
    ...substitutions: any[]
) => DocumentNode = gqlTag
