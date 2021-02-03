const SIP = require('../../sip_node/lib')
const {RTCAudioSource, RTCAudioSink} = require('wrtc').nonstandard;

const userAgent = new SIP.UA({
  uri: "sip:1006@10.10.20.141:5060",
  // wsServers: "ws://10.10.20.141:5066",
  transportOptions : {
    wsServers: "ws://10.10.20.141:5066",
  },
  // authorizationUser: "1003",
  // transportOptions,
  password: "1234",
  // register: false,
  traceSip: true
});
// fs.createReadStream('test.wav')
userAgent.start();
userAgent.on('registered', onMessage("registered"));
userAgent.on('unregistered', onMessage("unregistered"));
userAgent.on('registrationFailed', onMessage("registrationFailed"));
userAgent.on('message', onMessage("message"));
setTimeout(makeCall, 500);

function makeCall () {
  console.log('makeCall', ' start ')
  var session = userAgent.invite('1008@10.10.20.141:5060', {
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: true,
        video: false
      }
    }
  });
  session.on("accepted", function () {
    if (session.logger.category === "sip.inviteclientcontext") {
      let pc = session.sessionDescriptionHandler.peerConnection
      // 话筒 source bind to sender
      const sender = pc.getSenders().find((sender) => {
        return sender.track.kind === 'audio';
      });
      const source = new RTCAudioSource()
      const track = source.createTrack();
      sender.replaceTrack(track)
      // rtcAudioSource.cret()

      // 听筒 sink bind to Receiver
      const rtpReceiver = pc.getReceivers().find((receiver) => {
        return receiver.track.kind === 'audio';
      });
      const sink = new RTCAudioSink(rtpReceiver.track);

      // var writeStream = fs.createWriteStream('record.wav')
      sink.ondata = data => {
        // console.log('received audio samples ', data.samples.length)
        source.onData(data)
      };

      setTimeout(() => {
        // clearInterval(interval);
        track.stop();
        sink.stop();
        // writeStream.end()
      }, 120000);
    }
  })
}


function onMessage (method) {
  return (message) => {
    console.log('====>', method, message);
  }
}
