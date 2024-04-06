# AniMatch
AniMatch is an application designed for all anime lovers. AniMatch helps users find new shows by giving anime reccomendations and allowing them to search for new shows.

## By
Kushal Kumar |
Olivia Fong |
Jesse Welk |
Patrick Hui

## API Used

[KitsuAPI](https://kitsu.docs.apiary.io/#)

## How To Run

- First you must git clone the github repo.
- Then open it on visual studio code.
- From there do npm i install
- Then in the index.js change the password part of the code to your postgres password
- Then open pg admin and in a server under databases, then schemas, and under public you’ll see tables
- Right click and make a table called users
- In the query tab add the code ORDER BY id ASC and save
- Then go back to the terminal and do node index.js
