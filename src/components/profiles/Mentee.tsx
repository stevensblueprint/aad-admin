import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export type MenteeProps = {
  preferredName: string;
};

const Mentee = ({ preferredName }: MenteeProps) => {
  return (
    <div className="m-4 w-4/5 rounded-xl bg-white p-8">
      <p className="text-center my-1 text-3xl font-bold">Mentees</p>
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
        Information about matched Mentees for <i>{preferredName}</i> can be here
      </Box>
    </div>
  );
};

export default Mentee;
