import ajaxSubmit from './modules/ajax_form/ajax_forms.js'
import '../node_modules/jquery-validation/dist/jquery.validate.js'
import * as qGlobals from './q_globals.js'

$.validator.addMethod('verifyPassword', qGlobals.validatePassword, 'Password should contain at least 8 characters with a combination of letters, figures and or special characters')

$('#form01').submit(function (e) {
  e.preventDefault()
  const $this = $(this)
  let data = $this.serialize()

  ajaxSubmit.submit({
    selector: $this,
    display: 'disable_button',
    handleJsonResp: true,
    ajax: {
      data: data,
      dataType: 'json',
      success: function (json) {
        // expecting {succ:1,message:""}
        if (json.succ) {
          $('.form-dom-1').html('<p>A link to reset your password has been sent to your mail box</p>')
        } else {
          // DISPLAY THE ERROR
        }
      }
    }

  })
})

$('#form02').validate({
  rules: {
    password: {
      verifyPassword: true
    },
    rpassword: {
      equalTo: '#npass'
    }
  },

  messages: {
    password: {
      // verifyPassword: "Password should contain at least 8 characters with a combination of letters and figures"
    },
    rpassword: {
      equalTo: 'Incorrect password'
    }
  },
  ignoreTitle: true,
  submitHandler: function (form) {
    const $this = $(form)
    let data = $this.serialize()

    ajaxSubmit.submit({
      selector: $this,
      display: 'disable_button',
      handleJsonResp: true,
      ajax: {
        data: data,
        dataType: 'json',
        success: function (json) {
          // expecting {succ:1,message:""}
          if (json.succ) {
            $('.form-dom-1').html('<p>A link to reset your password has been sent to your mail box</p>')
          } else {
            // DISPLAY THE ERROR
          }
        }
      }

    })
  }

})

// zVWde0pNmCk2
// 3ttYIErA08rQ
