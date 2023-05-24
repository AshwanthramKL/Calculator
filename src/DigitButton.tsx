import { ACTIONS } from "./App";
import { Dispatch } from "react";

interface DigitButtonProps {
  dispatch: Dispatch<any>;
  digit: string;
}

export default function DigitButton({ dispatch, digit }: DigitButtonProps) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
