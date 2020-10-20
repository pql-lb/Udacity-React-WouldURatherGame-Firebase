import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { routing } from '../actions/create'
import { signIn } from '../actions/signup'
import { unansweredQuestions } from '../actions/unanswered'
import { answeredQuestions } from '../actions/answered'

class Login extends React.Component {
    createPage = () => {
        this.props.dispatch(routing(true))
    }
    login = (e) => {
        const user = document.getElementById("userList").value
        this.props.dispatch(signIn(this.props.receive[0][user].id))
        //Wait for user info before calling
        setTimeout(() => {this.props.dispatch(unansweredQuestions(this.props.questions, user, this.props.receive))}, 100)
        setTimeout(() => {this.props.dispatch(answeredQuestions(this.props.questions, user, this.props.receive))}, 200)
        this.props.log()
    }
    render () {
        
        const users = Object.values(this.props.receive[0])
       
        return (
            <div>
                <div className="signUp">
                    <h1 className="head">Would You Rather...</h1>
                    <h1>SignIn</h1>
                    <select id="userList">
                        
                        {users.map(x => {
                            return (
                                <option 
                                key={x.id}
                                value={x.id} 
                                >{x.id}</option>
                                )
                        })}

                    </select>
                    <div className="signIn">
                        <Link to="/create">
                            <button 
                            onClick={() => this.createPage()}
                            className="button userC">Create New User</button>
                        </Link>
                        <button className="button login" onClick={(e) => this.login(e)}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    signup: state.signup,
    receive: state.receive,
    questions: state.questions,
    unanswered: state.unanswered,
    answered: state.answered,
}))(Login)