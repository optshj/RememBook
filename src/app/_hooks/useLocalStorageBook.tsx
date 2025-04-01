import { BookType } from "../_types/AladinAPIType"

/**
 * @param book : BookType
 */
export function addItem(book: BookType) {
    const item = localStorage.getItem(book.isbn13)
    const title = book.title.split("-")[0]
    if (!item)
        localStorage.setItem(
            book.isbn13,
            JSON.stringify({ rating: 0, date: "", state: 0, text: "", categoryId: book.categoryId, title: title, author: book.author })
        )
}
/**
 * @param isbn13 : string
 */
export function deleteItem(isbn13: string) {
    const item = localStorage.getItem(isbn13)
    if (item) localStorage.removeItem(isbn13)
}
