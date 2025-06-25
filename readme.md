

## API Endpoint Issue Resolution

I encountered an issue with the API endpoints while working on this project. Specifically, I faced difficulties in retrieving data for both heroes and minions using the 'cardset battleground' parameter. I followed the API documentation meticulously, and it appears that the issue may lie with the API itself and not mine, as it does not seem to support the combination of these two fetch requests (hero + battleground / minion + battlegrounds).

This problem led to significantly longer loading times since it required the retrieval of data for all heroes and minions at once. To address this issue, at least partially, I implemented a solution that involves utilizing the browser's `localStorage` for storing data related to minions and heroes and then used filter method to get the "battleground" set.

As a result of this implementation, the initial loading process may still have longer load times due to the need to fetch and store a considerable amount of data. However, subsequent interactions with the application will be noticeably improved as the locally stored data will be readily available for quick access.



Sincerely,
Makrygiannis Stavros
"# HeroOfPrime" 
