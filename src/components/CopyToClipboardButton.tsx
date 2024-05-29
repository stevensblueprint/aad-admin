import Check from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Fade, IconButton, Tooltip } from "@mui/material";
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
    <Tooltip title="Copy link to clipboard">
      <IconButton onClick={handleClick}>
        {clicked ? (
          <Fade in={clicked}>
            <Check />
          </Fade>
        ) : (
          <ContentCopyIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default CopyToClipboardButton;
