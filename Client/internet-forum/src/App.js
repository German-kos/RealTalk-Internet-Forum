import "./App.css";
import TestingPage from "./Test/TestingPage";
import { useSelector, useDispatch } from "react-redux";
//
import { increment, decrement } from "./Redux/Actions";
//
function App() {
	const counter = useSelector((state) => state.counter);
	const isLogged = useSelector((state) => state.isLogged);
	const dispatch = useDispatch();
	//
	return (
		<div>
			<h1>Counter: {counter}</h1>
			<button onClick={() => dispatch(increment(2))}>+</button>
			<button onClick={() => dispatch(decrement(5))}>-</button>
			<h1>Is Logged: {isLogged.toString()}</h1>
		</div>
	);
}

export default App;
