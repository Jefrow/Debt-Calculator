import React from 'react'

const LoanBreakDown = (props) => {
  const pars = [
    {id:1, label: 'Principal', val:'loanHeading'},
    {id:2, label: 'Interest', val:'interestHeading'},
    {id:3, label: 'Total Balance', val:'balance'},
    {id:4, label: '1% of Principal', val:'minPrincipal'},
    {id:5, label: 'Total Payment', val:'totalPayment'},
  ];

  return(
    <div className="loan-breakdown">
      <h4>=|Loan Break Down|=</h4>
      { pars.map((item) => (
          <p key={item.id}>{item.label}: ${props[item.val]}</p>
        ))
      }
    </div>
  )
}

export default LoanBreakDown; 