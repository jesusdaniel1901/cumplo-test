import React from 'react'
import jQuery from 'Jquery'

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
      url: '/api/v1/investors',
      success: (investors) => {
        this.setState({ investors })
      }
    });
  }

  _getTableBody() {
    return this.state.investors.map((investor) => {
      return (
          <tr>
            <td>{investor.name}</td>
            <td>{investor.email}</td>
            <td>{investor.nationality}</td>
          </tr>)
    });
  }

  render() {
    const tableBody = this._getTableBody();
    console.log(tableBody);

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
            {tableBody}
            </tbody>
          </table>
        </div>
    )

  }
}