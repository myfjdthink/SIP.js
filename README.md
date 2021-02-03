# SIP.js

This repository forked from onsip/SIP.js v0.15.10

I use node-webrtc/node-webrtc and websockets/ws instead of native ws rtc api on browser.

So it can run on nodejs env.

fork from git:https://github.com/Winston87245/SIP.js.git

add some new features:
- fix bug : wsServers config not work
- push to npm package and name it "node_sip"

## Download

* npm: `npm install node_sip`

## How to use

Audio will be echo

see ./example/PlayAudio.js

you can get the income audio stream and send it back.

## License
MIT
