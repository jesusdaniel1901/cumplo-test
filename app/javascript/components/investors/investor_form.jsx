import React from 'react'
import jQuery from 'jquery'

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      legalRepresentatives: [],
      displayEmailError: 'none',
      emailErrorContent: '',
      displayLegalRepresentativeError: 'none',
      legalRepresentativeErrorContent: '',
      displayRutError: 'none',
      rutErrorContent: '',
      displayStockError: 'none',
      stockErrorContent: '',
      displayNameError: 'none',
      displayNameContent: ''
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._getLegalRepresentativesOptions = this._getLegalRepresentativesOptions.bind(this);
    this._handleEmailChange = this._handleEmailChange.bind(this);
    this._checkLegalRepresentative = this._checkLegalRepresentative.bind(this);
    this._handleNameBlur = this._handleNameBlur.bind(this);
    this._handleRutBlur = this._handleRutBlur.bind(this);
    this._handleStockChange = this._handleStockChange.bind(this);
  }

  componentWillMount() {
    this._fetchLegalRepresentatives();
  }

  _fetchLegalRepresentatives(){
    jQuery.ajax({
      method: 'GET',
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
      url: '/api/v1/legal_representatives',
      success: (data, textStatus, request) => {
        this.saveTokens(request);
        this.setState({ legalRepresentatives: data })
      },
      error: (data) =>{
        this._showError(data);
      }
    });
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
    console.log(request.getResponseHeader('access-token'))
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
        "stock": this._stock.value,
        "legal_representative_id": this._legalRepresentative.value
      }),
      success: (data, textStatus, request) => {
        this.saveTokens(request);
        window.location = '/'
      },
      error: (data) =>{
        this._showError(data);
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
        "stock": this._stock.value,
        "legal_representative_id": this._legalRepresentative.value
      }),
      success: (data, textStatus, request) => {
        this.saveTokens(request);
        window.location = '/'
      },
      error: (data) => {
        this._showError(data);
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

  _showError(data){
    if(data.responseJSON.errors[0] == 'Bad request just for admins users') {
      window.location = 'admin/login';
      alert('Bad request just for admins users');
    }
    else{
      var errorString = "";
      data.responseJSON.errors.forEach(function (value,index,array) {
        console.log('value ' + value+ ' '+ index)
        errorString = errorString + value + ' ';
      });
      alert(errorString);
    }
  }

  _handleEmailChange(event){
    console.log('name '+this._name.value);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(this._email.value)){
      this.setState({
        displayEmailError: 'none',
        emailErrorContent: ''
      })
    }
    else{
      this.setState({
        displayEmailError: 'block',
        emailErrorContent: 'Debe introducir un email valido'
      })
    }
  }



  _checkLegalRepresentative(){
    if(this._legalRepresentative.value == 'Seleccione un representante legal'){
      this.setState({
        displayLegalRepresentativeError: 'block',
        legalRepresentativeErrorContent: 'Debe seleccionar un representate legal'
      })
    }
    else {
      this.setState({
        displayLegalRepresentativeError: 'none',
        legalRepresentativeErrorContent: 'block'
      })
    }
  }

  _handleNameBlur(){
    if(this._name.value == ''){
      this.setState({
        displayNameError: 'block',
        nameErrorContent: 'Debe seleccionar un nombre'
      })
    }
    else {
      this.setState({
        displayNameError: 'none',
        nameErrorContent: ''
      })
    }
  }

  _handleRutBlur(){
    if(this._rut.value == ''){
      this.setState({
        displayRutError: 'block',
        rutErrorContent: 'Debe seleccionar un rut'
      })
    }
    else {
      this.setState({
        displayRutError: 'none',
        rutErrorContent: ''
      })
    }
  }

  _handleStockChange(){
    if(this._stock.value == ''){
      this.setState({
        displayStockError: 'block',
        stockErrorContent: 'Debe seleccionar un stock valido'
      })
    }
    else {
      this.setState({
        displayStockError: 'none',
        stockErrorContent: ''
      })
    }
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
              <label>Email</label>
              <input type="email" defaultValue={this.props.investor != null ? this.props.investor.email : ''} className="form-control" ref={input => this._email = input} onBlur={this._handleEmailChange}
                     placeholder="Introduzca email"/>
              <span style={{display: this.state.displayEmailError, color: 'red'}}>{this.state.emailErrorContent}</span>
            </div>
            <div className="form-group">
              <label >Seleccione el representante legal</label>
              <select className="form-control"  ref={input => this._legalRepresentative = input}>
                <option selected disabled>Seleccione un representante legal</option>
                {legalRepresentatives}
              </select>
              <span style={{display: this.state.displayLegalRepresentativeError, color: 'red'}}>{this.state.legalRepresentativeErrorContent}</span>
            </div>
            <div className="form-group">
              <label >Nombre</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.name : ''} ref={input => this._name = input} className="form-control" onBlur={this._handleNameBlur}
                     placeholder="Introduzca name"/>
              <span style={{display: this.state.displayNameError, color: 'red'}}>{this.state.nameErrorContent}</span>
            </div>
            <div className="form-group">
              <label >Nacionalidad</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.nationality : ''} ref={input => this._nationality = input} className="form-control"
                     placeholder="Introduzca nacionalidad"/>
            </div>
            <div className="form-group">
              <label >Telefono</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.phone : ''} ref={input => this._phone = input} className="form-control"
                     placeholder="Introduzca telefono"/>
            </div>
            <div className="form-group">
              <label >Direccion</label>
              <input type="text" defaultValue={this.props.investor != null ? this.props.investor.address : ''} ref={input => this._address = input} className="form-control"
                     placeholder="Introduzca direccion"/>
            </div>
            <div className="form-group">
              <label >Rut</label>
              <input type="text" onBlur={this._handleRutBlur} defaultValue={this.props.investor != null ? this.props.investor.rut : ''} ref={input => this._rut = input} className="form-control" readOnly={this.props.investor != null ? 'readonly' : ''}
                     placeholder="Introduzca rut"/>
            </div>
            <span style={{display: this.state.displayRutError, color: 'red'}}>{this.state.rutErrorContent}</span>
            <div className="form-group">
              <label >Stock</label>
              <input type="text" onChange={this._handleStockChange} defaultValue={this.props.investor != null ? this.props.investor.stock : ''} ref={input => this._stock = input} className="form-control"
                     placeholder="Introduzca stock"/>
              <span style={{display: this.state.displayStockError, color: 'red'}}>{this.state.stockErrorContent}</span>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    )
  }
}