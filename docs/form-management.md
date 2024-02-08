# Form Management

The goal of this document is to provide the reasoning and implementation of the form management system we will be implementing for AAD.

## Concepts

- Form: A form (type) is two schema files, one for the form itself, and one for the UI that is given to JSONForms library.

- Collection: A collection is a instance of a form. These can be created by ADMIN roles in order to use the form schemas and get responses. A collection has a foreign key to a form.

- Submission: A submission is a response to a form. It contains the JSON object of the data that was submitted. It has a foreign key to a collection. Each user can have one submission in a collection, and a collection has many submissions.

## Implementation

We have tables for forms, collections, and submissions. The forms table contains the schema for the form and the UI schema. The collections table contains the foreign key to the form, and the user who created the collection. The submissions table contains the foreign key to the collection, the user who submitted the form, and the JSON object of the data. This can all be seen in the /prisma/schema.prisma file.

To make editing forms easier and to support future possibilities of editing the form in the browser or the file itself, right now we are storing the form schemas in the /src/schemas folder. The name of the folders in that folder are the forms, and in each folder there should be a form.schema.json, and a uiSchema.json. These can be loaded into the database by running `pnpm run db:forms`.
