import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./styles.css";

// interfaces
interface payloadData {
  operation: string;
  digit: string;
}

interface ActionData {
  type: string;
  payload: payloadData;
}
interface OperandState {
  currentOperand: string;
  previousOperand: string;
  operation: string;
}

// Constants

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  DELETE_DIGIT: "delte-digit",
  EVALUATE: "evaluate",
};

const initialState: OperandState = {
  currentOperand: "",
  previousOperand: "",
  operation: "",
};

// reducer function
function reducer(
  state: OperandState,
  { type, payload }: ActionData
): OperandState {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CLEAR:
      return initialState;

    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => {
          dispatch({
            type: ACTIONS.CLEAR,
            payload: { operation: "", digit: "" },
          });
        }}
      >
        AC
      </button>
      <button>DEL</button>
      <OperationButton dispatch={dispatch} operation="÷" />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} operation="*" />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} operation="+" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="-" />
      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
