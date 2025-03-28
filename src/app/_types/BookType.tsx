import { BookType } from "./AladinAPIType"

export interface LocalBookType {
    isbn13: string
    state: number
    rating: number
    date: string
    searchCategoryId?: number
}

export interface CombinedBookType extends LocalBookType, BookType {}
