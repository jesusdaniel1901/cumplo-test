import React from 'react'
import jQuery from 'Jquery'

export default class extends React.Component {

  _handleSubmit(){
    jQuery.ajax({
      method: 'POST',
      headers: {
        "Content-Type": " application/json",
        "Accept": "application/json",
      },
      type: 'json',
      url: `/api/v1/investors/`,
      data: JSON.stringify({"email": this._name.value,"password": this._password.value}),
      success: (investor) => {
        window.location = '/'
      }
    });
  }

  render(){
    const divStyle = {
      width: '40%',
      marginLeft: '30%'
    };
    return(
        <div style={divStyle}>
          <form onSubmit={this._handleSubmit}>
            <div className="form-group">
              <label for="investorEmail">Email address</label>
              <input type="email"  className="form-control" ref={input => this._email = input} key="investorEmail" onChange={this._emailOnchange}
                     placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label for="investorName">Password</label>
              <input type="text"  ref={input => this._password = input} className="form-control" key="investorName"
                     placeholder="Enter password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    )
  }

}