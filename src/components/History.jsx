import React from 'react';
import Item from './Items';

const History = (props) => {
  return (
    <div>
      <h3>=|Payment History|=</h3>
        <table className="payment-table">
          <tbody>
            <tr>
              { 
                ['Count', 'Balance', 'Interest Paid', 'Principal Paid', 'New Balance']
                  .map((heading) => (
                    <th>{heading}</th>
                  ))
              }
            </tr>
            { props.payments.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </tbody>
        </table>
    </div>
  )
}



export default History;