import React, { type Dispatch, type SetStateAction } from "react";
import { Tab, Tabs } from "@mui/material";

export type TabListProps = {
  roleName: string;
  section: string;
  setSection: Dispatch<SetStateAction<string>>;
};

const TabList = ({ roleName, section, setSection }: TabListProps) => {
  const handleChange = (event: React.SyntheticEvent, newAlignment: string) => {
    setSection(newAlignment);
  };

  const menteeTabs = [
    <Tab label="About" value="about" key="about" />,
    <Tab label="Mentor" value="mentor" key="mentor" />,
  ];

  const mentorTabs = [
    <Tab label="About" value="about" key="about" />,
    <Tab label="Mentees" value="mentee" key="mentee" />,
  ];

  let selectedTabs = [];

  if (roleName == "MENTEE") {
    selectedTabs = menteeTabs;
  } else if (roleName == "MENTOR") {
    selectedTabs = mentorTabs;
  } else {
    selectedTabs = [<Tab label="About" value="about" key="about" />];
  }

  return (
    <div className="m-4 rounded-xl bg-white p-2">
      <Tabs value={section} onChange={handleChange}>
        {selectedTabs}
      </Tabs>
    </div>
  );
};

export default TabList;
