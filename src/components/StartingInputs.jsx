import React from 'react'; 

class StartingInput extends React.Component {

  handleChange = (e) => {
    this.props.onInput(e); 
  }

  render() {
    const buttons = [
      { id:1, label: 'Calculate Loan', action: this.props.onSubmit },
      { id:2, label: 'Reset Input', action: this.props.onReset}
    ]; 
    const inputs = [
      { id: 'principalInput', label: 'Principal', ph:'3800', val:'principalInput'},
      { id: 'interestInput', label: 'Interest', ph:'9.5 = 9.5% ', val:'interestInput'},
    ]
    
    return (
      <div>
        <h4>=|Starting Loan|=</h4>
        <div className="loan-container">
          {inputs.map((item) => (
            <div className="input-wrapper" key={item.id}>
            <label htmlFor={item.id}>{item.label}:</label>
            <input 
              id={item.id}
              name={item.id} 
              value={this.props[item.val]} 
              placeholder={item.ph} 
              type="number" 
              onChange={this.handleChange} 
            />
            </div>
          ))}
        </div>
          {buttons.map((button) => (
            <button onClick={button.action} key={button.id}>{button.label}</button>
          ))}
      </div>
    )
  }
}

export default StartingInput; 