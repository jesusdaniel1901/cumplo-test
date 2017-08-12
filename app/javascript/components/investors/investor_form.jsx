import React from 'react'
import jQuery from 'Jquery'

export default class extends React.Component {

  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._emailOnchange = this._emailOnchange.bind(this);
  }

  _handleSubmit(event) {
    event.preventDefault();

    if(this.props.investor != null){
      this._editInvestor(this.props.investor)
    }
    else {
      this._addInvestor()
    }

    this._name.value = '';
    this._email.value = '';
    this._nationality.value = '';
  }

  _editInvestor(investor){
    jQuery.ajax({
      method: 'PUT',
      headers: {
        "Content-Type": " application/json",
        "Accept": "application/json",
      },
      type: 'json',
      url: `/api/v1/investors/${investor.id}`,
      data: JSON.stringify({"name": this._name.value,"email": this._email.value, "nationality": this._nationality.value}),
      success: (investor) => {
        window.location = '/'
      }
    });
  }

  _addInvestor(){
    jQuery.ajax({
      method: 'POST',
      headers: {
        "Content-Type": " application/json",
        "Accept": "application/json",
      },
      type: 'json',
      url: `/api/v1/investors/`,
      data: JSON.stringify({"name": this._name.value,"email": this._email.value, "nationality": this._nationality.value}),
      success: (investor) => {
        window.location = '/'
      }
    });
  }

  _emailOnchange(event){
    console.log(event);
    this.props.investor.email = event.target.value;
    this._email.value = event.target.value
    // this.setState({email: event.target.value})
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
              <input type="email" defaultValue={this.props.investor != null ? this.props.investor.email : ''} className="form-control" ref={input => this._email = input} key="investorEmail" onChange={this._emailOnchange}
                     placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label for="investorName">Name</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.name : ''} ref={input => this._name = input} className="form-control" key="investorName"
                     placeholder="Enter name"/>
            </div>
            <div className="form-group">
              <label for="nationality">Nationility</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.nationality : ''} ref={input => this._nationality = input} className="form-control" key="nationality"
                     placeholder="Enter nationility"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    )
  }
}