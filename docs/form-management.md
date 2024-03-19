# Form Management

The goal of this document is to provide the reasoning and implementation of the
form management system we will be implementing for AAD.

## Concepts

- Form: A form (type) is two schema files, one for the form itself, and one for
  the UI that is given to JSONForms library.

- Collection: A collection is a instance of a form. These can be created by
  ADMIN roles in order to use the form schemas and get responses. A collection has
  a foreign key to a form.

- Submission: A submission is a response to a form. It contains the JSON object
  of the data that was submitted. It has a foreign key to a collection. Each user
  can have one submission in a collection, and a collection has many submissions.

## Implementation

We have tables for forms, collections, and submissions.

- **Forms** - contains an entry for each form schema either specified and loaded
  into the db from src/schemas folder, or created by the admin (not possible yet).
  Columns include the form and UI schema as stringified JSON.

- **Collections** - contains an entry for each form collection created by an
  Admin. Each collection is an independent instance of a form. Columns include the
  form name to get the schema of this collection (the form's id is its name) and
  some details and configuration about the collection instance.

- **Submissions** - contains an entry for each form submission. Submissions will
  be created when a user navigates to /form/:collectionId: and submits the form.
  The form data will be stringified from JSON and stored in the entry, as well as
  the user who submitted, the collection the submission is for, and the date and
  time.

For more information, refer to `prisma/schema.prisma`.

To make editing forms easier and to support future possibilities of editing the
form in the browser or the file itself, right now we are storing the form
schemas in the /src/schemas folder. The name of the folders in that folder are
the forms, and in each folder there should be a form.schema.json, and a
uiSchema.json. These can be loaded into the database by running `pnpm run
db:forms`.
