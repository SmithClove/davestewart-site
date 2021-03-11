/**
 * @typedef   Rectangle
 * @property  {number}  width
 * @property  {number}  height
 * @returns   {{width: Number, height: Number}}
 */
export function getRect (width, height) {
  return { width, height }
}

/**
 * Fits a rectangle into another rectangles' bounds
 *
 * @param   {Rectangle}   input
 * @param   {Rectangle}   bounds
 * @returns {Rectangle}
 */
export function fitRect (input, bounds) {
  // variables
  const rectRatio = input.width / input.height
  const boundsRatio = bounds.width / bounds.height
  const output = {}

  // rect is more landscape than bounds - fit to width
  if (rectRatio > boundsRatio) {
    output.scale = bounds.width / input.width
    output.width = bounds.width
    output.height = input.height * output.scale
  }
  // rect is more portrait than bounds - fit to height
  else {
    output.scale = bounds.height / input.height
    output.width = input.width * output.scale
    output.height = bounds.height
  }

  return output
}
