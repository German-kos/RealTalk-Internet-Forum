import { createSlice, configureStore } from "@reduxjs/toolkit";
//
//
function ReduxExample(){
    const counterSlice = createSlice({
        name: "counter",
        initialState: {
            value: 0,
    myName: "GK",
    },
    reducers: {
    incremented: (state) => {
        state.value += 1;
    },
    decremented: (state) => {
        state.value -= 1;
    },
    changeName: (state, str) => {
        state.myName = str
    },
    resetName: (state) => {
        state.myName = "GK"
    }
    },
    });
    //
    const {incremented, decremented, changeName, resetName} = counterSlice.actions
//
const store = configureStore({
    reducer: counterSlice.reducer
})
//
store.subscribe(()=> console.log(store.getState))
//
// store.dispatch(incremented())
// console.log(counterSlice.value)
// store.dispatch(incremented())
// store.dispatch(incremented())
// store.dispatch(decremented())
// store.dispatch(decremented())
//
// store.dispatch(changeName("German Kostiakov"))
// store.dispatch(changeName("Bill Gates"))
//
// store.dispatch(resetName());
// store.dispatch(changeName("Bill Gates"))
const incrementState =()=>{
    store.dispatch(incremented());
    console.log("I am +")
}
const decrementState =()=>{
    store.dispatch(decremented())
    console.log("I am -")
}
return(
    <div>

    <div>{store.getState().value}</div>
    <button onClick={()=>incrementState()}>+</button>
    <button onClick={()=>decrementState()}>-</button>

    </div>
)
}
export default ReduxExample;