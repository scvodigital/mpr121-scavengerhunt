# Scavenger Hunt Fruit Keyboard
## A scavenger hunt quiz system to use with the MPR121 capacitive touch sensor

This was a fun wee project developed the week prior to the Gathering 2017
organised by SCVO at the SEC in Glasgow.

The aim was to encourage participants in the quiz to talk to organisations
and learn more about what they do.

People enter their email address (to track progress and contact the winner) via
a standard keyboard then subsequent interaction with the app is by fruit touch.

Requirements:
* Raspberry Pi running Raspbian
* An MPR121 capacitive touch HAT connected to the Raspberry Pi via GPIO pins
* Python
* Timidity
* Node & NPM (latest versions of)
* Angular CLI
* 8 different fruits connected to the capacitive chip with crocodile clips

To install the app: `npm i`

To run: `./run_me.sh`

This script loads timidity then two python scripts (one for audio, one for
keyboard) then starts the local web server with the quiz app.

Wait for webpack to serve the app then visit localhost:4200

We ran this app in a web browser in kiosk mode (set to load on boot) which
meant that all you needed to do when booting the system was to ensure your
fruit was plugged in then run a single shell script.

Thanks to José Federico Ramos Ortega for the wonderful guidance and example
Python scripts provided here:
http://www.instructables.com/id/Sombrero-Capacitivo-de-Raspberry-Pi/ [ES]
