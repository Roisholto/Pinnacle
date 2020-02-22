
const form_template = {
  sign_up_password: `
        <div class="row">
            <div class="form-group col-md">
                <label for="password">Your password</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="password" required>
            </div>

            <div class="form-group col-md">
                <label for="rpassword">Retype password</label>
                <input type="password" class="form-control" name="rpassword" id="rpassword" placeholder="Retype your password" required>
            </div>
        </div>`,

  login_password: `
        <div class="form-group">
            <label for="password">Your password</label>
            <input type="password" class="form-control" name="password" id="password" placeholder="password" required>
        </div>
        `,
  email: `
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" name="email" id="email" placeholder="Enter your email" required>
        </div>`,

  info: `
        <div class="messages-panel alert alert-danger d-none" role="alert">
            alert
        </div>`,

  submit: function (val) {
    return `<div class="">
                    <button class="btn btn-primary w-100 ajax-form-submit" data-ajax-form-submit>${val}</button>
                </div>
            `
  },

  merchant: {
    header_text: 'Merchant',
    sign_up: function () {
      return `
                <form class="signup" method="post" action="api/signup" id="signup-fm">
                    <div class="form-group">
                        <input type="hidden" value="merchant" name="signuptype">
                        <label for="merchantname">Merchant name</label>
                        <input type="text" class="form-control" name="merchantname" id="merchantname" placeholder="Enter merchant name"  required>
                    </div>

                    <div class="form-group">
                        <label for="outlettype">Outlet type</label>
                        <select name="outlettype" class="form-control" id="outlettype" >
                            <option value="1">Store</option>
                            <option value="2">Restaurant</option>
                            <option value="0">Other</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="fulladdress">Full address</label>
                        <input type="text" class="form-control" name="fulladdress" id="fulladdress" placeholder="Enter your full address" required>
                    </div>

                    ${form_template.email}

                    <div class="form-group">
                        <label for="phone">Phone number</label>
                        <input type="text" class="form-control" name="phone" id="phone" placeholder="Enter your phone">
                    </div>

                    ${form_template.sign_up_password}
                    ${form_template.info}
                    ${form_template.submit('sign up')}
                </form>
            `
    },

    sign_in: function () {
      return `
                <form class="" method="post" action="api/signin"  id="signin-fm">
                    ${form_template.email}
                    <input type="hidden" value="merchant" name="signintype">
                    ${form_template.login_password}
                    ${form_template.info}
                    ${form_template.submit('Sign in')}
                </form>
                `
    }
  },

  shopper: {
    header_text: 'Shopper',
    sign_up: function () {
      let rt = `
                    <form class="" method="post" action="api/signup"  id="signup-fm">
                        ${form_template.email}
                        <input type="hidden" value="shopper" name="signuptype">
                        ${form_template.sign_up_password}
                        ${form_template.info}
                        ${form_template.submit('sign up')}
                    </form>
                `
      return rt
    },

    sign_in: function () {
      return `
                    <form class="" method="post" action="api/signin"  id="signin-fm">
                        ${form_template.email}
                        <input type="hidden" value="shopper" name="signintype">
                        ${form_template.login_password}
                        ${form_template.info}
                        ${form_template.submit('Sign in')}
                    </form>
                `
    }

  }
}

export default form_template
