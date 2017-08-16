import React from 'react'

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

 _handleDelete(event){
   event.preventDefault();
   if(confirm('Are you sure?')){
     this.props.onDelete(this.props.investor)
   }
 }

 _handleEdit(event){
   event.preventDefault();
   this.props.onEdit(this.props.investor)
 }

  render(){
    return(
        <tr>
          <td>{this.props.investor.name}</td>
          <td>{this.props.investor.legal_representative.full_name}</td>
          <td>{this.props.investor.email}</td>
          <td>{this.props.investor.nationality}</td>
          <td>{this.props.investor.rut}</td>
          <td>{this.props.investor.address}</td>
          <td>{this.props.investor.phone}</td>
          <td>{this.props.investor.stock}</td>
          <td>
            <button style={{marginRight: '3%'}} onClick={this._handleEdit.bind(this)} className="btn btn-primary">Edit</button>
          </td>
          <td>
            <button onClick={this._handleDelete.bind(this)} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    )
  }


}