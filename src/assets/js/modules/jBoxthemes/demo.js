// JavaScript Document
$(document).ready(function () {
  $('#Notice-1').click(function () {
    new jBox('Notice', {
      attributes: {
        x: 'left',
        y: 'top'
      },
      closeButton: true,
      stack: false,
      theme: 'StickyNotice',
      autoClose: 0,
      animation: {
        open: 'slide:Top',
        close: 'slide:Bottom'
      },
      color: getColor(),
      // title: '',
      content: 'Action completed',
      onCreated: function () {
        // add to jBox dom ;
        var elem = this.options.id
        // attch An icon to the box, not necessary ,You can remove if u don't need it
        $('#' + elem).find('.jBox-container').append('<i class="fa fa-cog notice-icon "></i>')
      },
      onPosition: function () {
        console.log($(this))
        // console.log(this.options.id);
        var elem = this.options.id
        var attr = this.options.attributes
        // positon x
        if (attr.x === 'left') {
          $('#' + elem).css({ 'left': '0', 'right': 'auto' })
        } else if (attr.y === 'right') {
          $('#' + elem).css({ 'right': '0', left: 'auto' })
        }

        if (attr.y === 'top') {
          $('#' + elem).css({ 'top': '0', 'bottom': 'auto' })
        } else if (attr.y === 'bottom') {
          $('#' + elem).css({ 'bottom': '0', top: 'auto' })
        }
      }
  		})
  })

  var colors = ['red', 'green', 'blue', 'yellow']; var index = 0
  var getColor = function () {
	  (index >= colors.length) && (index = 0)
	  return colors[index++]
  }
})
