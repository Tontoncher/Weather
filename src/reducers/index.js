// import {
//     GENERALS_MESSAGE_CREATOR,
// } from '../../constants/generals'

const initialState = {
    message: {type:'', text:''},
}


export default function generals (state = initialState, action) {

    switch(action.type) {

    		// case GENERALS_MESSAGE_CREATOR:
    		//     return {...state,
        //         message:action.message,
    		// 	  }

        default:
            return state
    }
}
