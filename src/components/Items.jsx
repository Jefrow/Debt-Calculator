import React from 'react'; 

class Item extends React.Component {
  render() {
    const {count, prevBalance, principalPaid, interest, newBalance} = this.props.item; 
    return(
      <tr>
        <th>{count}</th>
        <th>$ {prevBalance}</th>
        <th>$ {interest}</th>
        <th>$ {principalPaid}</th>
        <th>$ {newBalance}</th>
      </tr>
    )
  }
}

export default Item; 