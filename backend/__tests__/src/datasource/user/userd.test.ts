import { PrismaClient } from '@prisma/client'
import { CreateUserInput } from '@shared/graphql/generated'
import { toLower } from 'ramda'
import { UserDataSource } from '@modules/user/user.datasource'

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
        user: {
            create: jest.fn(),
            findUnique: jest.fn(),
        },
    })),
}))

describe('UserDataSource', () => {
    let userDataSource: UserDataSource
    let mockPrisma: PrismaClient

    beforeEach(() => {
        mockPrisma = new PrismaClient()
        userDataSource = new UserDataSource(mockPrisma)
    })

    afterEach(async () => {
        await userDataSource.disconnect()
    })

    it('should call userDataSource.create with the correct input and return the created user', async () => {
        const input: CreateUserInput = {
            email: 'test@example.com',
            name: 'John Doe',
        }
        const mockUser = { id: '123', ...input }
        const createSpy = jest
            .spyOn(mockPrisma.user, 'create')
            .mockResolvedValue(mockUser)

        const result = await userDataSource.create(input)

        expect(createSpy).toHaveBeenCalledWith({
            data: {
                email: toLower(input.email),
                name: input.name,
            },
            select: { id: true, email: true, name: true },
        })
        expect(result).toEqual(mockUser)
    })

    it('should call userDataSource.create and throw an error if the email is already taken', async () => {
        const input: CreateUserInput = {
            email: 'test@example.com',
            name: 'John Doe',
        }
        const error = new Error('Email is already taken')

        const createSpy = jest
            .spyOn(mockPrisma.user, 'create')
            .mockRejectedValue(error)

        await expect(userDataSource.create(input)).rejects.toThrow(
            'Email is already taken',
        )
        expect(createSpy).toHaveBeenCalledWith({
            data: {
                email: toLower(input.email),
                name: input.name,
            },
            select: { id: true, email: true, name: true },
        })
    })

    it('should call userDataSource.getUserById with the correct id and return the user', async () => {
        const id = '123'
        const mockUser = { id: id, email: 'test@example.com', name: 'John Doe' }
        const findUniqueSpy = jest
            .spyOn(mockPrisma.user, 'findUnique')
            .mockResolvedValue(mockUser)

        const result = await userDataSource.getUserById(id)

        expect(findUniqueSpy).toHaveBeenCalledWith({
            where: { id: id },
            select: { id: true, email: true, name: true },
        })
        expect(result).toEqual(mockUser)
    })
})
