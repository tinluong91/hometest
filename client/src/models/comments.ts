import * as t from 'io-ts';


/**
 * Comment model
 */
export const Comment = t.type({
    id: t.string,
    content: t.string,
    postId: t.string,
});
export type Comment = t.TypeOf<typeof Comment>;

/**
 * Extended user model
 */
export const CommentTableData = t.intersection([
    t.type({
        index: t.number,
    }),
    Comment
]);
export type CommentTableData = t.TypeOf<typeof CommentTableData>;