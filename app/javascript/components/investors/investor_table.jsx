import React from 'react'
import jQuery from 'Jquery'
import InvestorRow from '../investors/investor_row'

export default class extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      investors: [],
      investorToEdit: null
    };
    this._addInvestor = this._addInvestor.bind(this);
    this._deleteInvestor = this._deleteInvestor.bind(this);
  }

  componentWillMount() {
    this._fetchInvestors();
  }

  _fetchInvestors() {
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
      url: '/api/v1/investors',
      success: (data, textStatus, request) => {
        this._saveTokens(request);
        this.setState({ investors: data })
      },
      error: (data) => {
        this._showError(data);
      }
    });
  }

  _getTableBody() {
    return this.state.investors.map((investor) => {
      return (
          <InvestorRow key={investor.id} investor={investor} onDelete={this._deleteInvestor.bind(this)} onEdit={this._editInvestor.bind(this)} />
          )
    });
  }

  _addInvestor(name, email,nationality) {

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
      data: JSON.stringify({"name": name,"email": email, "nationality": nationality}),
      success: (data,textStatus, request) => {
        const newInvestor = {
          id: data.id,
          name: data.name,
          email: data.email,
          nationality: data.nationality
        };
        this.setState({
          investors: this.state.investors.concat([newInvestor])
        });
        window.location = '/'
        this._saveTokens(request)
      },
      error: (data) => {
      this._showError(data);
    }
    });

    const investor = {
      id: 10,
      name: name,
      email: email,
      nationality: nationality
    };

    this.setState({
      investors: this.state.investors.concat([investor])
    });
  }

  _deleteInvestor(investor){
    jQuery.ajax({
      method: 'DELETE',
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
      success: (data,textStatus, request) => {
        const investors = [...this.state.investors];
        const investorIndex = investors.indexOf(investor);
        investors.splice(investorIndex,1);
        this.setState({ investors });
        this._saveTokens(request);
        window.location = '/';
      },
      error: (data) => {
        this._showError(data);
      }
    });

  }

  _editInvestor(investor){
    window.location = `/investors/${investor.id}/edit`
  }

  _saveTokens(request){
    console.log(request.getResponseHeader('access-token'));
    if(request.getResponseHeader('access-token') != null) {
      console.log('entre aqui');
      localStorage.setItem('access-token', request.getResponseHeader('access-token'));
      localStorage.setItem('client', request.getResponseHeader('client'));
      localStorage.setItem('expiry', request.getResponseHeader('expiry'));
      localStorage.setItem('token-type', request.getResponseHeader('token-type'));
      localStorage.setItem('uid', request.getResponseHeader('uid'));
    }
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

  render() {
    const tableBody = this._getTableBody();
    return (
        <div>
          <a href="investors/transfer" style={{marginTop: '2%', marginLeft: '2%'}} className="btn btn-primary pull-left">Transfer stock</a>
          <a href="investors/new" style={{marginTop: '2%', marginRight: '2%'}} className="btn btn-primary pull-right">Create a new investor</a>
          <table className="table">
            <thead>
            <tr>
              <th>Nombre</th>
              <th>Representante Legal</th>
              <th>Email</th>
              <th>Nacionalidad</th>
              <th>Rut</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Stock</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
            </thead>
            <tbody>
            {tableBody}
            </tbody>
          </table>
        </div>
    )

  }
}