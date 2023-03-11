import React from 'react'

class Payments extends React.Component {

  handleChange = (e) => {
    this.props.onInput(e); 
  }
  
  render() {
    return(
      <div>
        <h4>=|Payment|=</h4>
        <div className="input-wrapper">
          <label htmlFor="payment">Payment:</label>
          <input name="paymentInput" value={this.props.paymentInput} type="number"onChange={this.handleChange} />
        </div>
        <button onClick={this.props.onPayment}>Make Payment</button>
      </div>
    )
  }
}

export default Payments; 