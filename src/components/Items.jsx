import React from 'react'; 

class Item extends React.Component {
  render() {
    const {count, prevBalance, principalPaid, interest, newBalance} = this.props.item; 

    return(
      <tr>
      { 
        [count, prevBalance, principalPaid, interest, newBalance]
          .map((item, index) => (
            <th>{index > 0 ? `$ ${item}` : item}</th>
          ))
      }
      </tr>
    )
  }
}

export default Item; 