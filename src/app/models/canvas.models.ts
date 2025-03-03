export interface Canvas {
    id: string,
    label: string,
    script: Function
}

export interface CanvasesStates {
    weather?: GennericCanvasData,
    stock?: GennericCanvasData
}

export interface GennericCanvasData {
    data: any,
    fetchTime: Date,
}