import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Input, FormGroup, Card, CardBody, CardHeader, Button, Label } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle, faDownload} from '@fortawesome/free-solid-svg-icons';

function Doc(props){

  class DocRow extends React.Component {
    render() {
      const doc = this.props.doc;
      const status = doc.status === "available" ?
      <span><FontAwesomeIcon icon={faCircle} color="green" />{doc.status}</span> : doc.status;
      return (
        <tr>
            <th scope="row">
                <input type="checkbox"></input>
            </th>    
            <td>{doc.name}</td>
            <td>{doc.device}</td>
            <td>{doc.path}</td>
            <td>{status}</td>
       </tr>
        
      );
    }
  }
  
  class DocTable extends React.Component {
    render() {
      const rows = [];
      
      this.props.docs.forEach((doc) => {
        rows.push(
          <DocRow
            doc={doc}
            key={doc.name} />
        );

      });
  
      return (
        <Table hover reponsive>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Device</th>
              <th>Path</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      );
    }
  }
  
  class TopBar extends React.Component {

    handleSubmit(){
        alert('Documents Downloaded');
      }
    render() {
      return (

        <div className="row">
           <div className="col-12 col-md-5">
                <FormGroup check>
                <Input type="checkbox" />
                
                <Label check>Selected</Label></FormGroup>
            </div>
            <div className="col-12 col-md-5">    
                <Button onClick={this.handleSubmit}><FontAwesomeIcon icon={faDownload}/> Download Selected</Button>
          </div>
        </div>

      );
    }
  }
  
  class FinalDocTable extends React.Component {
    render() {
      return (
        <div className="container">
 
                <div className="row-content">
                    <div className="col-12 col-md-5"> 
                        <TopBar />   
                    </div>      
                    <div className="col-12 col-md-5">                
                        <div className="row"><DocTable docs={this.props.docs} /></div> 
                    </div> 
            </div>

        </div>
        
      );
    }
  }
  
  
  const DOCS = [
        {name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled'},
        {name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},
        {name: 'uxtheme.dll', device: 'Lannister', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},
        {name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled'},
        {name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled'}
  ];
   
  return (
    <FinalDocTable docs={DOCS} />
  );
  }

  export default Doc;
  
  