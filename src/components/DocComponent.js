import React from 'react';
import { Table, Card, CardBody, CardHeader } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';

function Doc(props){

  class DocRow extends React.Component {
    render() {
      const doc = this.props.doc;
      const status = doc.status === "available" ?
      <span><FontAwesomeIcon icon={faCircle} color="green" /> {doc.status}</span> : doc.status;
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
        <Table bordered="true" hover="true" responsive="true">
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
    render() {
      return (
        <form>
          <p>
            <input type="checkbox" /> Selected
          </p>
          Download Selected
        </form>
      );
    }
  }
  
  class FinalDocTable extends React.Component {
    render() {
      return (
        <div className="container">
            <div className="row row-content">
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-black"><TopBar /></CardHeader>
                        <CardBody>
                            <DocTable docs={this.props.docs} />
                        </CardBody>
                    </Card>
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
  
  