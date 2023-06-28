import * as t from 'io-ts';

/**
 * Comment model
 */
export const Post = t.type({
    id: t.string,
    title: t.string,
    content: t.string,
    authorId: t.string,
});
export type Post = t.TypeOf<typeof Post>;
/**
 * Comment model
 */
export const PostExtended = t.intersection([
    Post,
    t.type({
        commentCount: t.number,
    }),
]);
export type PostExtended = t.TypeOf<typeof PostExtended>;
/**
 * Extended user model
 */
export const PostTableData = t.intersection([
    t.type({
        index: t.number,
        commentCount: t.number,
    }),
    Post
]);
export type PostTableData = t.TypeOf<typeof PostTableData>;