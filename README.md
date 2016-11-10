# homebridge-http-switch
> A simple http switch plugin for homebridge, inspired by homebridge-http and homebridge-http-simple-switch!

## Installation
(Login as root with ```sudo su```)
```bash
git clone git@github.com:phpfs/homebridge-http-switch.git
cd homebridge-http-switch
npm install -g
```

## Configuration
```json
    "accessories": [
        {
	        "accessory": "HTTPSwitch",
	        "name": "MySwitch",
	        "toggle_url": "http://138.372.37.23/2673/change",
	        "status_url": "http://138.372.37.23/2673/status"
        }
    ],
```

## HTTP Response
This Plugin expects from both *toggle_url* and *status_url* the following response:
**0** for *Off* and **1** for *On*
