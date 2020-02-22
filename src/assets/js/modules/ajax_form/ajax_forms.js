// import strFormat from './node_modules/string-format' ;
/*
    # Todo Write a module to handle form submit via ajax.
    # the module will accept a callback for actions to be performed on error ,
     on success,
    # the module will use the jquery ajax method thus all properties will be available
    # module relies on jQuery
*/

// LOADING STYLES

// button disabled
// only ideal if the selector is a form

let $selector, $submit_button, parent_container_pos, loading_anim
let submit_button_val = ''

function before_send_button_disabled (xhr, settings) {
  $submit_button.prop('disabled', true).text('Processing...')
}

function complete_button_disabled (xhr, status) {
  $submit_button.prop('disabled', false).text(submit_button_val)
}

// form_overlay

const overlay_markup = (x, y) => {
  return `<div class="fm-overlay" style="">
        <!--<div class="fm-loader">loading. . . </div>-->
        ${loader_markup[x]}
    </div>`
}

const loader_markup = {
  dual_ring: '<div class="lds-dual-ring"></div>',
  ripple: '<div class="lds-ripple"><div></div><div></div></div>',
  spinner: '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  linear: '<div class="lds-facebook"><div></div><div></div><div></div></div>',
  ellipsis: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'
}
function before_send_form_overlay () {
  let $parent = $selector.parent()
  parent_container_pos = $parent.css('position')
  $parent.css('position', 'relative')
  $selector.prepend(overlay_markup(loading_anim))
}

function complete_form_overlay () {
  $selector.find('.fm-overlay').remove().parent().css('position', parent_container_pos)
}

// document_overlay
function before_send_document_overlay () {
  $('body').append(overlay_markup(loading_anim))
}

function complete_document_overlay () {
  $('body').find('.fm-overlay').remove()
}

function pick_loading_style (style) {
  let loader
  switch (style) {
    case 'button_disable':
      loader = [before_send_button_disabled, complete_button_disabled]
      // set the $submit button ;
      $submit_button = $selector.find('.ajax-form-submit')
      // console.log($submit_button) ;
      // get the value of the submit button
      submit_button_val = $submit_button.text()
      break

    case 'form_overlay' :
      loader = [before_send_form_overlay, complete_form_overlay]
      break

    case 'document_overlay' :
      loader = [before_send_document_overlay, complete_document_overlay]
      break

    default :
      loader = false
  }

  return loader
}

function success_def (data, xhr) {
  // console.log(xhr)
  if (data) {
    // if (xhr.)
  }
}

function before_handleJsonResp () {
  // remove
  $selector.find('.fm-info').remove()
}

function success_handleJsonResp (data, xhr) {
  // Expecting a {succ:1, message:""} or {error:["",""]}
  let classes = ''; let message = ''; let info = ''
  if (data.succ) {
    classes = 'alert alert-success'
    message = data.message
  } else {
    classes = 'alert alert-danger'
    message = Array.isArray(data.error) ? data.error.join('<br>') : data.error
  }
  info = `<div class="fm-info">
                    <div class="${classes}" role="alert">
                        ${message}
                    </div>
                </div>`
  console.log('did handlejsonresp')
  $selector.prepend(info)
}

function error_def (xhr, status, errorText) {
  alert(errorText)
}

// function returning the default in the case that no style was found ;
function noStyle (the_key, the_array) {
  the_key ? the_array.push(the_key) : null
  // return ;
}

const _ajax_defaults = {
  beforeSend: [],
  complete: [],
  success: [],
  error: []
}

// function to add user default which run gobally ;
const set_defaults = (key, fn) => {
  if (typeof key === 'string' && typeof fn === 'function') {
    if (key in _ajax_defaults) {
      if (_ajax_defaults[key].indexOf(fn) == -1) {
        _ajax_defaults[key] = _ajax_defaults[key].concat(fn)

        return true
      }
    } else {
      _ajax_defaults[key] = [fn]

      return true
    }
  }

  return false
}

const remove_defaults = (key, fn) => {
  let pos
  if (key in _ajax_defaults) {
    pos = _ajax_defaults[key].indexOf(fn)
    if (pos != -1) {
      _ajax_defaults.splice(pos, 1)
      return true
    }
  }

  return false
}

const $def_options = {
  selector: '', // form object or string
  // display: '' , // div to display returned message from server if its a form
  handleJsonResp: false,
  loadingStyle: 'button_disable', // takes one of button_disable | form_overlay | document_overlay
  loader: {
    type: 'ellipsis', // linear, spinner, ripple, ellipsis, dual_ring
    color: ''
  },
  ajax: {}, // takes all ajax keys  ;
  removeDefault: [] // remove default behaviour of any of the ajax events

}

