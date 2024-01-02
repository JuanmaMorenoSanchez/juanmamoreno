import { Canvas } from "@models/canvas.models"
import { WELCOME_CANVAS } from "../canvases/welcome.canvas"

export const WELCOME_ID = 'welcome'

export const CANVASES: Array<Canvas> = [
    {
        id: WELCOME_ID,
        script: WELCOME_CANVAS
    }
]