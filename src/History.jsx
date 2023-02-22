import React from 'react';
import Item from './Items';

class History extends React.Component {
  render() {
    return (
      <div>
        <h2>==/Payment History/==</h2>
        <ul>
          {this.props.payments.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      </div>
    )
  }
}



export default History;