function submit ($options) {
  // expecting the selector as a string or dom object
  const m_options = Object.assign($def_options, $options)
  // console.log(m_options)
  $selector = typeof $options.selector === 'string' ? $(m_options.selector) : m_options.selector
  loading_anim = m_options.loader.type == '' ? 'ellipsis' : m_options.loader.type

  // make a copy of _ajax_defaults ;
  const before_send = jQuery.extend([], _ajax_defaults.beforeSend)
  const complete = jQuery.extend([], _ajax_defaults.complete)
  const error_op = jQuery.extend([], _ajax_defaults.error)
  const success = jQuery.extend([], _ajax_defaults.success)

  if ($selector[0].nodeName == 'FORM') {
    if (!m_options.ajax.url) {
      if ($selector.attr('action') && $selector.attr('action') != '') { m_options.ajax.url = $selector.attr('action') } else {
        throw ('url not set !, set url in the ajax options for non-form elements, ensure action attribute is set for form elements')
      }
    }
  } else // For non form elems
  {

  }

  // if user does not remove default
  // get loading style
  const load_style = pick_loading_style(m_options.loadingStyle)

  if (load_style) {
    if (Array.isArray(m_options.removeDefault)) {
      if (m_options.removeDefault.indexOf('beforeSend') == -1) {
        before_send.push(load_style[0])
        m_options.handleJsonResp ? before_send.push(before_handleJsonResp) : null
        m_options.ajax.beforeSend ? before_send.push(m_options.ajax.beforeSend) : null
      } else {
        // m_options.ajax.beforeSend ? before_send.push(m_options.ajax.beforeSend) :  ;
        noStyle(m_options.ajax.beforeSend, before_send)
        m_options.handleJsonResp ? before_send.push(before_handleJsonResp) : null
      }

      if (m_options.removeDefault.indexOf('complete') == -1) {
        m_options.ajax.complete ? complete.push(load_style[1], m_options.ajax.complete) : complete.push(load_style[1])
      } else {
        // m_options.ajax.complete ? complete.push( m_options.ajax.complete) :  ;
        noStyle(m_options.ajax.complete, complete)
      }

      if (m_options.removeDefault.indexOf('error') == -1) {
        m_options.ajax.error ? error_op.push(error_def, m_options.ajax.error) : error_op.push(error_def)
        // console.log('right here ', error_op) ;
      } else {
        // m_options.ajax.error ? error.push(m_options.ajax.error) : ;
        noStyle(m_options.ajax.error, error_op)
      }

      if (m_options.removeDefault.indexOf('success') == -1) {
        success.push(success_def)
        m_options.handleJsonResp ? success.push(success_handleJsonResp) : null
        m_options.ajax.success ? success.push(m_options.ajax.success) : null
      } else {
        // m_options.ajax.success ? success.push(m_options.ajax.success) : ;
        noStyle(m_options.ajax.success, success)
      }
    } else {
      throw ('Expecting removeDefault as an array')
    }
  } else {
    noStyle(m_options.ajax.beforeSend, before_send)
    noStyle(m_options.ajax.complete, complete)
    noStyle(m_options.ajax.error, error_op)
    noStyle(m_options.ajax.success, success)
  }

  // merge default global ajax events with those above
  // console.log('m opt',m_options)

  // console.log('tracing error',error_op) ;
  const ajax_data = {
    beforeSend: function (xhr, settings) {
      before_send.forEach(function (elem) {
        elem(xhr, settings)
      })
    },

    complete: function (xhr, status) {
      complete.forEach(function (elem) {
        elem(xhr, status)
      })

      // reset ajax event related variables
      error_op.splice(0)
      before_send.splice(0)
      complete.splice(0)
      success.splice(0)

      // console.log('ajax_defaults', _ajax_defaults) ;
    },

    success: function (data, xhr) {
      success.forEach(function (elem) {
        elem(data, xhr)
      })
    },
    error: function (xhr, status, errorText) {
      // console.log(error_op,'compute error')
      error_op.forEach(function (elem) {
        elem(xhr, status, errorText)
      })
    }
  }

  // console.log(error_op,'compute error')
  // merge ajax object ;
  const dd = Object.assign(m_options.ajax, ajax_data)
  // console.log(dd)
  return $.ajax(dd)
}

export default { submit, set_defaults, remove_defaults }

/* usage
    ajax_fprms.submit({'selecteor':'',
     ajax:
     {
     beforeSend:[] ,
     cmplete
    }
}) ; */
