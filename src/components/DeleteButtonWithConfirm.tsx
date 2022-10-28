import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { FunctionComponent, useState } from "react";

interface Props {
  /** Callback to fire when the confirmation is clicked */
  onConfirm: () => void;
}

/**
 * Delete button that turns into a confirm or cancel button on click.  If the confirm is clicked, then the callback in
 * onConfirm will fire
 */
export const DeleteButtonWithConfirm: FunctionComponent<Props> = ({ onConfirm }) => {
  const [shouldShowConfirmation, setShouldShowConfirmation] = useState(false);

  if (shouldShowConfirmation) {
    return (
      <>
        <CancelIcon sx={{ cursor: "pointer" }} onClick={() => setShouldShowConfirmation(false)} />
        <CheckCircleOutlineIcon color="error" sx={{ cursor: "pointer" }} onClick={onConfirm} />
      </>
    );
  }

  return <DeleteIcon sx={{ cursor: "pointer" }} onClick={() => setShouldShowConfirmation(true)} />;
};