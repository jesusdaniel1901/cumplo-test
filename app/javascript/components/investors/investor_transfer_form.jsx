import React from 'react'
import jQuery from 'jquery'

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      investors: [],
      amount: '',
      displayError: 'none',
      displayBuyerError: 'none',
      errorContent: '',
      selectBuyerErrorContent: '',
      selectSellerErrorContent: '',
      displaySellerError: 'none',
      submitDisable: true
    };
    this._handleAmountChange = this._handleAmountChange.bind(this);
    this._handleBuyerChange = this._handleBuyerChange.bind(this);
    this._handleSellerChange = this._handleSellerChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillMount() {
    this._fetchInvestors();
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

  _fetchInvestors() {
    jQuery.ajax({
      method: 'GET',
      url: '/api/v1/investors',
      headers: {
        "Content-Type": " application/json",
        "Accept": "application/json",
        "access-token": localStorage.getItem("access-token"),
        "client": localStorage.getItem("client"),
        "expiry": localStorage.getItem("expiry"),
        "token-type": localStorage.getItem("token-type"),
        "uid": localStorage.getItem("uid")
      },
      success: (data,textStatus, request) => {
        this.saveTokens(request);
        this.setState({ investors: data })
      },
      error: (data) => {
        this._showError(data);
      }
    });
  }

  _handleSubmit(event){
    event.preventDefault();
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
      url: `/api/v1/investors/transfer-stock`,
      data: JSON.stringify({ "seller_id": this._seller.value,"buyer_id": this._buyer.value, "stock": parseFloat(this._stock.value) }),
      success: (data, textStatus, request) => {
        this.saveTokens(request);
        window.location = '/'
      },
      error: (data) =>{
        this._showError(data);
      }
    });
  }

  _getInvestorsOptions() {
    return this.state.investors.map((investor) => {
      return (
          <option value={investor.id}>Investor: {investor.name} Stock: {investor.stock} </option>
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

  _handleAmountChange(event){
    const re = /^[0-9\b]+$/;
    if (event.target.value == '' || re.test(event.target.value)) {

      this.setState({amount: event.target.value,displayError: 'none',submitDisable: false})
      const investors = [...this.state.investors];
      const seller = investors.filter( investor => investor.id.toString() === this._seller.value.toString());

      if(parseFloat(event.target.value) > parseFloat(seller[0].stock)){
        this.setState({errorContent: 'El monto es superior al que esta en stocks',displayError: 'block',submitDisable: true});
      }
      else {
        this.setState({errorContent: '',displayError: 'none',submitDisable: false});
      }
    }
    else{
      this.setState({errorContent: 'Debe introducir solo numeros',displayError: 'block',submitDisable: true});
    }
  }

  _handleBuyerChange(event){
    if(this._seller.value.toString() === event.target.value.toString()){
      this.setState({selectBuyerErrorContent: 'No se puede transferir al mismo inversionista',displayBuyerError: 'block'});
    }
    else {
      this.setState({selectBuyerErrorContent: '',displayBuyerError: 'none'});
    }
  }

  _handleSellerChange(event){
    if(this._buyer.value.toString() === event.target.value.toString()){
      this.setState({selectSellerErrorContent: 'No se puede transferir al mismo inversionista',displaySellerError: 'block'});
    }
    else {
      this.setState({selectSellerErrorContent: '',displaySellerError: 'none'});
    }
  }

  render(){
    const divStyle = {
      width: '40%',
      marginLeft: '30%'
    };
    const investorsOption = this._getInvestorsOptions();
    return(
        <div style={divStyle}>
          <form onSubmit={this._handleSubmit}>
            <div className="form-group">
              <label for="sel1">Seleccione el vendedor</label>
              <select className="form-control"  ref={input => this._seller = input} onChange={this._handleSellerChange}>
                <option selected disabled>Seleccione un inversionista</option>
                {investorsOption}
              </select>
              <span style={{display: this.state.displaySellerError, color: 'red'}}>{this.state.selectSellerErrorContent}</span>
            </div>
            <div className="form-group">
              <label for="sel1">Seleccione el comprador</label>
              <select className="form-control"  ref={input => this._buyer = input} onChange={this._handleBuyerChange}>
                <option selected disabled>Seleccione un inversionista</option>
                {investorsOption}
              </select>
              <span style={{display: this.state.displayBuyerError, color: 'red'}}>{this.state.selectBuyerErrorContent}</span>
            </div>
            <div className="form-group">
              <label for="amount">Monto</label>
              <input ref={input => this._stock = input} type="text" value={this.state.amount} className="form-control" key="nationality"
                     placeholder="Introduza el monto a vender" onChange={this._handleAmountChange}/>
              <span style={{display: this.state.displayError, color: 'red'}}>{this.state.errorContent}</span>
            </div>
            <button type="submit" disabled={this.state.submitDisable} className="btn btn-primary">Transferir</button>
          </form>
        </div>
    )
  }

}