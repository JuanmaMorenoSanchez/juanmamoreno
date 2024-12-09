export interface Timeline {
    title: string, 
    items: TimelineItem[]
}

export interface TimelineItem {
    year: number,
    title: string,
    venue?: string,
    city?: string,
    country: COUNTRIES
}

export  enum COUNTRIES {
    ONLINE = "Online",
    SPAIN = "Spain",
    USA = "USA",
    GERMANY = "Germany",
    MEXICO = "Mexico",
    ITALY = "Italy"
}

export  enum DOWNLOADTYPES {
    CV = "cv",
    STATEMENT = "statement",
    IMAGE = "image"
}
