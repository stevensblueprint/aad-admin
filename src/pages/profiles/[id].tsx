import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Button,
  ButtonGroup,
  TextField,
  Avatar,
  Stack,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import type { Dispatch, MouseEvent, SetStateAction } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Chip from '@mui/material/Chip';
import universities from "./collegesAndUniversities.json";

type ButtonListProps = {
  roleName: string;
};

type SideBarProps = {
  selectedIndex: number;
  handleListItemClick: (
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => void;
};

const AvatarWrapper = ({ name, image }: { name: string; image: string }) => {
  if (image) {
    return <Avatar alt={name} src={image} />;
  }

  return (
    <div className="flex flex-row items-center">
      <Avatar>{name.charAt(0)}</Avatar>
      <h1 className="font-4xl font-sans">Hi, {name}!</h1>
    </div>
  );
};

const ButtonsList = ({ roleName }: ButtonListProps) => {
  if (roleName == "MENTEE") {
    return (
      <ButtonGroup size="large" aria-label="Large button group">
        <Button>About</Button>
        <Button>Work</Button>
        <Button>Activity</Button>
        <Button>Mentors</Button>
      </ButtonGroup>
    );
  } else if (roleName == "MENTOR") {
    return (
      <ButtonGroup size="large" aria-label="Large button group">
        <Button>About Us</Button>
        <Button>AAD Programs</Button>
        <Button>AAD Open</Button>
        <Button>Donate</Button>
        <Button>Login</Button>
      </ButtonGroup>
    );
  }
};

const Sidebar = ({ selectedIndex, handleListItemClick }: SideBarProps) => {
  return (
    <div className="col-span-1 flex basis-1/4 flex-col p-3">
      <h1 className="text-center text-4xl text-white">Settings</h1>
      <List component="nav" aria-label="main" className="bg-white">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          className="m-1"
        >
          <ListItemIcon>
            <div>A</div>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          className="m-1"
        >
          <ListItemIcon>
            <div>D</div>
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItemButton>
      </List>
    </div>
  );
};

const EditProfile = ({
  userData,
  editMode,
  toggleEditMode,
}: {
  userData: any;
  editMode: boolean | undefined;
  toggleEditMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState(userData.profile.preferredName);
  const [email, setEmail] = useState(userData.email);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [biography, setBiography] = useState(userData.profile.bio);
  // const industries = [
  //   "Accounting",
  //   "Agriculture",
  //   "Architecture",
  //   "Biotechnology",
  //   "Business",
  //   "Chemical Engineering",
  //   "Civil Engineering",
  //   "Computer Science",
  //   "Economics",
  //   "Education",
  //   "Electrical Engineering",
  //   "Environmental Engineering",
  //   "Finance",
  //   "Healthcare",
  //   "Human Resources",
  //   "Information Technology",
  //   "Manufacturing",
  //   "Marketing",
  //   "Mechanical Engineering",
  //   "Retail",
  // ]

  return (
    <>
      <div className="flex flex-col justify-center">
        <h3 className="font-3xl text-black">Profile Information</h3>
        <TextField
          type="text"
          variant="outlined"
          color="primary"
          label="Full Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          fullWidth
          InputProps={{
            readOnly: !editMode,
          }}
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type="email"
          variant="outlined"
          color="primary"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          InputProps={{
            readOnly: !editMode,
          }}
          required
          sx={{ mb: 4 }}
        />
        <Textarea
          type="biography"
          variant="outlined"
          color="primary"
          label="Bio"
          onChange={(e) => setBiography(e.target.value)}
          value={biography}
          required
          fullWidth
          InputProps={{
            readOnly: !editMode,
          }}
          sx={{ mb: 4 }}
        />
        <TextField
          type="date"
          variant="outlined"
          color="primary"
          label="Date of Birth"
          onChange={(e) => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
          fullWidth
          required
          InputProps={{
            readOnly: !editMode,
          }}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 4 }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={universities}
          sx={{ mb: 4 }}
          renderInput={(params) => (
            <TextField {...params} label="College/University" />
          )}
        />

        {/* 
          Still need to include: 
          - Advanced MUI text area for Bio
          - Industry Chip Selector
          - ZOD validaton checks
        */}

        {editMode ? (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => toggleEditMode(false)}
            sx={{ width: 100, mx: "auto" }}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            onClick={() => toggleEditMode(true)}
            sx={{ width: 100, mx: "auto" }}
          >
            Edit
          </Button>
        )}
      </div>
    </>
  );
};

export default function ProfilePage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const router = useRouter();
  const { data, error, isLoading } = api.user.getById.useQuery({
    id: router.query.id as string,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (data.profile === null) {
    return <div>Error: User does not have a profile!</div>;
  }

  const handleListItemClick = (
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Head>
        <title>{data.profile.preferredName} -- AAD</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-midnight-sky to-aero">
        <div className="flex w-full flex-row">
          <Sidebar
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
          />
          <div className="flex min-h-screen flex-grow flex-col bg-gray-100 p-4">
            <Stack direction="row" spacing={2}>
              <h1 className="font-4xl font-sans">
                Hi, {data.profile.preferredName}!
              </h1>
              <AvatarWrapper
                name={data.profile.preferredName}
                image={data.image}
              />
            </Stack>
            <EditProfile
              userData={data}
              editMode={editMode}
              toggleEditMode={setEditMode}
            />
          </div>
        </div>
      </main>
    </>
  );
}
