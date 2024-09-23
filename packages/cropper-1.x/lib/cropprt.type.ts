export type Action = 'crop' | 'move' | 'zoom' | 'e' | 's' | 'w' | 'n' | 'ne' | 'nw' | 'se' | 'sw' | 'all'
export type DragMode = 'crop' | 'move' | 'none'
export type ImageSmoothingQuality = 'low' | 'medium' | 'high'
export type ViewMode = 0 | 1 | 2 | 3

export interface Data {
  x: number
  y: number
  width: number
  height: number
  rotate: number
  scaleX: number
  scaleY: number
}

export interface ContainerData {
  width: number
  height: number
}

export interface ImageData {
  left: number
  top: number
  width: number
  height: number
  rotate: number
  scaleX: number
  scaleY: number
  naturalWidth: number
  naturalHeight: number
  aspectRatio: number
}

export interface CanvasData {
  left: number
  top: number
  width: number
  height: number
  naturalWidth: number
  naturalHeight: number
}

export interface CropBoxData {
  left: number
  top: number
  width: number
  height: number
}

export interface GetCroppedCanvasOptions {
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  rounded?: boolean
  fillColor?: string
  imageSmoothingEnabled?: boolean
  imageSmoothingQuality?: ImageSmoothingQuality
}

export interface SetDataOptions {
  x?: number
  y?: number
  width?: number
  height?: number
  rotate?: number
  scaleX?: number
  scaleY?: number
}

export interface SetCanvasDataOptions {
  left?: number
  top?: number
  width?: number
  height?: number
}

export interface SetCropBoxDataOptions {
  left?: number
  top?: number
  width?: number
  height?: number
}

interface CropperEvent<T extends EventTarget = EventTarget> extends CustomEvent {
  currentTarget: T & { cropper: Cropper }
}

export type ReadyEvent<T extends EventTarget> = CropperEvent<T>

export interface CropEvent<T extends EventTarget = EventTarget> extends CropperEvent<T> {
  detail: Data
}

export interface CropEventData {
  originalEvent: PointerEvent | TouchEvent | MouseEvent
  action: Action
}

export interface CropStartEvent<T extends EventTarget = EventTarget> extends CropperEvent<T> {
  detail: CropEventData
}

export interface CropMoveEvent<T extends EventTarget = EventTarget> extends CropperEvent<T> {
  detail: CropEventData
}

export interface CropEndEvent<T extends EventTarget = EventTarget> extends CropperEvent<T> {
  detail: CropEventData
}

export interface ZoomEventData {
  originalEvent: WheelEvent | PointerEvent | TouchEvent | MouseEvent
  oldRatio: number
  ratio: number
}

export interface ZoomEvent<T extends EventTarget = EventTarget> extends CropperEvent<T> {
  detail: ZoomEventData
}

export interface Options<T extends EventTarget = EventTarget> {
  aspectRatio?: number
  autoCrop?: boolean
  autoCropArea?: number
  background?: boolean
  center?: boolean
  checkCrossOrigin?: boolean
  checkOrientation?: boolean
  cropBoxMovable?: boolean
  cropBoxResizable?: boolean
  data?: SetDataOptions
  dragMode?: DragMode
  guides?: boolean
  highlight?: boolean
  initialAspectRatio?: number
  minCanvasHeight?: number
  minCanvasWidth?: number
  minContainerHeight?: number
  minContainerWidth?: number
  minCropBoxHeight?: number
  minCropBoxWidth?: number
  modal?: boolean
  movable?: boolean
  preview?: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement> | string
  responsive?: boolean
  restore?: boolean
  rotatable?: boolean
  scalable?: boolean
  toggleDragModeOnDblclick?: boolean
  viewMode?: ViewMode
  wheelZoomRatio?: number
  zoomOnTouch?: boolean
  zoomOnWheel?: boolean
  zoomable?: boolean
  ready?: (event: ReadyEvent<T>) => void
  crop?: (event: CropEvent<T>) => void
  cropend?: (event: CropEndEvent<T>) => void
  cropmove?: (event: CropMoveEvent<T>) => void
  cropstart?: (event: CropStartEvent<T>) => void
  zoom?: (event: ZoomEvent<T>) => void
}

export interface Cropper {
  constructor: ((element: HTMLImageElement, options?: Options<HTMLImageElement>) => any) & ((element: HTMLCanvasElement, options?: Options<HTMLCanvasElement>) => any)
  clear: () => void
  crop: () => void
  destroy: () => void
  disable: () => void
  enable: () => void
  getCanvasData: () => CanvasData
  getContainerData: () => ContainerData
  getCropBoxData: () => CropBoxData
  getCroppedCanvas: (options?: GetCroppedCanvasOptions) => HTMLCanvasElement
  getData: (rounded?: boolean) => Data
  getImageData: () => ImageData
  move: (offsetX: number, offsetY?: number) => void
  moveTo: (x: number, y?: number) => void
  replace: (url: string, onlyColorChanged?: boolean) => void
  reset: () => void
  rotate: (degree: number) => void
  rotateTo: (degree: number) => void
  scale: (scaleX: number, scaleY?: number) => void
  scaleX: (scaleX: number) => void
  scaleY: (scaleY: number) => void
  setAspectRatio: (aspectRatio: number) => void
  setCanvasData: (data: SetCanvasDataOptions) => void
  setCropBoxData: (data: SetCropBoxDataOptions) => void
  setData: (data: SetDataOptions) => void
  setDragMode: (dragMode: DragMode) => void
  zoom: (ratio: number) => void
  zoomTo: (ratio: number, pivot?: { x: number, y: number }) => void
}
