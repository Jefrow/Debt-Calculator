import React from 'react'; 

class StartingInput extends React.Component {

  handleChange = (e) => {
    this.props.onInput(e); 
  }

  render() {
    return (
      <div>
        <h4>=|Starting Loan|=</h4>
        <div className="loan-container">
          <div className="input-wrapper">
            <label htmlFor="principalInput">Principal:</label>
            <input name="principalInput" value={this.props.principalInput} placeholder="38000" type="number" onChange={this.handleChange} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="interestInput">Interest:</label>
            <input name="interestInput" value={this.props.interestInput} placeholder="9.5 = 9.5% , 10 = 10%" type="number" onChange={this.handleChange}/>
          </div>
        </div>
          <button onClick={this.props.onSubmit}>Calculate Loan</button>
          <button onClick={this.props.onReset}>Reset Input</button>
      </div>
    )
  }
}

export default StartingInput; 