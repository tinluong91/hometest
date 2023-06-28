import { buildSubgraphSchema } from '@apollo/federation'
import { commentModule } from '@modules/comment'
import { postModule } from '@modules/post'
import { userModule } from '@modules/user'

const modules = [userModule, postModule, commentModule]

export const schema = buildSubgraphSchema(modules)
