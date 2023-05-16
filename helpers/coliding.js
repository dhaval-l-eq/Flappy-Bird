/**
 * Detects if two elements are colliding
 *
 * Credit goes to BC on Stack Overflow, cleaned up a little bit
 *
 * @link http://stackoverflow.com/questions/5419134/how-to-detect-if-two-divs-touch-with-jquery
 * @param $div1
 * @param $div2
 * @returns {boolean}
 */
export default function isColiding($div1, $div2) {
  // Div 1 data
  const d1_offset = $div1.offset();
  const d1_height = $div1.outerHeight(true);
  const d1_width = $div1.outerWidth(true);
  const d1_distance_from_top = d1_offset.top + d1_height;
  const d1_distance_from_left = d1_offset.left + d1_width;

  // Div 2 data
  const d2_offset = $div2.offset();
  const d2_height = $div2.outerHeight(true);
  const d2_width = $div2.outerWidth(true);
  const d2_distance_from_top = d2_offset.top + d2_height;
  const d2_distance_from_left = d2_offset.left + d2_width;

  const not_colliding =
    d1_distance_from_top < d2_offset.top ||
    d1_offset.top > d2_distance_from_top ||
    d1_distance_from_left < d2_offset.left ||
    d1_offset.left > d2_distance_from_left;

  // Return whether it IS colliding
  return !not_colliding;
}
