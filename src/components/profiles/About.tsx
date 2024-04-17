import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export type AboutProps = {
  preferredName: string;
  bio: string;
};

const About = ({ preferredName, bio }: AboutProps) => {
  return (
    <div className="m-4 w-4/5 rounded-xl bg-white p-8">
      <p className="text-center my-1 text-3xl font-bold">About</p>
      <p className="text-xl my-1 font-light">Preferred Name</p>
      <Box
        component="span"
        sx={{
          display: "block",
          fontSize: 20,
          bgcolor: grey[200],
          m: 1,
          p: 1,
          borderRadius: 2,
        }}
      >
        {preferredName}
      </Box>
      <p className="text-xl font-light">Bio</p>
      <Box
        component="span"
        sx={{
          display: "block",
          fontSize: 20,
          bgcolor: grey[200],
          m: 1,
          p: 1,
          borderRadius: 2,
        }}
      >
        {bio}
      </Box>
    </div>
  );
};

export default About;
