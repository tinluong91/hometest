import * as t from 'io-ts';

/**
 * User model
 */
export const User = t.type({
    id: t.string,
    name: t.string,
    email: t.string,
});
export type User = t.TypeOf<typeof User>;

export const UserExtended = t.intersection([
    User,
    t.type({
        postCount: t.number,
    }),
]);
export type UserExtended = t.TypeOf<typeof UserExtended>;
/**
 * Extended user model
 */
export const UserTableData = t.intersection([
    t.type({
        index: t.number,
        postCount: t.number,
    }),
    User
]);
export type UserTableData = t.TypeOf<typeof UserTableData>;