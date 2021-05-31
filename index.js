const WebSocket  = require('ws');

const ws         = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
let interval     = 0;

const token      = 'bottoken';
const payload    = {
  op:2,
  d: {
    token:       token,
    intents:     513,
    properties: {
       $os:     'linux',
       $browser:'chrome',
       $device :'chrome',
       
    },
    presence: {
      "activities": [{
        "name": "Test",
        "type": 1
      }],
      "status": "dnd",
      "since": 91879201,
      "afk": false
    },
  }
};

ws.on('open', function open() {
  ws.send(JSON.stringify(payload));
})

ws.on('message', function incoming(data) {
  let payload = JSON.parse(data);
  const {t, event, op, d} = payload;
  
  switch(op) {
    case 10:
      const {heartbeat_interval} = d;
      const interval = heartbeat(heartbeat_interval);
      break;
  }
  switch(t) {
    case 'MESSAGE_CREATE':
      const author = d.author.username + '#' + d.author.discriminator;
      if(d.author.bot !== true) {
      console.log(`${author}:  ${d.content}`);
      } else {
        console.log(`${d.author.username} Named Bot sended a message`)
      }

  }
    
})

const heartbeat = (ms) => {
  return setInterval(() => {
    ws.send(JSON.stringify({op:2,d:null})
    );
  }, ms)
}
