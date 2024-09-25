<script setup lang="ts">
import type { Cropper, CropperInstance } from './cropper.type'
import CropperJs from 'cropperjs'
import { type CSSProperties, type ImgHTMLAttributes, onMounted, ref } from 'vue'
import 'cropperjs/dist/cropper.css'

interface ImageCutEditorProps {
  containerStyle: CSSProperties
  src: string
  alt: string
  imgStyle: CSSProperties
  crossorigin: ImgHTMLAttributes['crossorigin']
  aspectRatio?: number
}

const { containerStyle, src = '', alt = 'image', imgStyle, aspectRatio } = defineProps<ImageCutEditorProps>()

const emit = defineEmits<{
  (e: 'result', value: string): void
  (e: 'ready'): void
  (e: 'start'): void
  (e: 'move'): void
  (e: 'end'): void
  (e: 'crop'): void
  (e: 'zoom'): void
}>()

const imageRef = ref<HTMLImageElement>()
const cropper = ref<CropperJs>()

onMounted(() => {
  if (imageRef.value) {
    cropper.value = new CropperJs(imageRef.value, {
      aspectRatio,
      ready: () => {
        emit('ready')
      },
      cropstart: () => emit('start'),
      cropmove: () => emit('move'),
      cropend: () => emit('end'),
      crop: () => emit('crop'),
      zoom: () => emit('zoom'),
    })
  }
})

// Reset the image and crop box to their initial states
function reset() {
  return cropper.value?.reset()
}

// Clear the crop box
function clear() {
  return cropper.value?.clear()
}

// Init crop box manually
function initCrop() {
  return cropper.value?.crop()
}

/**
 * Replace the image's src and rebuild the cropper
 * @param {string} url - The new URL.
 * @param {boolean} [onlyColorChanged] - Indicate if the new image only changed color.
 * @returns {object} this
 */
function replace(url: string, onlyColorChanged = false) {
  return cropper.value?.replace(url, onlyColorChanged)
}

// Enable (unfreeze) the cropper
function enable() {
  return cropper.value?.enable()
}

// Disable (freeze) the cropper
function disable() {
  return cropper.value?.disable()
}

// Destroy the cropper and remove the instance from the image
function destroy() {
  return cropper.value?.destroy()
}

/**
 * Move the canvas with relative offsets
 * @param {number} offsetX - The relative offset distance on the x-axis.
 * @param {number} offsetY - The relative offset distance on the y-axis.
 * @returns {object} this
 */
function move(offsetX: number, offsetY?: number) {
  return cropper.value!.move(offsetX, offsetY)
}

/**
 * Move the canvas to an absolute point
 * @param {number} x - The x-axis coordinate.
 * @param {number} [y] - The y-axis coordinate.
 * @returns {object} this
 */
function moveTo(x: number, y = x) {
  return cropper.value?.moveTo(x, y)
}

/**
 * Zoom the canvas with a relative ratio
 * @param {number} ratio - The target ratio.
 * @returns {object} this
 */
function zoom(ratio: number) {
  return cropper.value?.zoom(ratio)
}

/**
 * Zoom the canvas to an absolute ratio
 * @param {number} ratio - The target ratio.
 * @param {Event} _originalEvent - The original event if any.
 * @returns {object} this
 */
function zoomTo(
  ratio: number,
  _originalEvent?: {
    x: number
    y: number
  },
) {
  return cropper.value?.zoomTo(ratio, _originalEvent)
}

/**
 * Rotate the canvas with a relative degree
 * @param {number} degree - The rotate degree.
 * @returns {object} this
 */
function rotate(degree: number) {
  return cropper.value?.rotate(degree)
}

/**
 * Rotate the canvas to an absolute degree
 * @param {number} degree - The rotate degree.
 * @returns {object} this
 */
function rotateTo(degree: number) {
  return cropper.value?.rotateTo(degree)
}

/**
 * Scale the image on the x-axis.
 * @param {number} scaleX - The scale ratio on the x-axis.
 * @returns {object} this
 */
