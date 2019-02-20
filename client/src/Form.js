import React, { Component } from 'react';
import './App.css';
// import axios from 'axios'

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


pleaseChange = (e)=>{
    this.setState({
        [e.target.name] : e.target.value
    })
}
  
pleaseSubmit = (e)=>{
    e.preventDefault();
    const data = this.state;
    console.log(data);
}

componentDidMount(){
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <form>
            <input type = 'text' name = 'name' value = {this.state.name} onChange={this.pleaseChange} /><br/><br/>
            <input type = 'number' name = 'phonenumber' value = {this.state.phonenumber} onChange={this.pleaseChange}/><br/><br/>
            <input type = 'email' name = 'email' value = {this.state.email} onChange={this.pleaseChange}/> <br/><br/>
            <input type = 'text' name = 'jobtitle' value = {this.state.jobtitle} onChange={this.pleaseChange} /><br/><br/>
            <input type = 'file' name = 'image' value = {this.state.image} onChange={this.pleaseChange}/> <br/><br/>
            <button onSubmit={this.pleaseSubmit}> Submit </button>
        </form>
      </div>
    );
  }
}

export default Form;