/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type FirstName = string;
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
export type HaveYouEverHadAMentorBefore = boolean;

export interface Form {
  string?: FirstName;
  number?: Age;
  date?: DateOfBirth;
  email?: Email;
  phoneNumber?: PhoneNumber;
  arrayMultiple?: HowWouldYouBestDescribeYourselfPanAsianAmericanPreferred;
  arraySingle?: HowWouldYouBestDescribeYourself;
  boolean?: HaveYouEverHadAMentorBefore;
  [k: string]: unknown;
}
