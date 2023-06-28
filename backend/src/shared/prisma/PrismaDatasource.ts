/* eslint-disable unicorn/filename-case */
import { PrismaClient } from '@prisma/client'

export abstract class PrismaDataSource {
    protected prisma: PrismaClient

    public constructor(prisma?: PrismaClient) {
        this.prisma = prisma || new PrismaClient()
    }

    public async disconnect() {
        await this.prisma.$disconnect()
    }

    public async connect() {
        // TODO: add logging & tracing
        await this.prisma.$connect()
    }
}
