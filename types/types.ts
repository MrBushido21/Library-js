export type UsersType = {
    id: number
    username: string
    password: string
}

export type BooksType = {
    id: number
    title: string
    author: string
    date: string
}

export type UserType = {
    id: number
    username: string
    password: string
    books:BooksType[]
}