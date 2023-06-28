import { resolvers } from '@modules/user/user.resolvers'
import { ResolversTypes } from '@shared/graphql/generated'

// Mock the user data source
const userDataSourceMock = {
    getUsers: jest.fn(),
    getUserById: jest.fn(),
    getUsersWithPostCount: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
}

// Mock the context object
const contextMock = {
    dataSources: {
        user: userDataSourceMock,
    },
    token: 'mockedUserId',
}

describe('User resolvers', () => {
    describe('Query', () => {
        describe('users', () => {
            it('should return an empty array of users', async () => {
                // Mock the data source method
                userDataSourceMock.getUsers.mockResolvedValue([])

                // Invoke the resolver function
                const result: Promise<Array<ResolversTypes['User']>> =
                    await resolvers.Query.users(null, null, contextMock)

                // Assertion
                expect(result).toEqual([])
                expect(userDataSourceMock.getUsers).toHaveBeenCalled()
            })
        })

        describe('getUser', () => {
            it('should return a user by id', async () => {
                // Mock the data source method
                const user = { id: 'mockedUserId', name: 'John Doe' }
                userDataSourceMock.getUserById.mockResolvedValue(user)

                // Invoke the resolver function
                const result = await resolvers.Query.getUser(
                    null,
                    { id: 'mockedUserId' },
                    contextMock,
                )

                // Assertion
                expect(result).toEqual(user)
                expect(userDataSourceMock.getUserById).toHaveBeenCalledWith(
                    'mockedUserId',
                )
            })
        })
    })

    describe('Mutation', () => {
        describe('createUser', () => {
            it('should create a new user', async () => {
                // Mock the data source method
                const createdUser = { id: '1', name: 'New User' }
                userDataSourceMock.create.mockResolvedValue(createdUser)

                // Invoke the resolver function
                const result = await resolvers.Mutation.createUser(
                    null,
                    { input: { name: 'New User' } },
                    contextMock,
                )

                // Assertion
                expect(result).toEqual(createdUser)
                expect(userDataSourceMock.create).toHaveBeenCalledWith({
                    name: 'New User',
                })
            })
        })

        describe('updateUser', () => {
            it('should update an existing user', async () => {
                // Mock the data source method
                const updatedUser = { id: '1', name: 'Updated User' }
                userDataSourceMock.update.mockResolvedValue(updatedUser)

                // Invoke the resolver function
                const result = await resolvers.Mutation.updateUser(
                    null,
                    { id: '1', input: { name: 'Updated User' } },
                    contextMock,
                )

                // Assertion
                expect(result).toEqual(updatedUser)
                expect(userDataSourceMock.update).toHaveBeenCalledWith('1', {
                    name: 'Updated User',
                })
            })
        })

        describe('deleteUser', () => {
            it('should delete an existing user', async () => {
                // Mock the data source method
                const deletedUser = { id: '1', name: 'Deleted User' }
                userDataSourceMock.delete.mockResolvedValue(deletedUser)

                // Invoke the resolver function
                const result = await resolvers.Mutation.deleteUser(
                    null,
                    { id: '1' },
                    contextMock,
                )

                // Assertion
                expect(result).toEqual(deletedUser)
                expect(userDataSourceMock.delete).toHaveBeenCalledWith('1')
            })
        })
    })
})
