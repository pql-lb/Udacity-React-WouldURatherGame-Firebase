import React from 'react'
import { connect } from 'react-redux'
import { getData } from '../actions/receive'
import { getQues } from '../actions/questions'
import { Route, Link, Redirect, useLocation, useHistory } from 'react-router-dom'
import HomeList from './answered'
import { signIn, signOut } from '../actions/signup'
import { unansweredQuestions } from '../actions/unanswered'
import { answeredQuestions } from '../actions/answered'
import '../index.css'
import Login from './login'
import Error from './error'
import AnsweredLink from './theLink'
import addQuestion from './addQuestion'
import board from './leaderboard'
import CreateUser from './create'


class App extends React.Component {

    componentDidMount () {
        this.props.dispatch(getData())
        this.props.dispatch(getQues())
    }

    login = (e) => {
        const user = document.getElementById("userList").value
        this.props.dispatch(signIn(this.props.receive[0][user].id))
        //Wait for user info before calling
        setTimeout(() => {this.props.dispatch(unansweredQuestions(this.props.questions, this.props.signup, this.props.receive))}, 500)
        setTimeout(() => {this.props.dispatch(answeredQuestions(this.props.questions, this.props.signup, this.props.receive))}, 500)
        this.setState(() => ({
            redirect: true,
        }))
    }

    logout = (e) => {
        this.props.dispatch(signOut(null))
        this.props.dispatch(unansweredQuestions(null))
        this.props.dispatch(answeredQuestions(null))
    }

    state = {
        redirect: false,
    }

    render() {
        const { signup } = this.props
        const { loading } = this.props
        const { create } = this.props
        //const { from } = this.props.location.state || { from: { pathname: '/' } }

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.signup !== null
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                  }} />
            )} />
        )
        
        if (loading === true) {
        return (
            <div>Loading</div>
            )
        }  else {       
            if (signup === null) {
                return (       
                    <div>



                        <Route exact path='/' render={() => <Login login={this.login} />} />
                        <Route path='/create' component={CreateUser} />
                        <PrivateRoute path="/leaderboard" component={board} />


                        
                    </div>
                )}      
                else { 
                    return (
                        <div> 

                            <div className="welcome">
                                <h1>Welcome {signup} </h1>
                                <Link to="/"><button className="button">Home</button></Link>
                                <Link to="/leaderboard">
                                    <button className="button">Leaderboard</button>
                                </Link>
                                <Link to="/add">
                                    <button className="button">Add question</button>
                                </Link>
                                <Link to="/">
                                    <button className="button" onClick={(e) => this.logout(e)}>Log Out</button>
                                </Link>
                            </div>
                        
                            <Route exact path='/' render={() => (         
                                <div>
                                  <HomeList />
                                  <div className="center">
                                  </div>
                                </div>
                            )} />
            
                            <Route path='/question/:value' component={AnsweredLink} />
                            <Route path='/add' component={addQuestion} />
                            <Route path='/leaderboard' component={board} />
                            
                        </div>
                    )
                }   
            }
    }
}


export default connect((state) => ({
    signup: state.signup,
    receive: state.receive,
    questions: state.questions,
    unanswered: state.unanswered,
    answered: state.answered,
    loading: state.loading,
    create: state.create
}))(App)