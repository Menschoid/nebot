# SAM-BOT
A Starborne Alliance Managment helper bot for Discord. This bot allows users to claim stations by their coordinates. It also allows them to edit and delete these stations and also see if a pair of coordinates might create a conflict with the area of another station. In the future there might be additional features regarding managment of Augment-requests and spy reports.

## Features
- Save/Edit/Delete stations in Discord
- Check for Distance between given coordinates and the nearest station in the database
- First bit of channel-name defines the Starborne-server (ie: beta8-station-claims for beta8 server)
- List all alliance stations for the server
- List only my stations for that server

## Setup
- Go over to https://discordapp.com/developers/applications and register a new application
- Set your application up as a bot (don't forget to uncheck the "public"-setting in "Bot"). Here is a good tutorial fpr setting up a Bot: https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot
- Register the Bot on your server
- Find a hosting service for Node.js, register and setup your VPS. One very helpful source for doing this: https://www.writebots.com/discord-bot-hosting/
- Upload the files for this bot
- Change config-example.json to config.json and enter your token
- start the process for the bot.
- create a channel for station claims with the (chosen) servername as a prefix like this: SERVER-Channel-name. Example: S1-station-claims or beta5-stations

## Commands
The prefix for commands can be changed in the config.json. For ease of explanation, I'm using the default "!". All commands are split up by whitspaces. That means you can't use blank spaces in names, descriptions or roles.

**IMPORTANT**
To specify the gameserver, you need to name the channels correctly. Every channel that SAM-Bot is used in need to start with the desired server! Like this: "beta8-what-ever". Only the first part (separated by -) is important. But that part will define the server when interacting with the bot!

###### General

#### !help
**Description:** The help command will list all available commands and their usage.</br>
**Aliases:** !sambot, !sambot_help</br>
**Usage:** `!help`</br>
**Examples:** 
- !help
- !sambot
- !sambot_help

###### Stations

#### !station_create
**Description:** Creates a station in the database. Stations are identified by their coordinates and the server. The name and role are optional.</br>
**Aliases:** !station_claim</br>
**Usage:** `!station_create <x-coordinate> <y-coordinate> <station-name [optional, no whitespaces]> <station-role [optional, no whitespaces]>`</br>
**Examples:** 
- !station_create -146 75 FirstStation MiningColony
- !station_claim -146 75 FirstStation MiningColony
- !station_create -146 75
- !station_claim -146 75

#### !station_update
**Description:** Updates a stations name and role. Coordinates *cannot* be changed. To move a station, you need to first delete and then re-create it. Stations can only be edited by the Discord-user that created them.</br>
**Aliases:**</br>
**Usage:** `!station_update <x-coordinate> <y-coordinate> <station-new-name [optional, no whitespaces]> <station-new-role [optional, no whitespaces]>`</br>
**Examples:** 
- !station_update -146 75 NewName NewRole

#### !station_delete
**Description:** Deletes a station. Can only be used by the Discord-user that created the station.</br>
**Aliases:**</br>
**Usage:** `!station_delete <x-coordinate> <y-coordinate>`</br>
**Examples:** 
- !station_delete -146 75 

#### !station_show
**Description:** Shows a stations name, role and owner based on the coordinates given. Alternatively, it can be used with the "all" parameter instead of coordinates to list *all stations on the game server*. Or it can be used with the "mine" parameter instead of coordinates to list all stations of the Discord-user on a specific game server. Remember: the game server is determined by the channel name. Keep that in mind.</br>
**Aliases:**</br>
**Usage:** `!station_show [<x-coordinate> <y-coordinate>] [<all>] [<mine>]`</br>
**Examples:** 
- !station_show -146 75
- !station_show all
- !station_show mine

#### !station_check
**Description:** Looks for the closest station to the given coordinates and returns the distance. If the distance is less than 10 hexes, it will also return a warning and information about the closest station (coordinates and owner)</br>
**Aliases:** !goto</br>
**Usage:** `!station_check <x-coordinate> <y-coordinate>`</br>
**Examples:** 
- !station_check -146 75
- !goto -146 75