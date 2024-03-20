import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export type MentorProps = {
  preferredName: string;
};

const Mentor = ({ preferredName }: MentorProps) => {
  return (
    <div className="m-4 w-4/5 rounded-xl bg-white p-8">
      <p className="text-center text-3xl font-bold">Mentor</p>
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
        Information about matched Mentor for <i>{preferredName}</i> can be here
      </Box>
    </div>
  );
};

export default Mentor;
