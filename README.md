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
 ![Change Pass](https://github.com/KushalK04/AniMatch/assets/72050196/1290fb00-1d38-4071-8b51-0dee334c4d68)
- Then open pg admin and in a server under databases, then schemas, and under public you’ll see tables
- Right click and make a table called users
- In the query tab add the two lines of code SELECT * FROM public.users and ORDER BY id ASC and save
- Then go back to the terminal and run the command "node index.js".
