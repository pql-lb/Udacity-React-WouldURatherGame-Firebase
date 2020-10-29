import { UNANSWERED } from '../actions/unanswered'
import { FORMAT } from '../actions/format'

export default function unanswered (state=[], action) {
    switch(action.type) {
        case UNANSWERED : 
            if (action.questionList !== null) {
                //Getting the relevant user
                let currentUserAnswers = Object.values(action.answeredQ[0]).filter(x => x.id === action.user)
                if (currentUserAnswers[0] !== undefined) {
                //Ids of users answered questions
                let userAnsList = Object.keys(currentUserAnswers[0].answers)
                let newQuestionList = []
                //Returns the objects of unanswered questions and updates state
                let notAnswered = userAnsList.map(y => {   
                    if (newQuestionList.length === 0) {
                        return newQuestionList = Object.values(action.questionList[0]).filter(x => x.id !== y)
                    } else {
                        return newQuestionList = newQuestionList.filter(x => x.id !== y)
                    }
                })
                let number = notAnswered.length - 1
                //Returns array of not answered questions
                //console.log(notAnswered[number])
                //Ordering by timestamp
                if (number > 0) {
                    const times = notAnswered[number].sort((a, b) => b.timestamp - a.timestamp)
                    return times.flat()
                } else {
                    return Object.values(action.questionList[0])
                }                
                }
            } else {
                return state = []
            }
            break;
        case FORMAT :
            let oldList = [...action.question, ...state]
            return oldList        
        default :
            return state
    }
}