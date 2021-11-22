import React from 'react';
//import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Input, FormGroup, Card, CardBody, CardHeader, Button, Label } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle, faDownload} from '@fortawesome/free-solid-svg-icons';

function Doc(props){

    //will need to incorporate react router to better handle state later
    const state =({
        numOfChecks : 0
    })
          
  class DocRow extends React.Component {

    constructor(props) {
        super(props);
        this.selectBox = this.selectBox.bind(this);
       
    }

//selecting a checkbox
    selectBox(event){
        if(event.target.checked){
        //numOfChecks++;
        state.numOfChecks++;       
        }
        else{
        //numOfChecks--;
        state.numOfChecks--;
        }
    };

    render() {
      const doc = this.props.doc;
      var status = "";
      var disableCheck = true;

      if(doc.status === "available"){
          status = <span><FontAwesomeIcon icon={faCircle} color="green" /> {doc.status}</span>
          disableCheck = false;
      }
      else{
          status = doc.status;
          disableCheck = true;
      }

      return (
        <tr>
            <th scope="row">
                <input type="checkbox" name="docCheck" disabled={disableCheck} onChange={this.selectBox}></input>
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

    selectAllBoxes(){

    } 
    render() {
        
      return (

        <div className="row">
           <div className="col-12 col-md-5">
                <FormGroup check>
                <Input type="checkbox" id="selectAll" onSelect={this.selectAllBoxes} />
                
                <span id="totalSelected">Selected {state.numOfChecks}</span></FormGroup>
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
                    <div className="col-12"> 
                        <TopBar />   
                    </div>      
                    <div className="col-12">                
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
  
  