class StableMatching {
  menteeList: string[];
  mentorList: string[];
  menteePreferences: { [key: string]: string[] };
  mentorPreferences: { [key: string]: string[] };

  constructor(menteeList: string[], mentorList: string[], menteePreferences: { [key: string]: string[] }, mentorPreferences: { [key: string]: string[] }) {
      this.menteeList = menteeList;
      this.mentorList = mentorList;
      this.menteePreferences = menteePreferences;
      this.mentorPreferences = mentorPreferences;
  }

  findStableMatch(): { [key: string]: string } {
      const engagements: { [key: string]: string } = {};
      const mentorsEngaged: { [key: string]: boolean } = {};
      
      // Initialize all mentees as free
      const freeMentees = [...this.menteeList];

      while (freeMentees.length > 0) {
          const mentee = freeMentees.shift()!;
          const preferences = this.menteePreferences[mentee];

          if (preferences) {
              for (const mentor of preferences) {
                  if (!mentorsEngaged[mentor]) {
                      engagements[mentee] = mentor;
                      mentorsEngaged[mentor] = true;
                      break;
                  } else {
                      const currentMentee = engagements[mentor];
                      const mentorPreferences = this.mentorPreferences[mentor];

                      if (mentorPreferences && mentorPreferences.indexOf(mentee) < mentorPreferences.indexOf(currentMentee!)) {
                          delete engagements[currentMentee!];
                          engagements[mentee] = mentor;
                          freeMentees.push(currentMentee!);
                          break;
                      }
                  }
              }
          }
      }

      return engagements;
  }
}

// Example usage:
const mentees = ["Mentee1", "Mentee2", "Mentee3"];
const mentors = ["Mentor1", "Mentor2", "Mentor3"];

const menteePreferences = {
  "Mentee1": ["Mentor1", "Mentor2", "Mentor3"],
  "Mentee2": ["Mentor2", "Mentor1", "Mentor3"],
  "Mentee3": ["Mentor1", "Mentor2", "Mentor3"]
};

const mentorPreferences = {
  "Mentor1": ["Mentee1", "Mentee2", "Mentee3"],
  "Mentor2": ["Mentee2", "Mentee1", "Mentee3"],
  "Mentor3": ["Mentee1", "Mentee2", "Mentee3"]
};

const matcher = new StableMatching(mentees, mentors, menteePreferences, mentorPreferences);
const stableMatches = matcher.findStableMatch();
console.log("Stable Matches:", stableMatches);
