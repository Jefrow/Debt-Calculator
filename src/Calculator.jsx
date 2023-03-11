import React from "react";
import StartingInputs from "./components/StartingInputs"; 
import LoanBreakdown from "./components/LoanBreakdown"; 
import Payments from "./components/Payments"; 
import History from "./components/History";

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      principal: 0.00, 
      interest: 0.00, 
      balance: 0.00,
      minPrincipal: 0.00, 
      totalPayment: 0.00, 
      count: 1,
      id: 0, 
      newBalance: "", 
      payments: [],
      warning:""
    };
  }

  //Event handlers
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    if(this.checkInput(this.state.principalInput) && this.checkInput(this.state.interestInput) && this.currDebt(this.state.principal)){

      let principal, interest, balance, minPrincipal, totalPayment = '';

      if(this.nearEdge(this.state.principalInput)) {
        principal = this.state.principalInput; 
        interest = 0; 
        balance = this.calcFinalPay(this.state.principalInput);
        minPrincipal = this.calcMinPrincipal(this.state.principalInput); 
        totalPayment = this.calcFinalPay(this.state.principalInput); 
      }else{
        principal = this.state.principalInput; 
        interest = this.calcInterest(this.state.interestInput,this.state.principalInput);
        balance = this.calcBalance(this.state.interestInput, this.state.principalInput);
        minPrincipal = this.calcMinPrincipal(this.state.principalInput);
        totalPayment = this.calcMinPay(this.state.interestInput, this.state.principalInput);
      }

      this.setState({
        principal: principal,
        interest: interest,
        balance: balance,
        minPrincipal: minPrincipal,
        totalPayment: totalPayment
      });
    }
    e.preventDefault();
  };


  handlePayment = (e) => {
    if(this.checkInput(this.state.paymentInput) && (this.checkPayment(this.state.paymentInput, this.state.totalPayment, this.state.balance))){

      let newBalance = this.calcNewBalance(this.state.balance, this.state.paymentInput); 
      let principalPaid = this.calcPrincipalPaid(this.state.paymentInput, this.state.interest); 
      let balance, interest,minPrincipal, totalPayment = ''

      if(this.nearEdge(newBalance)) {
        balance = this.calcFinalPay(newBalance);
        interest = 0;
        minPrincipal = this.calcMinPrincipal(newBalance);
        totalPayment = this.calcFinalPay(newBalance); 
      }else {
        balance = this.calcBalance(this.state.interestInput, newBalance);
        interest = this.calcInterest(this.state.interestInput, newBalance);
        minPrincipal = this.calcMinPrincipal(newBalance); 
        totalPayment = this.calcMinPay(this.state.interestInput, newBalance);
      }

      const newPayment = {
        id: this.state.id,
        count: this.state.count,
        prevBalance: this.state.principal,
        interest: this.state.interest,
        principalPaid: principalPaid,
        newBalance: newBalance
      };
  
      this.setState((state) => ({
        id:this.increase(this.state.id), 
        count: this.increase(this.state.count),
        principal: newBalance,
        interest: interest,
        balance: balance, 
        minPrincipal: minPrincipal,
        totalPayment: totalPayment,
        payments: [...state.payments, newPayment],
        paymentInput:"",
      }));
    }
    e.preventDefault();
  };

  handleReset = (e) => {
    e.preventDefault(); 
    this.setState({
      principalInput: "", 
      interestInput: "", 
      principal: 0, 
      interest: 0, 
      balance: 0, 
      minPrincipal: 0, 
      totalPayment: 0, 
      count:1,
      id:1, 
      payments:[], 
      payment:"",
      warning:""
    })
  }

  //calculations
  calcInterest = (interest, loan) => ((Number(interest) * 0.01 / 12) * Number(loan)).toFixed(2); 
  calcBalance = (interest, loan) => (Number(loan) + (Number(interest) * 0.01 / 12) * Number(loan)).toFixed(2); 
  calcMinPrincipal = (loan) => (Number(loan) * 0.01).toFixed(2); 
  calcMinPay = (interest, balance) => (Number(balance) * 0.01 + (Number(interest) * 0.01 / 12)  * Number(balance)).toFixed(2); 
  calcNewBalance = (balance, payment) => (Number(balance) - Number(payment)).toFixed(2); 
  calcPrincipalPaid = (payment, interest) => (Number(payment) - Number(interest)).toFixed(2);
  calcFinalPay = (balance) => (Number(balance) + Number(balance) * 0.01).toFixed(2); 
  increase = (int) => int += 1; 

  //Input checks
  checkInput = (input) => {
    if(Number(input) <= 0){
      this.setState({warning:'Inputs must be greater than 0.'})
      return false;
    }
    this.setState({warning:''})
    return true; 
  }

  checkPayment = (payment, totalPayment, balance) => {
    if(Number(payment) < Number(totalPayment)){
      this.setState({warning:"Payment is too low."})
      return false; 
    }else if(Number(payment) > Number(balance)) {
      this.setState({warning:"Payment is too much."})
      return false; 
    }
    this.setState({warning:''})
    return true
  }

  nearEdge = (balance) => { 
    if(balance <= 100){
      return true; 
    }
    return false; 
  }

  currDebt = (principal) => {
    if(principal){
      this.setState({warning:'please click reset to start over.'})
      return false 
    }
    this.setState({warning:''})
    return true
  }

  render() {
    return (
      <div>
        <h4>{this.state.warning}</h4>
        <div className="calculator-container">
          <div className="input-container">
            <StartingInputs 
            principalInput={this.state.principalInput}
            interestInput={this.state.interestInput}
            handleChange={this.onInput}
            onInput={this.handleInput} 
            onSubmit={this.handleSubmit} 
            onReset={this.handleReset} 
            />
            <Payments 
            paymentInput={this.state.paymentInput}
            handleChange={this.onInput}
            onInput={this.handleInput} 
            onPayment={this.handlePayment} 
            />  
          </div>
          <div className="breakdown-container">
            <LoanBreakdown 
              loanHeading = {this.state.principal} 
              interestHeading = {this.state.interest}
              balance = {this.state.balance}
              minPrincipal = {this.state.minPrincipal} 
              totalPayment = {this.state.totalPayment} 
            /> 
          </div>
        </div>
        <div>
          <History payments={this.state.payments} />
        </div>
      </div>
    );
  }
}


export default Calculator;