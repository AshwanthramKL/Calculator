import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./styles.css";
import { stat } from "fs";

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
  overwrite?: boolean;
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
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
    case ACTIONS.ADD_DIGIT: {
      if (state.overwrite === true)
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      if (payload?.digit === "0" && state.currentOperand === "0") return state;
      if (payload?.digit === "." && state.currentOperand?.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload?.digit}`,
      };
    }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === null && state.previousOperand === null)
        return state;

      if (state.currentOperand === null) {
        return {
          ...state,
          operation: payload?.operation,
        };
      }
      if (state.previousOperand === null || state.previousOperand === "")
        return {
          ...state,
          operation: payload?.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload?.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR: {
      return initialState;
    }

    case ACTIONS.EVALUATE: {
      if (
        state.currentOperand === null ||
        state.previousOperand === null ||
        state.operation === null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        currentOperand: evaluate(state),
        operation: null,
      };
    }
    default:
      return state;
  }
}

function evaluate({
  currentOperand,
  previousOperand,
  operation,
}: OperandState) {
  let prev: number = previousOperand ? parseFloat(previousOperand) : 0;
  let current: number = currentOperand ? parseFloat(currentOperand) : 0;

  if (isNaN(prev) || isNaN(current)) {
    return "";
  }

  let computation = "";
  switch (operation) {
    case "+":
      computation = `${prev + current}`;
      break;

    case "-":
      computation = `${prev - current}`;
      break;

    case "*":
      computation = `${prev * current}`;
      break;

    case "÷":
      computation = `${prev / current}`;
      break;
  }
  return computation;
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
      <button
        className="span-two"
        onClick={() =>
          dispatch({
            type: ACTIONS.EVALUATE,
            payload: { operation: "", digit: "" },
          })
        }
      >
        =
      </button>
    </div>
  );
}

export default App;
