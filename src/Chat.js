import React  from 'react'

export default class Chat extends React.Component {

  renderMessages = () => {
    return this.props.messages.map((message) => {
      return <li key={message.key}><strong>{message.name}: {message.message}</strong></li>
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderMessages()}
        </ul>
        <input type="text" placeholder="Message" ref={mes => this.message = mes}/>
        <button onClick={() => {
          this.props.sendMessage(this.message.value)
          this.message.value = ""
        }}>Send</button>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    )
  }
}
