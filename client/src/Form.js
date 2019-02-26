import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class Form extends Component {
  constructor(){
    super();
    this.state={
      name : "",
      nameError: "",
      phonenumber : "",
      phonenumberError: "",
      email : "",
      emailError: "",
      jobtitle: "",
      jobtitleError: "",
      image: "",
      imageError: "",
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

//for client side validation for user fields
validate = () => {
    let isError = false;
    const errors = {
        nameError: "",
        phonenumberError: "",
        emailError: "",
        jobtitleError: "",
        imageError: "",
    };

    if(this.state.name.length < 5) {
        isError = true;
        errors.nameError = "name must be atleast more than 5 characters";
    }

    if(this.state.email.indexOf('@') === -1) {
        isError = true;
        errors.nameError = "please enter a valid email address";
    }


    if(isError) {
        this.setState({
            ...this.state,
            ...errors
        });
    }

    return isError;
}
  
pleaseSubmit = (e)=>{
    e.preventDefault(); 
    const err = this.validate();
    if(!err){
        const data = this.state;
        console.log(data);
        this.setState ({
          name : "",
          phonenumber : "",
          email : "",
          jobtitle: "",
          image: "",
      });
    }
};

componentDidMount(){
    console.log(this.state)
  }


fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('name', this.state.name);
    fd.append('phonenumber', this.state.phonenumber);
    fd.append('email', this.state.email);
    fd.append('jobtitle', this.state.jobtitle);
    //console.log('beginning');
    fd.append('image', this.state.image);
    //console.log('ending');


    axios.post('/form', fd,
    {
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
            <input type = 'text' name = 'name' value = {this.state.name} onChange={this.pleaseChange} errorText={this.state.nameError} /><br/><br/>
            <input type = 'number' name = 'phonenumber' value = {this.state.phonenumber} onChange={this.pleaseChange} errorText={this.state.phonenumberError} /><br/><br/>
            <input type = 'email' name = 'email' value = {this.state.email} onChange={this.pleaseChange} errorText={this.state.emailError} /> <br/><br/>
            <input type = 'text' name = 'jobtitle' value = {this.state.jobtitle} onChange={this.pleaseChange} errorText={this.state.jobtitleError} /><br/><br/>
            <input type = 'file' name = 'image' 
            value = {this.state.image} onChange={this.pleaseChange} errorText={this.state.imageError} /> <br/><br/>
            {/* <button onClick={this.fileUploadHandler}> Upload </button> */}
            <button onClick={this.fileUploadHandler}> Submit </button>
        </form>
      </div>
    );
  }
}

export default Form;