import React from 'react'

export default class extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      investors: []
    };

  }

  componentWillMount() {
    this._fetchInvestors();
  }

  _fetchInvestors() {
    jQuery.ajax({
      method: 'GET',
      url: 'api/v1/investors',
      success: (investors) => {
        this.setState({ investors })
      }
    });
  }

  _getTableBody() {
    return this.state.investors.map((investor) => {
      return (
          <tr>
            <td>{investor.email}</td>
            <td>{investor.email}</td>
            <td>{investor.email}</td>
          </tr>)
    });
  }

  _getNames() {
    return this.state.investors.map((investor) => {
      return <th>{investor.name}</th>
    });
  }

  _getNationalities() {
    return this.state.investors.map((investor) => {
      return <th>{investor.nationality}</th>
    });
  }

  render() {

    // const names = this._getNames();
    // const nationalities = this._getNationalities();
    // const emails = this._getEmails();

    return (
        <div>
          <table className="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Nationality</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
            </tr>
            </tbody>
          </table>
        </div>
    )

  }
}