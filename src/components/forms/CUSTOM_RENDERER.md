There are three components/files needed to render our custom form components. There are examples that draw from this [documentation](https://jsonforms.io/docs/tutorial/custom-renderers/) included in our projects components/forms directory.

1. Component (StarRating.tsx) - This is the actual component that we customized with MUI to fit the designs provided by Cindy
2. Renderer (StarRatingControl.tsx) - The most important thing in this file is the `withJsonFormsControlProps()` function that allows you to access the props of default JSON form controls. IMPORTANT: you must customize your component to interact with the {data, handleChange, path} props.
3. Tester (StarRatingControlTester.tsx) - Searches through the list of specified properties in the json files

Once these files are complete you can add your renderer and tester to the `Form.tsx` component.
