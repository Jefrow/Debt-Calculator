import React from 'react';
import Item from './Items';

class History extends React.Component {
  render() {
    return (
      <div>
        <h3>=|Payment History|=</h3>
          <table className="payment-table">
            <tbody>
              <tr>
                <th>Count</th>
                <th>Balance</th>
                <th>Interest paid</th>
                <th>Principal paid</th>
                <th>New Balance</th>
              </tr>
              {this.props.payments.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </tbody>
          </table>
      </div>
    )
  }
}



export default History;