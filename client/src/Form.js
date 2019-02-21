import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class Form extends Component {
  constructor(){
    super();
    this.state={
      name : '',
      phonenumber : '',
      email : '',
      jobtitle: '',
      image: ''
    }
  }

  fileChange=(e)=>{
    console.log(e.target.files[0])
  }



pleaseChange = (e)=>{
    this.setState({
        [e.target.name] : e.target.value
    })
    
}
  
pleaseSubmit = (e)=>{
    e.preventDefault(); 
    const data = this.state;
    console.log(data);
    this.setState ({
        name :'',
        phonenumber :'',
        email :'',
        jobtitle:'',
        image:'',
    })
}

componentDidMount(){
    console.log(this.state)
  }


fileUploadHandler = () => {
    const data = new FormData();
    data.append('name', this.state.name);
    data.append('phonenumber', this.state.phonenumber);
    data.append('email', this.state.email);
    data.append('jobtitle', this.state.jobtitle);
    data.append('image', this.state.image);

    axios.post('/form', data, {
        onUploadProgress : ProgressEvent => {
            console.log('Upload Progress' +Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%')
        }
    })

.then(res => {
    console.log(res)
})
.catch((err) => {
    console.log("Error in Uploading ", err)
})
}



render() {
    return (
      <div className = 'Form'>
        <form onSubmit = {this.pleaseSubmit}>
            <input type = 'text' name = 'name' value = {this.state.name} onChange={this.pleaseChange} /><br/><br/>
            <input type = 'number' name = 'phonenumber' value = {this.state.phonenumber} onChange={this.pleaseChange}/><br/><br/>
            <input type = 'email' name = 'email' value = {this.state.email} onChange={this.pleaseChange}/> <br/><br/>
            <input type = 'text' name = 'jobtitle' value = {this.state.jobtitle} onChange={this.pleaseChange} /><br/><br/>
            <input type = 'file' name = 'image' value = {this.state.image} onChange={this.pleaseChange}/> <br/><br/>
            {/* <button onClick={this.fileUploadHandler}> Upload </button> */}
            <button onClick={e => this.fileUploadHandler(e)}> Submit </button>
        </form>
      </div>
    );
  }
}

export default Form;