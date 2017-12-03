import React  from 'react'

const Login = (props) => {
  return (
    <div>
      <input ref={(email) => this.email = email} type="text" placeholder="Email"/>
      <input ref={(pass) => this.pass = pass} type="password" placeholder="Password"/>
      <button onClick={(e) => {
        e.preventDefault()
        props.login(this.email.value, this.pass.value)
      }}>Login</button>
      <button onClick={(e) => {
        e.preventDefault()
        props.signUp(this.email.value, this.pass.value)
      }}>Sign up</button>
      <button onClick={() => {
        props.resetPassword(this.email.value)
      }}>Reset password</button>
      <button onClick={props.gmailSignUp}>Gmail login</button>
      <button onClick={props.twitterSignUp}>Twitter login</button>
    </div>
  )
}

export default Login
