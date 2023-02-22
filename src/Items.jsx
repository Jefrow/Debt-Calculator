import React from 'react'; 

class Item extends React.Component {
  render() {
    const {count, prevBalance, interest, payment, newBalance} = this.props.item; 
    return(
      <li>
        <span>Payment: {count}</span>
        <span>Balance: {prevBalance}</span>
        <span>Interest: {interest}</span>
        <span>Payment: {payment}</span>
        <span>New Balance: {newBalance}</span>
      </li>
    )
  }
}

export default Item; 