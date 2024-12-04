# React App: Firebase Hosting & Realtime Database

A lightweight, production-ready boilerplate for React projects built on Vite. This setup includes essential dependencies for modern web development, such as Firebase services and tools, Axios for API requests, i18n for internationalization, and React Router for route management. Includes Tailwind CSS for styling, Flowbite for Better UI UX, ESLint for code quality, and support for environment variables.

## Features
- **React 18** with **Vite** for fast development
- **Firebase SDK** for Hosting & Realtime NOSQL Database
- **Axios** for easy HTTP requests
- **CryptoJS** encryption standards
- **Cookies-js** for handling cookies
- **GDPR** for Cookie Consent
- **i18n** with i18next for multi-language support
- **React Router** for route management
- **Tailwind CSS** with Tailwind Merge for custom styling
- **Flowbite** set of design components for Tailwind CSS
- **Environment configuration** via loadEnv

## Installation

1. **Clone & Install the repository**
   ```bash
   git clone https://github.com/asilvafx/react-firebase-db-crud.git
   cd react-firebase-db-crud
   npm install

2. **Setup Google Firebase Account**
   ```bash
   Sign in or create a new account at, https://console.firebase.google.com/ 
   Create new project
   Add Firebase to your web app
   (Optional) Check the option "Also set up Firebase Hosting for this app", if you wish to setup a hosting for your web app.
   Copy your Firebase configuration
   Update the configuration in your .env-sample at your root directory
   Rename the .env-sample to .env   

3. **Development**
   ```bash
   npm run dev

4. **(Optional, Hosting) Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   
5. **Build**
   ```bash
   npm run build
   (Optional, Hosting) Run, firebase deploy
