#!/bin/bash

# Start the backend server
./joker-bot/start-server.sh

# Start the frontend dev server

gnome-terminal --tab --title="frontend" -- npm run dev

