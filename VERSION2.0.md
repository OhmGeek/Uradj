# UraDJ version 2.0
While Version 1 was a proof of concept, it's time to start leaning towards a more
mature version of the system. This will involve a rewrite of the system,
to tidy the code, and add changes. The following shall be new features:

- New Pluggable Backend System
- Spotify Backend (using the Web API and Playback API)
- Client can view the list of songs in the queue
- Jukebox Playback protected by authentication (just basic auth for now).

## Code Structure Changes:

When the user needs to search for a song, they shall go to the server.

The server will then go through the list of backends that are enabled, and search,
collating the results together. This list will then be returned in the following
JSON format:

```json
{
  "backend": "spotify",
  "info": {
    "id": "<ID FOR THE BACKEND>",
    "name": "<SONG NAME HERE>",
    "artist": "<SONG ARTIST HERE>",
    "length": "<LENGTH IN SECONDS>",
  },
}
```

## Preventing