function scaleX(scaleX: number) {
  return cropper.value?.scaleX(scaleX)
}

/**
 * Scale the image on the y-axis.
 * @param {number} scaleY - The scale ratio on the y-axis.
 * @returns {object} this
 */
function scaleY(scaleY: number) {
  return cropper.value?.scaleY(scaleY)
}

/**
 * Scale the image
 * @param {number} scaleX - The scale ratio on the x-axis.
 * @param {number} [scaleY] - The scale ratio on the y-axis.
 * @returns {object} this
 */
function scale(scaleX: number, scaleY = scaleX) {
  return cropper.value?.scale(scaleX, scaleY)
}

/**
 * Get the cropped area position and size data (base on the original image)
 * @param {boolean} [rounded] - Indicate if round the data values or not.
 * @returns {object} The result cropped data.
 */
function getData(rounded = false) {
  return cropper.value?.getData(rounded)
}

/**
 * Set the cropped area position and size with new data
 * @param {object} data - The new data.
 * @returns {object} this
 */
const setData: Cropper['setData'] = (data) => {
  return cropper.value!.setData(data)
}

/**
 * Get the container size data.
 * @returns {object} The result container data.
 */
function getContainerData() {
  return cropper.value?.getContainerData()
}

/**
 * Get the image position and size data.
 * @returns {object} The result image data.
 */
function getImageData() {
  return cropper.value?.getImageData()
}

/**
 * Get the canvas position and size data.
 * @returns {object} The result canvas data.
 */
function getCanvasData() {
  return cropper.value?.getCanvasData()
}

/**
 * Set the canvas position and size with new data.
 * @param {object} data - The new canvas data.
 * @returns {object} this
 */
const setCanvasData: Cropper['setCanvasData'] = (data) => {
  return cropper.value!.setCanvasData(data)
}

/**
 * Get the crop box position and size data.
 * @returns {object} The result crop box data.
 */
function getCropBoxData() {
  return cropper.value?.getCropBoxData()
}

/**
 * Set the crop box position and size with new data.
 * @param {object} data - The new crop box data.
 * @returns {object} this
 */
const setCropBoxData: Cropper['setCropBoxData'] = (data) => {
  return cropper.value!.setCropBoxData(data)
}

/**
 * Get a canvas drawn the cropped image.
 * @param {object} [options] - The config options.
 * @returns {HTMLCanvasElement} - The result canvas.
 */
const getCroppedCanvas: Cropper['getCroppedCanvas'] = (options = {}) => {
  return cropper.value!.getCroppedCanvas(options)
}

/**
 * Change the aspect ratio of the crop box.
 * @param {number} aspectRatio - The new aspect ratio.
 * @returns {object} this
 */
const setAspectRatio: Cropper['setAspectRatio'] = (aspectRatio) => {
  return cropper.value!.setAspectRatio(aspectRatio)
}

/**
 * Change the drag mode.
 * @param {string} mode - The new drag mode.
 * @returns {object} this
 */
const setDragMode: Cropper['setDragMode'] = (mode) => {
  return cropper.value!.setDragMode(mode)
}

defineExpose<CropperInstance>({
  reset,
  clear,
  initCrop,
  replace,
  enable,
  disable,
  destroy,
  move,
  moveTo,
  zoom,
  zoomTo,
  rotate,
  rotateTo,
  scaleX,
  scaleY,
  scale,
  getData,
  getContainerData,
  getImageData,
  getCanvasData,
  getCropBoxData,
  setData,
  setCanvasData,
  setCropBoxData,
  getCroppedCanvas,
  setAspectRatio,
  setDragMode,
})
</script>

<template>
  <div :style="containerStyle">
    <img
      ref="imageRef"
      :src="src"
      :alt="alt"
      :style="{ 'max-width': '100%', ...imgStyle }"
      :crossorigin="crossorigin"
    >
  </div>
</template>

<style scoped></style>
