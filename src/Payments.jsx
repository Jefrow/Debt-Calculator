import React from 'react'

class Payments extends React.Component {



  render(){
    return(
      <div>
        <h4>Make A Payment: </h4>
        <input type='text' name="payment" value={this.state.payment} onchange={this.handle} />
        <button onClick={this.handlePayment}>Make Payment</button>
      </div>
    )
  }
}

export default Payments; 