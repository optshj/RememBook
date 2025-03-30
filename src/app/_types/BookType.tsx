import { BookType } from "./AladinAPIType"

export interface LocalBookType {
    isbn13: string
    state: number
    rating: number
    date: string
    categoryId: number
    title: string
    author: string
}

export interface CombinedBookType extends LocalBookType, BookType {}
