// utility function to resize slick grid_stores
export function resize_grid (grid, resize_factor) {
  let width = 0; let grid_elem
  if (typeof resize_factor === 'string') {
    width = $(resize_factor).innerWidth()
  } else if (typeof resize_factor === 'object') {
    width = resize_factor.innerWidth()
  } else if (typeof resize_factor === 'number') { width = resize_factor }

  grid_elem = $(grid.getContainerNode())
  grid_elem.css('width', width.toString() + 'px')
  grid.resizeCanvas()
}

export default {}
