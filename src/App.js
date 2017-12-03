import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import * as firebase from 'firebase'

import Login from './Login'
import Chat from './Chat'

// Create new application on Firebase.
import config from './config'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: false,
      email: false,
      messages: []
    }
    // Initialize app.
    firebase.initializeApp(config)

    // Add event listener on auth state changed.
    firebase.auth().onAuthStateChanged(this.authStateChanged)
  }

  /**
   * Handle auth state.
   *
   * @param user
   *  Firebase user object.
   */
  authStateChanged = (user) => {

    if (user) {
      this.setState({user})
      firebase.database().ref('messages').limitToLast(20).on('child_added', this.setMessages)
      firebase.database().ref('messages').limitToLast(20).on('child_changed', this.setMessages)
    } else {
      this.setState({user: false})
      firebase.database().ref('messages').off()
    }
  }

  /**
   * Login user via Email/Password
   *
   * @param email
   *  User email.
   * @param pass
   *  User password.
   */
  login = (email, pass) => {
    firebase.auth().signInWithEmailAndPassword(email, pass)
  }

  /**
   * Sign up new user via Email/Password provider.
   *
   * @param email
   *  User email.
   * @param pass
   *  User password.
   */
  signUp = (email, pass) => {
    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then()
      .catch(e => console.log(e))
  }

  /**
   * Logout user.
   */
  logout = () => {
    firebase.auth().signOut()
  }

  /**
   * Reset user password.
   *
   * @param email
   *  User email.
   */
  resetPassword = (email) => {
    firebase.auth().sendPasswordResetEmail(email)
  }

  /**
   * Get messages handler from firebase.
   *
   * @param messages
   *  Message object.
   */
  setMessages = (messages) => {
    let message = messages.val()
    message.key = messages.key
    const messagesDistinct = this.state.messages.filter(mes => mes.key !== message.key)
    this.setState({messages: [message, ...messagesDistinct]})
  }

  /**
   * Send message.
   *
   * @param text
   *  Message.
   */
  sendMessage = (text) => {
    firebase.database().ref('messages').push({
      message: text,
      name: this.state.user.displayName,
      timestamp: Date.now()
    })
  }

  /**
   * Sign up via Gmail provider.
   */
  gmailSignUp = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .catch(e => console.log(e))
  }

  /**
   * Sign up via Twitter provider.
   */
  twitterSignUp = () => {
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .catch(e => console.log(e))
  }

  /**
   * Render chat component.
   */
  renderChat = () => {
    return (
      <div>
        <div>
          <img width="100" height="100" src={this.state.user.photoURL} alt="Me"/>
          <p>{this.state.user.displayName}</p>
        </div>
        <Chat logout={this.logout} sendMessage={this.sendMessage} messages={this.state.messages}/>
      </div>
    )
  }

  componentWillUnmount () {
    firebase.database().ref('messages').off()
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {this.state.email ? <p>A verification email sent. Please verify your account!</p> : null}
          {this.state.user ? this.renderChat() :
            <Login resetPassword={this.resetPassword} twitterSignUp={this.twitterSignUp} gmailSignUp={this.gmailSignUp}
                   login={this.login} signUp={this.signUp}/>}
        </div>
      </div>
    )
  }
}

export default App
