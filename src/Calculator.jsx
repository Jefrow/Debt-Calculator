import React from "react";
import History from "./History";

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      loanHeading: "",
      interestHeading: "",
      balance: "",
      minLoanDue: "",
      minBalanceDue: "",
      payment: "",
      id: 1,
      newBalance: "",
      count: 1,
      payments: []
    };
  }

  //Event handlers
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /*
  What needs to happen when you click handle submit?
  1.Calculate the interest, calculate the loan, and update the principal, interest and loan.
  */
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.checkInput(this.state.loan, this.state.interest)) {
      this.setState({
        loanHeading: this.state.loan,
        interestHeading: this.calculateInterest(
          this.state.interest,
          this.state.loan
        ),
        balance: this.calculateBalance(this.state.interest, this.state.loan),
        minLoanDue: this.state.loan / 100,
        minBalanceDue: this.calculateMinPay(
          this.state.interest,
          this.state.loan
        )
      });
    } else {
      alert(
        "Loan and Interest need to be positive numbers and greater than 0."
      );
    }
  };

  handlePayment = (e) => {
    e.preventDefault();
    // if (this.checkPayment(this.state.payment, this.state.minBalanceDue)) {
      let newBalance = this.calculateNewBalance(
        this.state.balance,
        this.state.payment
      );
      console.log(newBalance);
      const newPayment = {
        id: this.state.id,
        count: this.state.count,
        prevBalance: this.state.loanHeading,
        interest: this.state.interestHeading,
        payment: this.state.payment,
        newBalance: newBalance
      };

      this.setState((state) => ({
        loanHeading: newBalance,
        interestHeading: this.calculateInterest(
          this.state.interest,
          newBalance
        ),
        id: this.increase(this.state.id), 
        count: this.increase(this.state.count),
        balance: this.calculateBalance(this.state.interest, newBalance),
        minLoanDue: this.calculateMinLoan(newBalance),
        minBalanceDue: this.calculateMinPay(this.state.interest, newBalance),
        payments: [...state.payments, newPayment],
        payment: " "
      }));
    // } else {
    //   alert("Payment too low. Please enter at least the minimum payment.");
    // }
  };

  //calculations
  calculateInterest = (interest, loan) => {
    return ((interest / 100 / 12) * loan).toFixed(2);
  };

  calculateBalance = (interest, balance) => {
    return (
      Number(balance) +
      (Number(interest) / 100 / 12) * Number(balance)
    ).toFixed(2);
  };

  calculateMinLoan(balance) {
    return Number(balance) / 100;
  }

  calculateMinPay = (interest, balance) => {
    return (
      Number(balance) / 100 +
      (Number(interest) / 100 / 12) * Number(balance)
    ).toFixed(2);
  };

  calculateNewBalance = (balance, payment) => {
    return (Number(balance) - Number(payment)).toFixed(2);
  };

  increase = (int) => {
    return int += 1;
  }

  //Input checks
  checkPayment = (payment, minimumPayment) => {
    if (payment >= minimumPayment) {
      return true;
    }
    return false;
  };

  checkInput = (loan, interest) => {
    if (Math.sign(Number(loan)) > 0 && 0 < Math.sign(Number(interest))) {
      return true;
    }
    return false;
  };

  render() {
    const {
      loan,
      interest,
      loanHeading,
      interestHeading,
      balance,
      minLoanDue,
      minBalanceDue,
      payment
    } = this.state;
    return (
      <div>
        <div>
          <div>
            <h4>Starting Balance: </h4>
            <input type="text" name="loan" value={loan} onChange={this.handleInput} />
            <h4>Interest Rate:</h4>
            <input
              type="text"
              name="interest"
              value={interest}
              onChange={this.handleInput}
            />
          </div>
          <div>
            <span>
              <button onClick={this.handleSubmit}>Calculate</button>
            </span>
            <span>
              <button onClick={this.handleReset}>Start Over</button>
            </span>
          </div>

          {/* <StartingInput /> */}

          {/* <Inputs
            label="loan"
            heading="Loan"
            id="loan"
            name="loan"
            value={loan}
            onInput={this.handleInput}
          />
          <Inputs
            label="interest"
            heading="Interest"
            id="interest"
            name="interest"
            value={interest}
            onInput={this.handleInput}
          /> */}
        </div>

        <div>
          <h2>=/Loan Breakdown/=</h2>
          <h3>Principal: {loanHeading}</h3>
          <h3>Interest: {interestHeading}</h3>
          <h3>Total Balance: {balance}</h3>
          <h2>=/Payment/=</h2>
          <h3>1% of principal required: {minLoanDue}</h3>
          <h3>Min Total Payment: {minBalanceDue}</h3>
          {/* <LoanBreakDown /> */}
        </div>

        <div>
          <h4>Make A Payment:</h4>
          <input type="text" name="payment" value={payment} onChange={this.handleInput} />
          {/* <Inputs
            label="payment"
            heading="payment"
            id="payment"
            name="payment"
            value={this.state.payment}
            onInput={this.handleInput}
          /> */}
          <button onClick={this.handlePayment}>Make Payment</button>
        </div>

        <div>
          <History payments={this.state.payments} />
        </div>
      </div>
    );
  }
}

// //Starting Loan Component
// class StartingInput extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//   }
//   render() {
//     const { loan, interest } = this.state;
//     return (
//       <div>
//         <h2>Starting Loan</h2>
//         <div>
//           <h3>Starting Balance:</h3>
//           <input name="loan" value={loan} onChange={this.onInput} />
//           <h3>Interest Rate:</h3>
//           <input name="interest" value={interest} onChange={this.onInput} />
//         </div>
//         <div>
//           <button onClick={this.handleSubmit}>Calculate</button>
//         </div>
//       </div>
//     );
//   }
// }

// //Loan Breakdown Payment Component
// class LoanBreakDown extends React.Component {
//   render() {
//     return (
//       <div>
//         <h2>=/Loan Breakdown/=</h2>
//         <h3>Principal: {this.props.loanHeading}</h3>
//         <h3>Interest: {this.props.interestHeading}</h3>
//         <h3>Total Balance: {this.props.balance}</h3>
//         <h2>=/Payment/=</h2>
//         <h3>1% of principal required: {this.props.minPrincipal}</h3>
//         <h3>Min Total Payment: {this.props.minBalanceDue}</h3>
//       </div>
//     );
//   }
// }

// //Payment Component
// class Payment extends React.Component {
//   render() {
//     return <div></div>;
//   }
// }

export default Calculator;