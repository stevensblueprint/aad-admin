import PersonIcon from "@mui/icons-material/Person";
import Avatar, { type AvatarProps } from "@mui/material/Avatar";

type AvatarWrapperProps = {
  src: string | null;
  alt: string;
} & Omit<AvatarProps, "src">;
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
