import React from 'react'
import jQuery from 'Jquery'

export default class extends React.Component {

  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
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

  saveTokens(request){
    if(request.getResponseHeader('access-token') != null) {
      localStorage.setItem('access-token', request.getResponseHeader('access-token'));
      localStorage.setItem('client', request.getResponseHeader('client'));
      localStorage.setItem('expiry', request.getResponseHeader('expiry'));
      localStorage.setItem('token-type', request.getResponseHeader('token-type'));
      localStorage.setItem('uid', request.getResponseHeader('uid'));
    }
  }

  _editInvestor(investor){
    jQuery.ajax({
      method: 'PUT',
      headers: {
        "Content-Type": " application/json",
        "Accept": "application/json",
        "access-token": localStorage.getItem("access-token"),
        "client": localStorage.getItem("client"),
        "expiry": localStorage.getItem("expiry"),
        "token-type": localStorage.getItem("token-type"),
        "uid": localStorage.getItem("uid")
      },
      type: 'json',
      url: `/api/v1/investors/${investor.id}`,
      data: JSON.stringify({
        "name": this._name.value,
        "email": this._email.value,
        "nationality": this._nationality.value,
        "phone": this._phone.value,
        "address": this._address.value,
        "rut": this._rut.value,
        "stock": this._stock.value
      }),
      success: (data, textStatus, request) => {
        this.saveTokens(request);
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
        "access-token": localStorage.getItem("access-token"),
        "client": localStorage.getItem("client"),
        "expiry": localStorage.getItem("expiry"),
        "token-type": localStorage.getItem("token-type"),
        "uid": localStorage.getItem("uid")
      },
      type: 'json',
      url: `/api/v1/investors/`,
      data: JSON.stringify({
        "name": this._name.value,
        "email": this._email.value,
        "nationality": this._nationality.value,
        "phone": this._phone.value,
        "address": this._address.value,
        "rut": this._rut.value,
        "stock": this._stock.value
      }),
      success: (data, textStatus, request) => {
        this.saveTokens(request);
        window.location = '/'
      }
    });
  }

  _getLegalRepresentativesOptions() {
    return this.state.legalRepresentatives.map((legalRepresentative) => {
      return (
          <option value={legalRepresentative.id}>{legalRepresentative.full_name}</option>
      )
    });
  }

  render(){

    const legalRepresentatives = this._getLegalRepresentativesOptions()

    const divStyle = {
      width: '40%',
      marginLeft: '30%'
    };
    return(
        <div style={divStyle}>
          <form onSubmit={this._handleSubmit}>
            <div className="form-group">
              <label for="investorEmail">Email</label>
              <input type="email" defaultValue={this.props.investor != null ? this.props.investor.email : ''} className="form-control" ref={input => this._email = input}
                     placeholder="Introduzca email"/>
            </div>
            <div className="form-group">
              <label for="sel1">Seleccione el representante legal</label>
              <select className="form-control"  ref={input => this._legal_representative = input}>
                <option selected disabled>Seleccione un representante legal</option>
                {legalRepresentatives}
              </select>
            </div>
            <div className="form-group">
              <label for="investorName">Nombre</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.name : ''} ref={input => this._name = input} className="form-control"
                     placeholder="Introduzca name"/>
            </div>
            <div className="form-group">
              <label for="nationality">Nacionalidad</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.nationality : ''} ref={input => this._nationality = input} className="form-control"
                     placeholder="Introduzca nacionalidad"/>
            </div>
            <div className="form-group">
              <label for="nationality">Telefono</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.phone : ''} ref={input => this._phone = input} className="form-control"
                     placeholder="Introduzca telefono"/>
            </div>
            <div className="form-group">
              <label for="nationality">Direccion</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.address : ''} ref={input => this._address = input} className="form-control"
                     placeholder="Introduzca direccion"/>
            </div>
            <div className="form-group">
              <label for="nationality">Rut</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.rut : ''} ref={input => this._rut = input} className="form-control"
                     placeholder="Introduzca telefono"/>
            </div>
            <div className="form-group">
              <label for="nationality">Stock</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.stock : ''} ref={input => this._stock = input} className="form-control"
                     placeholder="Introduzca telefono"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    )
  }
}