import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
// ko dung hook redux
import { connect } from "react-redux";
import { increaseCounter, decreaseCounter } from "./action/actions";

/* sử dụng store.dispatch để bắn action
 *  import store mỗi khi sử dụng
 *  không linh hoạt và lặp code nhiều
 */
import store from "./redux/store";

// hook redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
/* redux hook useSelector bằng mapStateToProps
 *  redux hook useDispatch bằng mapDispatchToProps bản chất lấy ra dispatch nói cho redux
 *  biết fire 1 event 1 action
 */

// // khong dung hook redux
// function App(props) {

//   // event handler
//   const handleIncrease = () => {
//     //dispatch action
//     props.increaseCounter();

//     //fire action : dispatch =fire
//     // store.dispatch({
//     //   type: "tesst111111",
//     //   payload: { name: "nam" },
//     // });
//   };
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1>Hello world with React and Hoi Dan IT!</h1>
//         <div>Count: {props.count}</div>

//         <button onClick={() => handleIncrease()}>Increase Count</button>

//         <button onClick={() => props.decreaseCounter()}>Decrease Count</button>
//       </header>
//     </div>
//   );
// }

// // ket noi tu state cua redux cho vao props cua react
// //map state (redux store) + props react
// const mapStateToProps = (state) => {
//   return {
//     count: state.counter.count,
//   };
// };

// // map dispatch (redux) to props react
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // ten function muon goi toi
//     increaseCounter: () =>
//       dispatch(
//         // ten action muon goi toi
//         increaseCounter()
//       ),

//     decreaseCounter: () => dispatch(decreaseCounter()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);

function App(props) {
  //redux hook useDispatch bằng mapDispatchToProps bản chất lấy ra dispatch nói cho redux
  // biết fire 1 event 1 action
  const dispatch = useDispatch();
  //redux hook useSelector
  const newCount = useSelector((state) => {
    return state.counter.count;
  });
  // event handler
  const handleIncrease = () => {
    //dispatch action sử dụng redux hook useDispatch
    dispatch(increaseCounter());
  };

  const fetchAllUser = async () => {
    const res = await axios.get("http://localhost:8080/users/all");
    console.log(">>> check data axios:", res);
    const data = res && res.data ? res.data : [];
    
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello world with React and Hoi Dan IT!</h1>
        <div>Count: {newCount}</div>

        <button onClick={() => handleIncrease()}>Increase Count</button>

        <button onClick={() => dispatch(decreaseCounter())}>
          Decrease Count
        </button>
      </header>
    </div>
  );
}

export default App;
