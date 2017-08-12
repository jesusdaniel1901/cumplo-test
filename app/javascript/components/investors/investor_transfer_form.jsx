import React from 'react'
import jQuery from 'Jquery'

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      investors: [],
      amount: '',
      displayError: 'none',
      displayBuyerError: 'none',
      errorContent: '',
      selectBuyerErrorContent: ''
    };
    this._handleAmountChange = this._handleAmountChange.bind(this);
    this._handleBuyerChange = this._handleBuyerChange.bind(this);
  }

  componentWillMount() {
    this._fetchInvestors();
  }

  _fetchInvestors() {
    jQuery.ajax({
      method: 'GET',
      url: '/api/v1/investors',
      success: (investors) => {
        this.setState({ investors })
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

  _handleAmountChange(event){
    const re = /^[0-9\b]+$/;
    if (event.target.value == '' || re.test(event.target.value)) {

      this.setState({amount: event.target.value,displayError: 'none'})
      const investors = [...this.state.investors];
      const seller = investors.filter( investor => investor.id.toString() === this._seller.value.toString());

      if(parseFloat(event.target.value) > parseFloat(seller[0].stock)){
        this.setState({errorContent: 'El monto es superior al que esta en stocks',displayError: 'block'});
      }
      else {
        this.setState({errorContent: '',displayError: 'none'});
      }
    }
    else{
      this.setState({errorContent: 'Debe introducir solo numeros',displayError: 'block'});
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
              <select className="form-control"  ref={input => this._seller = input}>
                <option selected disabled>Seleccione un inversionista</option>
                {investorsOption}
              </select>
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
              <label for="nationality">Monto</label>
              <input type="text" value={this.state.amount} ref={input => this._nationality = input} className="form-control" key="nationality"
                     placeholder="Introduza el monto a vender" onChange={this._handleAmountChange}/>
              <span style={{display: this.state.displayError, color: 'red'}}>{this.state.errorContent}</span>
            </div>
            <button type="submit" className="btn btn-primary">Transferir</button>
          </form>
        </div>
    )
  }

}