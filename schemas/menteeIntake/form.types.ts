/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type FirstName = string;
export type LastName = string;
export type Age = number;
export type DateOfBirth = string;
/**
 * This is for further communication on the Kin Mentorship Program next steps and will be shared with your Mentor/fellow Mentee after the matching process is complete plus AAD programming for 2023 and beyond
 */
export type Email = string;
/**
 * This information will be shared/used for when your Mentor reaches out to you and your fellow Mentee for scheduling the 4 additional meetings plus the AAD team may have to support in communication as needed
 */
export type PhoneNumber = string;
/**
 * this will be shared to both Volunteer Mentors and Q3 Mentees for networking purposes
 */
export type LinkedInProfile = string;
export type HowWouldYouBestDescribeYourselfPanAsianAmericanPreferred = (
  | "Hispanic or Latinx"
  | "American Indian or Alaskan Native"
  | "Pan Asian American"
  | "Native Hawaiian or Other Pacific Islander"
  | "Black or African American"
  | "White"
  | "Other"
)[];
export type HowWouldYouBestDescribeYourself =
  | "Asian Indian"
  | "Bangladeshi"
  | "Bhutanese"
  | "Burmese"
  | "Cambodian"
  | "Chinese"
  | "Filipino"
  | "Hmong"
  | "Indonesian"
  | "Japanese"
  | "Korean"
  | "Laotian"
  | "Malaysian"
  | "Mongolian"
  | "Nepalese"
  | "Okinawan"
  | "Pakistani"
  | "Sri Lankan"
  | "Taiwanese"
  | "Thai"
  | "Vietnamese"
  | "Other";
export type Gender = string;
/**
 * Preferred one of the following applies to you
 */
export type SelectWhichOptionSApplyToYou = unknown[];
export type WhatIsYourStateOfResidency =
  | "Alabama"
  | "Alaska"
  | "Arizona"
  | "Arkansas"
  | "California"
  | "Colorado"
  | "Connecticut"
  | "Delaware"
  | "Florida"
  | "Georgia"
  | "Hawaii"
  | "Idaho"
  | "Illinois"
  | "Indiana"
  | "Iowa"
  | "Kansas"
  | "Kentucky"
  | "Louisiana"
  | "Maine"
  | "Maryland"
  | "Massachusetts"
  | "Michigan"
  | "Minnesota"
  | "Mississippi"
  | "Missouri"
  | "Montana"
  | "Nebraska"
  | "Nevada"
  | "New Hampshire"
  | "New Jersey"
  | "New Mexico"
  | "New York"
  | "North Carolina"
  | "North Dakota"
  | "Ohio"
  | "Oklahoma"
  | "Oregon"
  | "Pennsylvania"
  | "Rhode Island"
  | "South Carolina"
  | "South Dakota"
  | "Tennessee"
  | "Texas"
  | "Utah"
  | "Vermont"
  | "Virginia"
  | "Washington"
  | "West Virginia"
  | "Wisconsin"
  | "Wyoming";
/**
 * Please answer in the format (years in college/total years expected in college). Ex. Junior is (3/4). This information will be shared with potential Mentors to support the matching process
 */
export type WhatYearOfCollegeAreYouIn = string;
/**
 * This information will be shared with potential Mentors to support the matching process
 */
export type WhatStateIsYourCollegeUniversityLocatedIn = string;
export type WhatCollegeUniversityDoYouAttend = string;
export type Major = string;
export type Minor = string;
export type WhatAreYouLookingForInAMentorAndOrSpecificallyWhatHelpGuidanceAreYouLookingForFromThemDuringThisQ3KinMentorshipProgramPleaseExplain =
  string;
export type HaveYouEverHadAMentorBefore = boolean;

export interface Form {
  firstName: FirstName;
  lastName: LastName;
  age: Age;
  dateOfBirth: DateOfBirth;
  email: Email;
  phoneNumber: PhoneNumber;
  linkedInProfile?: LinkedInProfile;
  ethnicityLevel1: HowWouldYouBestDescribeYourselfPanAsianAmericanPreferred;
  ethnicityLevel2: HowWouldYouBestDescribeYourself;
  gender: Gender;
  background: SelectWhichOptionSApplyToYou;
  stateOfResidency: WhatIsYourStateOfResidency;
  schoolYear: WhatYearOfCollegeAreYouIn;
  schoolState?: WhatStateIsYourCollegeUniversityLocatedIn;
  school: WhatCollegeUniversityDoYouAttend;
  major: Major;
  minor: Minor;
  expectations: WhatAreYouLookingForInAMentorAndOrSpecificallyWhatHelpGuidanceAreYouLookingForFromThemDuringThisQ3KinMentorshipProgramPleaseExplain;
  hadMentor: HaveYouEverHadAMentorBefore;
  [k: string]: unknown;
}
