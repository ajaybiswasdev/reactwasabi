# OGD-INSPECTION-FORM UI SPECS

## INSTRUCTIONS

### Project Estimate 8-12 hrs

Complete the React app based on the requirements specified below.

### Provided in this repository

- React Project with controls to test: do not remove the controls they will be used to drive the application and check
  the JSON data.
- Two pre-built form definitions provided in `src/config/form-fields.ts`

## REQUIREMENTS

- FRONTEND ONLY - this project is just for building reactive components.
- FUNCTIONAL REACT COMPONENTS - use functions, not classes.
- TYPESCRIPT - use good typescript practices.
- NO EXTRA DEPENDENCIES - This repo has everything you need.
- MATERIAL-UI - Already included in this repo, leverage those components.
- FONT AWESOME ICONS ONLY - Already provided in this repo
- NO REDUX - Simply pass information via properties.
- Follow coding conventions in provided repo:
    - PascalCase for all components.
    - camelCase for all fields and methods.
    - kebab-case for all file names.
    - Document your code

## LAYOUT

The current form is built dynamically using the selected form name from the controls.

This UI is to be ‘Reactive’ (data driven): i.e. data updates without submit/refresh user interaction

UI is intended to be mobile-first.

## Scope

1. Implement taking and attaching photos.
    - Because this will be run on a phone, we need the ability to attach images without having them save to the Camera
      Roll.
    - Upon taking and attaching a picture, send the picture to Wasabi and return the key.
    - Attached photos should have a thumbnail and an option to remove, which should remove from Wasabi.
    - Save the key in the form fields.
2. Finish the form implementation with notes.
    - When a user updates the notes, it should update the data.

## Acceptance criteria:

1. Attaching photos
    1. Click on the camera icon
    2. Prompts user to take a photo
    3. Upload photo to Wasabi and display thumbnail
2. Updating the form
    1. Updating every form field should update the data model, including ratings, textfields, notes, etc.
3. Clearing the form
    1. Clicking Clear should clear the values of the form.
4. Submitting the form
    1. Clicking Submit should "submit" the form (just print off the form values in the console for now).
