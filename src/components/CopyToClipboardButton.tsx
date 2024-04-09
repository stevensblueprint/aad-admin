import { Fade, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Check from "@mui/icons-material/Check";
import { useState } from "react";

interface CopyToClipboardButtonProps {
  link: string;
}

const CopyToClipboardButton = ({ link }: CopyToClipboardButtonProps) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    void navigator.clipboard.writeText(link);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 2000);
  };
  return (
    <IconButton onClick={handleClick}>
      {clicked ? (
        <Fade in={clicked}>
          <Check />
        </Fade>
      ) : (
        <ContentCopyIcon />
      )}
    </IconButton>
  );
};

export default CopyToClipboardButton;
