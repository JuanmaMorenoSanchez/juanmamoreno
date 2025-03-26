import { COUNTRIES } from "./cv.constants"

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
