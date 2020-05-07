Formatted for Discord (post in multiple posts due to Discord 2000 character limit):

Post 1:
__Commands__
The prefix for commands can be changed in the config.json. For ease of explanation, I'm using the default "!". All commands are split up by whitspaces. That means you can't use blank spaces in names, descriptions or roles.

**IMPORTANT**
To specify the gameserver, you need to name the channels correctly. Every channel that SAM-Bot is used in need to start with the desired server! Like this: "beta8-what-ever". Only the first part (separated by -) is important. But that part will define the server when interacting with the bot!

__**Basics**__

__!help__
**Description:** The help command will list all available commands and their usage.
**Aliases:** !sambot, !sambot_help
**Usage:** `!help`
**Examples:** 
- !help
- !sambot
- !sambot_help

Post 2:
__**Station Basics**__

__!station_create__
**Description:** Creates a station in the database. Stations are identified by their coordinates and the server. The name and role are optional.
**Aliases:** !station_claim
**Usage:** `!station_create <x-coordinate> <y-coordinate> <station-name [optional, no whitespaces]> <station-role [optional, no whitespaces]>`
**Examples:** 
- !station_create -146 75 FirstStation MiningColony
- !station_claim -146 75 FirstStation MiningColony
- !station_create -146 75
- !station_claim -146 75

__!station_update__
**Description:** Updates a stations name and role. Coordinates *cannot* be changed. To move a station, you need to first delete and then re-create it. Stations can only be edited by the Discord-user that created them.
**Aliases:**
**Usage:** `!station_update <x-coordinate> <y-coordinate> <station-new-name [optional, no whitespaces]> <station-new-role [optional, no whitespaces]>`
**Examples:** 
- !station_update -146 75 NewName NewRole

__!station_delete__
**Description:** Deletes a station. Can only be used by the Discord-user that created the station.
**Aliases:** 
**Usage:** `!station_delete <x-coordinate> <y-coordinate>`
**Examples:** 
- !station_delete -146 75

Post 3:
__**Station Interactions**__

__!station_show__
**Description:** Shows a stations name, role and owner based on the coordinates given. Alternatively, it can be used with the "all" parameter instead of coordinates to list *all stations on the game server*. Or it can be used with the "mine" parameter instead of coordinates to list all stations of the Discord-user on a specific game server. Remember: the game server is determined by the channel name. Keep that in mind.
**Aliases:** 
**Usage:** `!station_show [<x-coordinate> <y-coordinate>] [<all>] [<mine>]`
**Examples:** 
- !station_show -146 75
- !station_show all
- !station_show mine

__!station_check__
**Description:** Looks for the closest station to the given coordinates and returns the distance. If the distance is less than 10 hexes, it will also return a warning and information about the closest station (coordinates and owner)
**Aliases:** !goto
**Usage:** `!station_check <x-coordinate> <y-coordinate>`
**Examples:** 
- !station_check -146 75
- !goto -146 75