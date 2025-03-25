export function addItem(isbn13: string) {
    const item = localStorage.getItem(isbn13)
    if (!item) localStorage.setItem(isbn13, JSON.stringify({ rating: 0, date: "", state: 0, text: "" }))
}
export function deleteItem(isbn13: string) {
    const item = localStorage.getItem(isbn13)
    if (item) localStorage.removeItem(isbn13)
}
