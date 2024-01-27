import { Component } from "react";

class App extends Component {
    
    constructor() {
        super();
        this.state = {
            title: "",
            Description: ""
        }
        this.addTask = this.addTask.bind(this)
    }

    addTask(event) {
        console.log("")
        event.preventDefault()
    }

    handleChange(event) {
        console.log(event.target.value);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                           <div className="card-content">
                            <form onSubmit={this.addTask}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name="title" onChange={this.handleChange} type="text"  placeholder="Task Title"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea name="description" onChange={this.handleChange} placeholder="Task Descripcion" className="materialize-textarea"></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="btn light-blue darken-4">
                                    Send
                                </button>
                            </form>
                           </div> 

                        </div>
                    </div>
                    <div className="col s7" >

                    </div>
                </div>
            </div>
        )
    }
}