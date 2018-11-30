import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {loadAllMessages} from './redux/actions';


class Message extends Component {
    render(){
        return(
            <div className="message">
                {this.props.content}
            </div>
        );
    }
}


class HomePage extends Component {
    constructor(props){
        super(props);
        this.sendSomeData = this.sendSomeData.bind(this)
        this.updateMessage = this.updateMessage.bind(this)
        this.state = {
            content: null,
            messageValue: '',
        };
    }

    updateMessage(e){
        this.setState({
            messageValue: e.target.value,
        })
    }

    sendSomeData(){
        axios({
            method : 'POST',
            url: '/api/sendmessage',
            data: {
                message: this.state.message
            }

        })
        .then((res)=> {
            console.log(res)
        }).catch((e) =>{
            console.log(e);
        });
        this.setState({
            messageValue: '',
        })
    }

    componentDidMount(){
        axios.get('/api/messages')
        .then((res)=>{
            console.log(res.data)
            this.props.loadAllMessages(res.data);
        }).catch((e)=>{
            console.log(e);
        });
    }

    render() {
        return (
            <div className="content-area">
                {this.state.content}
                <div className="messages">
                {
                this.props.messages.map((messageData,i ) => <Message key={i} content={messageData}/>)
                //    JSON.stringify(this.props.messages)
               }
                </div>
            <input value={this.state.messageValue} onChnage={this.updateMessage}/>
            <button onClick={this.sendSomeData}> Send some post data</button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        messages: state.testReducer.messages,
    };
};


const mapDispatchToProps = {loadAllMessages};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);