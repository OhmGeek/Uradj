# UraDJ version 2.0
While Version 1 was a proof of concept, it's time to start leaning towards a more
mature version of the system. This will involve a rewrite of the system,
to tidy the code, and add changes. The following shall be new features:

- New Pluggable Backend System
- Spotify Backend (using the Web API and Playback API)
- Client can view the list of songs in the queue
- Jukebox Playback protected by authentication (just basic auth for now).
- Web Socket Implementation (rather than the pesky REST api).

## Code Structure Changes:

When the user needs to search for a song, they shall go to the server.

The server will then go through the list of backends that are enabled, and search,
collating the results together. This list will then be returned in the following
JSON format:

```json
[{
  "backend": "spotify",
  "info": {
    "id": "<ID FOR THE BACKEND>",
    "name": "<SONG NAME HERE>",
    "artist": "<SONG ARTIST HERE>",
    "length": "<LENGTH IN SECONDS>",
    "image": "<URL TO AN IMAGE>",
  },
}, {
  "backend": "spotify",
  "info": {
    "id": "<ID FOR THE BACKEND>",
    "name": "<SONG NAME HERE>",
    "artist": "<SONG ARTIST HERE>",
    "length": "<LENGTH IN SECONDS>",
    "image": "<URL TO AN IMAGE>",
  },
}]

The User Interface will then display the list, allowing the user to select their song of choice.

When they want to make a request, they shall send a request with the following information:

```json
{
  "backend": "spotify",
  "id": "<ID FOR THE BACKEND>"
}
```
The song will be added, providing the following two conditions are met:
1. The song isn't already in the queue (checked by comparing IDs)
2. The length is under a length of 10 mins (as this is to prevent very very long songs).

On playback, the ID shall be fetched from the server by the client, and played back
one song at a time.

When the user requests to add a song
