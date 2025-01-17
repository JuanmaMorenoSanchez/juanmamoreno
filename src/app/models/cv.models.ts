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
    ONLINE = "cv.countries.online",
    SPAIN = "cv.countries.spain",
    USA = "cv.countries.usa",
    GERMANY = "cv.countries.germany",
    MEXICO = "cv.countries.mexico",
    ITALY = "cv.countries.italy"
}

export  enum DOWNLOADTYPES {
    CV = "cv",
    STATEMENT = "statement",
    IMAGE = "image"
}
