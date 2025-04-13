# Hackathon-2025
## Usage
```
/back-end/.env
OPENAI_API_KEY=<YOUR API KEY>

/back-end/firebase.json
<Get File From Firebase Console>

/back-end
$ npm install
$ npm run dev
```

```
/front-end/src/config/firebaseconfig.js
<Add SDKs for Firebase products that you want to use>
- https://firebase.google.com/docs/web/setup#available-libraries
<Your web app's Firebase configuration>
<Initialize Firebase and export values> :
  export const app = initializeApp(firebaseConfig);
  
  export const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
  	prompt: "select_account"
  });
  
  export const auth = getAuth();

/front-end
$ npm install
$ npm run dev
```
## Fun and Inclusive
Log your activity in text form. No watches. No Syncing. Just Competition with Friends and Moints!
## Features
### Activity Tracking
See you activity day-by-day. Rack up Moints!
### AI Assisted Activity Logging
Input unstructed activities and the AI will assign you Moints based on your profile's activity status and the difficulty level of the specific activity.
### Firebase Auth (Signin with Google)
### AI Generated Congrats Message
The AI will encourage and ammuse you when you log your activity.
### A Ball Pit :tada:
### Profile Page
### Badges and Rewards
### Unique Assets and Styling
### Admin
- Set up comps
- Set milestones
- Set up teams
- Edit teams
- Reports for activity
## Aditional Features Still Under Construction
- Slack integration
- Weekly MAXX Values
## Tech Stack
- React Frontend
- ExpressJS Backend
- OpenAI
