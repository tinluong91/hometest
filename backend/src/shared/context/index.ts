import { BaseContext } from '@apollo/server'
import { CommentDataSource } from '@modules/comment/comment.datasource'
import { PostDataSource } from '@modules/post/post.datasource'
import { UserDataSource } from '@modules/user/user.datasource'
import { PrismaClient } from '@prisma/client'
import { getPrismaClient } from '@shared/prisma/client'
export interface CreateDataSourcesOptions {
    prisma: PrismaClient
}
export interface CreateContextOptions {
    token?: string
}

function createDataSources(options?: CreateDataSourcesOptions) {
    return {
        user: new UserDataSource(options?.prisma),
        post: new PostDataSource(options?.prisma),
        comment: new CommentDataSource(options?.prisma),
    }
}

export async function createContext(options: CreateContextOptions = {}) {
    const prisma = getPrismaClient()
    await prisma.$connect()
    return {
        dataSources: createDataSources(),
        token: options.token,
    }
}

export type Context = BaseContext & Awaited<ReturnType<typeof createContext>>
