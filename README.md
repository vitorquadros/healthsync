<h1 align="center">HealthSync</h1>

<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/vitorquadros/healthsync?color=darkgreen&style=plastic">
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/vitorquadros/healthsync?color=darkgreen&style=plastic">
  <img alt="License" src="https://img.shields.io/github/license/vitorquadros/healthsync?color=darkgreen&style=plastic">
</p>

> <p align="center">A web application for scheduling and managing patient appointments, designed to streamline the consultation process for hospitals.</p>

<h2 align="center">Content</h2>

<p align="center">
<a href="#rocket-features">Features</a>
·
<a href="#gear-technologies">Technologies</a>
·
<a href="#camera-preview">Preview</a>
·
<a href="#question-how-to-test">How to Test</a>
·
<a href="#copyright-license">License</a>
</p>

# :rocket: Features

:iphone: Mobile Ready

### As user

- Create new appointments, providing personal and medical information

- Receive a SMS text when the appointment is confirmed or canceled

### As admin

- Administrative panel to manage appointments and doctors
  - Access by entering a passcode, which will be stored in cookies for future sessions
  - Create new doctor
  - Edit an existing doctor
  - Delete a doctor
  - Overview of appointment statuses, displaying the number of appointments for each status
  - A list of appointments, each containing essential information such as the patient's name, doctor's name, status, and actions for managing the appointment
  - Confirm an appointment, tagging as "Scheduled" and sending a SMS text to the patient
  - Cancel an appointment, tagging as "Cancelled" and sending a SMS text to the patient

# :gear: Technologies

### Frontend

- [ReactJS](https://github.com/facebook/react) v18
- [NextJS](https://github.com/vercel/next.js) v14.2.15
- [TailwindCSS](https://github.com/tailwindlabs/tailwindcss)
- [React Hook Form](https://github.com/react-hook-form/react-hook-form)
- [Zod](https://github.com/colinhacks/zod)
- [React Datepicker](https://github.com/Hacker0x01/react-datepicker)
- [React Dropzone](https://github.com/react-dropzone/react-dropzone)
- [React Phone Number Input](https://gitlab.com/catamphetamine/react-phone-number-input)
- [Shadcn](https://github.com/shadcn/ui)

### Backend and Database

- [Appwrite](https://github.com/appwrite/appwrite)

### Languages and Tools

- [NodeJS](https://github.com/nodejs)
- [Typescript](https://github.com/microsoft/TypeScript)
- [VSCode](https://github.com/microsoft/vscode)
- [ESLint](https://github.com/eslint/eslint)
- [Prettier](https://github.com/prettier/prettier)

### Monitoring and Messaging

- [Sentry](https://github.com/getsentry/sentry)
- [Twilio](https://github.com/twilio/twilio-node)

### Deploy

- [Vercel](https://github.com/vercel/vercel)

### Documentation - not implemented yet

- [Storybook](https://github.com/storybookjs/storybook)

### Tests - not implemented yet

- [Vitest](https://github.com/vitest-dev/vitest)
- [React Testing Library](https://github.com/testing-library/react-testing-library)

# :camera: Preview

<details>
<summary style="font-size: 20px">Desktop</summary>

### Step 1 - Register user

  <img src="./.github/images/register1.png">

### Step 2 - Register patient

  <img src="./.github/images/register2.png">

### Step 3 - Create appointment

  <img src="./.github/images/register3.png">

### Success

  <img src="./.github/images/success.png">

### Enter Admin passcode

  <img src="./.github/images/admin1.png">

### Admin dashboard

  <img src="./.github/images/admin2.png">

### Schedule appointment

  <img src="./.github/images/admin3.png">

### Cancel appointment

  <img src="./.github/images/admin4.png">

### Doctors dashboard

  <img src="./.github/images/doctors1.png">

### Create new doctor

  <img src="./.github/images/doctors2.png">

### Update existing doctor

  <img src="./.github/images/doctors3.png">

### Delete doctor

  <img src="./.github/images/doctors4.png">

### 404

   <img src="./.github/images/404.png">

</details>

<details>
<summary style="font-size: 20px">Mobile</summary>

### Step 1 - Register user

  <img src="./.github/images/register1-mobile.png">

### Step 2 - Register patient

  <img src="./.github/images/register2-mobile.png">

### Step 3 - Create appointment

  <img src="./.github/images/register3-mobile.png">

### Success

  <img src="./.github/images/success-mobile.png">
 
### Enter passcode

  <img src="./.github/images/admin1-mobile.png">

### Admin dashboard

  <img src="./.github/images/admin2-mobile.png">

### Schedule appointment

  <img src="./.github/images/admin3-mobile.png">

### Cancel appointment

  <img src="./.github/images/admin4-mobile.png">

### Doctors dashboard

  <img src="./.github/images/doctors1-mobile.png">

### Create new doctor

  <img src="./.github/images/doctors2-mobile.png">

### Update existing doctor

  <img src="./.github/images/doctors3-mobile.png">

### Delete doctor

  <img src="./.github/images/doctors4-mobile.png">
    
  ### 404

   <img src="./.github/images/404-mobile.png">

</details>

# :question: How to test

### This project is deployed on Vercel

[You can test it by clicking here](https://healthsync-seven.vercel.app/)

:warning: The passcode to access the admin page is <strong>123456</strong>.
<br>
:warning: The app may experience slower performance due to the use of the free version of Appwrite.
<br>
:warning: The SMS text function is limited due to the free version of Twilio. Messages can only be sent to phone numbers defined in the Twilio account.

# :copyright: License

This project is under the [MIT license](./LICENSE).

<p align="center">
<sub>The design of this application was based on the work of <a href="https://www.linkedin.com/in/adrianhajdin/">Adrian Hajdin</a></sub>
<br>
<sub>Made with ❤︎ by <a href="https://github.com/vitorquadros">Vítor Quadros</a></sub>
</p>
