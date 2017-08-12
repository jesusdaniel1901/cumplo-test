import React from 'react'
import jQuery from 'Jquery'
import InvestorForm from '../investors/investor_form'
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
      url: '/api/v1/investors',
      success: (investors) => {
        this.setState({ investors })
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
      },
      type: 'json',
      url: `/api/v1/investors/`,
      data: JSON.stringify({"name": name,"email": email, "nationality": nationality}),
      success: (investor) => {
        const newInvestor = {
          id: investor.id,
          name: investor.name,
          email: investor.email,
          nationality: investor.nationality
        };
        this.setState({
          investors: this.state.investors.concat([newInvestor])
        });
        window.location = '/'
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
    const investors = [...this.state.investors];
    const investorIndex = investors.indexOf(investor);
    investors.splice(investorIndex,1);

    this.setState({ investors });
  }

  _editInvestor(investor){
    // this.setState({ investorToEdit: investor });
    window.location = `/investors/${investor.id}/edit`
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
              <th>Name</th>
              <th>Email</th>
              <th>Nationality</th>
              <th>Actions</th>
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