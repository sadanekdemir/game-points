# game-points

Interview case submission for Kahoot!

This was a fun assignment! Although it looked very trivial at first, the more i spent time on it i find other ideas to fix it. Due to lack of time last week and my sickness, it was a little to sit with it for long, so i have done small changes every now and then.

How it works:
- It reads the data object defined in /data/index.ts and the game starts.
- I made the data with the following format:
   `{ label: 'A', unitPoints: 50, bonus: { collect: 3, yield: 200 } }`
   where label and unit point are for every item, bonus is optional. and to make it flexible enough for the case, i defined properties, collect and      yield. in real life this data would come from a database, but for this case i wanted to keep it simple
   
- The game loads the data and it starts

Technology and Architecture:
- i used react with ts for development, and jest and cypress for unit and e2e testing. and tried vite for tooling, first time, wanted to try
- i have used as small as possible components for readibilty and reusability
- most of the game logic is handled by the custom hook useGameEngine()
- for calculating the score items, i had different ideas and approaches, but i decided to use a Record object in the end, can explain more during the interview


## How to install and run
clone the game-points folder
`npm install`
`npm run dev`

`npm test:jest` for jest testing <br>
`npm test:cypress` or yarn cypress open-ct for cypress testing

### OBS
Installing cypress and jest at the same time was a big challenging, because apparently there's a bug in the newest version of cypress. that made me spend some time to figure out, but i finally managed with some manual tweaks. 
- https://github.com/cypress-io/cypress/issues/22059 
- https://github.com/cypress-io/cypress/issues/4089
