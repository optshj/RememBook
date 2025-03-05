import { BookType } from "./AladinAPIType"

export interface LocalBookType {
    isbn13: string
    state: number
    rating: number
    date: string
}
export interface CombinedBookType extends LocalBookType, BookType {}
