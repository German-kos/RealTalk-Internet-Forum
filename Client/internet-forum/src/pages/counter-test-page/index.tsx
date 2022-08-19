import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  SelectCount,
} from "redux/slices/counterSlice";

function CounterTest() {
  const count = useSelector(SelectCount);
  const dispatch = useDispatch();
  return (
    <>
      <div>Hello from Counter Test</div>
      <div>Count: {count}</div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      <button onClick={() => dispatch(incrementByAmount(-5))}>-5</button>
    </>
  );
}
export default CounterTest;
