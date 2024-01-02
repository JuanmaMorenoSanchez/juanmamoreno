import { Canvas } from "@models/canvas.models"
import { BELIEVE_CANVAS } from "../canvases/believe.canvas"

export const BELIEVE_ID = 'believe'

export const CANVASES: Array<Canvas> = [
    {
        id: BELIEVE_ID,
        label: "Believe",
        script: BELIEVE_CANVAS
    }
];
