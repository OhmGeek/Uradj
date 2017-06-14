# Uradj
A remote jukebox system

## How to run:
It's currently just a web app. The songs are all stored in memory, so if the server
goes down, songs are lost.

First, install dependencies using:

```bash
npm install
```

Then, run:

```bash
npm start
```
## Features:
### Backup playlist
In the event no-one has queued songs, a simple song playlist has been hard coded in the jukebox.js file, that is used whenever the user requested songs queue is empty.

### Duplicate song rejection:
If a song already appears in the list, it is rejected and the user is alerted.

### Short songs only
Songs that are 10 minutes or longer are automatically rejected. This prevents someone placing a 10 hour remix on the jukebox system

### Queue management through the player
One can delete songs from the player, and see the current queue.

## Credits:
Developed by [Ryan Collins](https://github.com/OhmGeek) and [Mike Croall](https://github.com/MikeCroall) as part of an event app.
