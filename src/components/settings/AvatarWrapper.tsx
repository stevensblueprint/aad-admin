import Avatar from "@mui/material/Avatar";
import { type AvatarProps } from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

type AvatarWrapperProps = {
  src: string;
  alt: string;
} & AvatarProps;

const AvatarWrapper = ({ src, alt, ...props }: AvatarWrapperProps) => {
  if (!src || src === "https://picsum.photos/200/128") {
    return (
      <Avatar alt={alt} {...props}>
        <PersonIcon sx={props.sx ? props.sx : null} />
      </Avatar>
    );
  }

  return <Avatar alt={alt} src={src} {...props} />;
};

export default AvatarWrapper;
