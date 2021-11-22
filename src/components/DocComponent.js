import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Input, FormGroup, Button } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle, faDownload} from '@fortawesome/free-solid-svg-icons';

function Doc(props){

  class DocTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isSelectAll: true,
            numOfChecks: 0
        };
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectAllBoxes = this.selectAllBoxes.bind(this);
        this.selectBox = this.selectBox.bind(this);
    }

    handleSubmit(){
        if (this.state.numOfChecks > 1)
        alert(this.state.numOfChecks + ' Documents Downloaded');
        else if (this.state.numOfChecks === 1)
        alert(this.state.numOfChecks + ' Document Downloaded');
        else
        alert('No Documents Selected');
      }

          //selecting a checkbox
    selectBox(event){
        var numCount = this.state.numOfChecks;

        if(event.target.checked){
            numCount++;

            this.setState({numOfChecks : numCount});

        //numOfChecks++;       
        }
        else{
            numCount--;
            this.setState({numOfChecks : numCount});
        //numOfChecks--;
        }
    };

    toggleSelectAll(){

        this.setState({
            isSelectAll: !(this.state.isSelectAll)
        });

        this.selectAllBoxes();
    }  

    selectAllBoxes(){
        var numCount = this.state.numOfChecks;
        alert(numCount);

        var thisState = this;

        if(this.state.isSelectAll){
            //go through each docCheck checkbox via name
            $.each($('[name="docCheck"'), function (n, ele){
                //check unique checkbox id to make sure the checkbox is enabled and not already selected
                if($('#docCheck' + n).prop("disabled") === false && !$('#docCheck' + n).prop("checked")){
                    $('#docCheck' + n).prop("checked", true);
                  
                    numCount++;
                    thisState.setState({numOfChecks : numCount});
            

                }
            })
                
        }
        else{
            $.each($('[name="docCheck"'), function (n, ele){
                //check opposite conditions
                if($('#docCheck' + n).prop("disabled") === false && $('#docCheck' + n).prop("checked")){
                    $('#docCheck' + n).prop("checked", false);
                    
                    numCount--;
                    thisState.setState({numOfChecks : numCount});
                            
                    
                }
            })
        }
        
    } 


    docRow(doc, key, rowCount){

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
      var uniqueId = "docCheck" + rowCount;


      return (
        <tr>
            <th scope="row">
                <input type="checkbox" id={uniqueId} name="docCheck" disabled={disableCheck} onChange={this.selectBox}></input>
            </th>    
            <td>{doc.name}</td>
            <td>{doc.device}</td>
            <td>{doc.path}</td>
            <td>{status}</td>
       </tr>
        
      );
    }

       
    render() {
      const rows = [];
      var rowCount = 0;

      this.props.docs.forEach((doc) => {
        rows.push(
          this.docRow(doc,doc.name,rowCount)
        );
        rowCount++;

      });
      
      return (
        <div className="col-12"> 
            <div className="row">
                <div className="col-12 col-md-5">
                    <FormGroup check>
                        <Input type="checkbox" id="selectAll" onChange={this.toggleSelectAll} />
             
                        <span id="totalSelected">Selected {this.state.numOfChecks}</span>
                    </FormGroup>
                </div>
                <div className="col-12 col-md-5">    
                    <Button onClick={this.handleSubmit}><FontAwesomeIcon icon={faDownload}/> Download Selected</Button>
                </div>
            </div>
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
  
  