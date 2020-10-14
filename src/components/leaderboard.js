import React from 'react'
import { connect } from 'react-redux'
import dog from './images/avatars/dog.png';
import elephant from './images/avatars/elephant.png';
import monkey from './images/avatars/monkey.png';

class board extends React.Component {
    state = {
        tylermcginnis: elephant,
        sarahedo: dog,
        johndoe: monkey,        
    }
    render(){
        const leaderBoard = Object.values(this.props.receive[0]).map(x => {
            return {
                "name": x.name,
                "avatar": x.avatarURL,
                "ques": x.questions.length,
                "ans": Object.entries(x.answers).length,
                "id": x.id,
                "score": x.questions.length + Object.entries(x.answers).length
                }
            })
        
        const ordered = leaderBoard.sort(function(a, b){return b.score - a.score})
        const avatar = this.state

        return (
            <div className="central">
                {ordered.map(x => {
                    return (
                        <div key={x.id} className="leader">
                            ID: {x.id}
                            <br />
                            <img alt="avatar" className="image" src={avatar[x.id]} />
                            <br />
                            Name: {x.name}
                            <br />
                            Overall score: {x.score}
                            <br />
                            Questions created: {x.ques}
                            <br />
                            Questions answered: {x.ans}
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default connect((state) => ({
    receive: state.receive,
}))(board)