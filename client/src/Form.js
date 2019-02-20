import React, { Component } from 'react'

export default class Form extends Component {
    //Intial State
    state = {
        Name: '',
        PhoneNumber: '',
        Email: '',
        JobTitle: '',
        Image: ''
    };

    // setstate - change value based on user input
    change = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault(); 
        console.log(this.state);
    }
  render() {
    return (
      <div>
        <form>
            <input name = 'Name' placeholder = 'Name' value = {this.state.Name} onChange = {e => this.change(e)}  /> <br />
            <input name = 'PhoneNumber' placeholder = 'PhoneNumber' type = 'number' value = {this.state.PhoneNumber} onChange = {e => this.change(e)}  /> <br />
            <input name = 'Email' placeholder = 'Email' value = {this.state.Email} onChange = {e => this.change(e)}  /> <br />
            <input name = 'JobTitle' placeholder = 'JobTitle' value = {this.state.JobTitle} onChange = {e => this.change(e)}  /> <br />
            <input name = 'Image' placeholder = 'Name' type = 'file' value = {this.state.Image} onChange = {e => this.change(e)}  /> <br />
            <button onClick = {e => this.onSubmit(e)}> Submit </button> 
        </form>
      </div>
    )
  }
}
