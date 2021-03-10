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
    output.width = bounds.width
    output.height = input.height * (bounds.width / input.width)
  }
  // rect is more portrait than bounds - fit to height
  else {
    output.width = input.width * (bounds.height / input.height)
    output.height = bounds.height
  }

  return output
}
