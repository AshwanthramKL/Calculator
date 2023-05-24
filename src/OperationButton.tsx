import { ACTIONS } from "./App";
import { Dispatch } from "react";

interface OperationButtonProps {
  dispatch: Dispatch<any>;
  operation: string;
}

export default function OperationButton({
  dispatch,
  operation,
}: OperationButtonProps) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
