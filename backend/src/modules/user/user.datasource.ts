import { Prisma } from '@prisma/client'
import { CreateUserInput, UpdateUserInput } from '@shared/graphql/generated'
import { PrismaDataSource } from '@shared/prisma/PrismaDatasource'
import { toLower } from 'ramda'

import { USER_SELECT } from './user.sql'

export class UserDataSource extends PrismaDataSource {
    private db = this.prisma.user

    /**
     * Create a new user
     * @param data
     * @returns
     */
    public async create(data: CreateUserInput) {
        const { email, name } = data

        try {
            return await this.db.create({
                data: {
                    email: toLower(email),
                    name: name,
                },
                select: USER_SELECT,
            })
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new Error('Email is already taken')
            }
            throw error
        }
    }
    // update user
    public async update(id: string, data: UpdateUserInput) {
        const { name } = data
        try {
            return await this.db.update({
                where: { id: id },
                data: { name: name },
                select: USER_SELECT,
            })
        } catch (error: any) {
            console.log(error)
            throw new Error('User not found')
        }
    }

    /**
     * Get user by id
     * @param id
     * @returns
     */
    public async getUserById(id: string) {
        return this.db.findUnique({ where: { id: id }, select: USER_SELECT })
    }
    /**
     * Get all users
     * @returns Users
     */
    public async getUsers() {
        return this.db.findMany({ select: USER_SELECT })
    }
    /**
     * Get users with pagination
     * @param page
     * @param limit
     * @returns
     */
    public async getUsersWithPagination(page: number, limit: number) {
        return this.db.findMany({
            select: USER_SELECT,
            skip: (page - 1) * limit,
            take: limit,
        })
    }
    /**
     * Count users
     * @returns
     */
    public async count() {
        return this.db.count()
    }

    /**
     * Get all users with count of posts for each user
     * @returns Users with post count
     */
    public async getUsersWithPostCount(skip: number, take: number) {
        const totalUsers = await this.db.count()
        const users = await this.db.findMany({
            select: USER_SELECT,
            orderBy: { name: 'asc' },
            skip: skip,
            take: take,
        })
        const usersWithPostCount = await Promise.all(
            users.map(async (user) => {
                const postCount = await this.countUserPosts(user.id)
                return { ...user, postCount: postCount }
            }),
        )
        return {
            users: usersWithPostCount,
            pageInfo: {
                hasNextPage: skip + take < totalUsers,
                total: totalUsers,
            },
        }
    }
    /**
     * Delete user by id
     * @param id
     * @returns
     */
    public async delete(id: string) {
        try {
            return await this.db.delete({ where: { id: id } })
        } catch (error: any) {
            console.log(error)
            throw new Error('User not found')
        }
    }

    /**
     * Count the number of posts for a user
     * @param userId
     * @returns Post count
     */
    private async countUserPosts(userId: string) {
        return this.prisma.post.count({
            where: { authorId: userId },
        })
    }
}
