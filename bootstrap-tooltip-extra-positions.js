/* ================================================
 * bootstrap-tooltip-extra-positions.js v0.0.1
 *
 * Extend Bootstrap 3 Tooltip plugin by adding 4 extra positions: 
 * top-left, top-right, bottom-left, bottom-right
 * ============================================= */


(function ($) {

  if (typeof $.fn.tooltip.Constructor === 'undefined') {
    throw new Error('Bootstrap Tooltip must be included first!');
  }
  
  var Tooltip = $.fn.tooltip.Constructor;
  
  Tooltip.prototype.applyPlacement = function (offset, placement) {
    
    /* Bootstrap tooltip extra positions
     * define extra positions
     */
    var extra_positions = [ 'top-l', 'top-r', 'bottom-l', 'bottom-r' ];
    
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'
    
    $tip.offset(offset)
        
    /* Bootstrap tooltip extra position
     * if tooltip is positioned in one of the extra positions, we should skip replaceArrow function
     */    
    if ( $.inArray(placement, extra_positions) == -1 ) {
      this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
    } 
    
  }
  
  Tooltip.prototype.getCalculatedOffset  = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
          /* Bootstrap tooltip extra position
           * calculate offset for the extra positions
           */
           placement == 'top-l' ? { top: pos.top - actualHeight, left: pos.left } :
           placement == 'top-r' ? { top: pos.top - actualHeight, left: pos.left + pos.width - actualWidth } :
           placement == 'bottom-l' ? { top: pos.top + pos.height,   left: pos.left } :
           placement == 'bottom-r' ? { top: pos.top + pos.height,   left: pos.left + pos.width - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }
  };
    
})(window.jQuery);
