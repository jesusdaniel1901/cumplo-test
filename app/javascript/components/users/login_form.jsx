import React from 'react'
import jQuery from 'jquery'

export default class extends React.Component {

  constructor(props){
    super(props)
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(event){
    event.preventDefault();
    // window.location = '/';
    jQuery.ajax({
      method: 'POST',
      headers: {
        "Content-Type": " application/json",
        "Accept": "application/json"
      },
      type: 'json',
      url: `/api/v1/admin_auth/sign_in`,
      data: JSON.stringify({"email": this._email.value,"password": this._password.value}),
      success: (data, textStatus, request) => {
        console.log(request.getResponseHeader('access-token'));
        localStorage.setItem('access-token', request.getResponseHeader('access-token'));
        localStorage.setItem('client', request.getResponseHeader('client'));
        localStorage.setItem('expiry', request.getResponseHeader('expiry'));
        localStorage.setItem('token-type', request.getResponseHeader('token-type'));
        localStorage.setItem('uid', request.getResponseHeader('uid'));
        window.location = '/'
      },
      error: (data) => {
        console.log(data)
      }
    });
  }

  render(){
    const divStyle = {
      width: '40%',
      marginLeft: '30%',
      marginTop: '10%'
    };
    return(
        <div style={divStyle}>
          <form onSubmit={this._handleSubmit}>
            <input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />
            <div className="form-group">
              <label for="investorEmail">Email address</label>
              <input type="email"  className="form-control" ref={input => this._email = input}
                     placeholder="Introduzca su email email"/>
            </div>
            <div className="form-group">
              <label for="investorName">Password</label>
              <input type="password"  ref={input => this._password = input} className="form-control"
                     placeholder="Introduzca su clave"/>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>
        </div>
    )
  }

}