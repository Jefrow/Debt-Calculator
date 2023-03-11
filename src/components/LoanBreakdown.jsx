import React from 'react'

class LoanBreakDown extends React.Component {
  render() {
    return(
      <div className="loan-breakdown">
        <h4>=|Loan Break Down|=</h4>
        <p>Principal: ${this.props.loanHeading}</p>
        <p>Interest: ${this.props.interestHeading}</p>
        <p>Total Balance: ${this.props.balance}</p>
        <p>1% of principal required: ${this.props.minPrincipal}</p>
        <p>Total Payment: ${this.props.totalPayment}</p>
      </div>
    )
  }
}

export default LoanBreakDown; 