import React from 'react'; 

class StartingInput extends React.Component {

  render(){
    const {loan, interest} = this.state
    return (
      <div>
        <h2>Starting Loan</h2>
        <div>
          <h4>Starting Principal:</h4>
          <input name="loan" value={loan} onChange={this.onInput} />
          <h4>Interest Rate:</h4>
          <input name="interest" value={interest} onChange={this.onInput}/>
        </div>
        <div>
          <span>
            <button onClick={this.handleSubmit}>Calculate</button>
          </span>
          <span>
            <button onClick={this.handleReset}>Reset</button>
          </span>
        </div>
      </div>
    )
  }

}

export default StartingInput; 