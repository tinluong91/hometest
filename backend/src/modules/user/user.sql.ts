/* eslint-disable @typescript-eslint/naming-convention */
export const USER_SELECT = {
    id: true,
    name: true,
    email: true,
}

export const USER_EXTENDED_SELECT = {
    ...USER_SELECT,
    postCount: true,
}
