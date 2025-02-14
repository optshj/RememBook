export interface BookType {
    itemId: string
    title: string
    link: string
    author: string
    pubDate: string
    description: string
    creator: string
    isbn: string
    isbn13: string
    priceSales: number
    priceStandard: number
    stockStatus: string
    mileage: number
    cover: string
    categoryId: number
    categoryName: string
    publisher: string
    customerReviewRank: number
    bookinfo: BookInfo
}

export interface BookInfo {
    subTitle: string
    originalTitle: string
    itemPage: number
    toc: string
    letslookimg: string[]
    authors: Author[]
    ebookList: string[]
}

export interface Author {
    authorType: string
    authorid: string
    desc: string
}
