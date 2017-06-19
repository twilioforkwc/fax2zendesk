const got = require('got');

exports.handler = function(context, event, callback) {
  const now = new Date();
  const url = event.MediaUrl;
  const zendeskDomain = context.ZENDESK_DOMAIN;
  const username = context.ZENDESK_USERNAME;
  const password = context.ZENDESK_PASSWORD;
  const auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
  const zendeskFile = 'https://'+zendeskDomain+'/api/v2/uploads.json?filename='+now.toISOString()+'.pdf';
  const zendesk = 'https://'+zendeskDomain+'/api/v2/tickets.json';
  const from = event.From;

  const options = {
    headers: {
      'Content-Type': 'application/binary',
      'Authorization': auth
    }
  }

  const ticket = {
    ticket: {
      requester: {
        name: "FAX",
        email: username
      },
      subject: "Received FAX.",
      comment: {
        body: "Received FAX from " + from + " at " + now + ".",
        uploads: []
      }
    }
  }

  let data = '';
  got.stream(url)
    .pipe(got.stream.post(zendeskFile, options)
      .on('response', res => {
        res.on('data', function(chunk) {
          data += chunk
        })
        res.on('end', function() {
          let json = JSON.parse(data)
          let token = json.upload.token
          console.log('File upload completed. token:'+token)
          ticket.ticket.comment.uploads[0] = token
          options.headers['Content-Type'] = 'application/json'
          options.body = JSON.stringify(ticket)
          options.json = true
          console.log('Options: '+options)
          got.post(zendesk, options)
            .then(response => {
              console.log(response.body)
              callback(null, 'OK')
            })
            .catch(error => {
              console.log(error.response.body)
              callback(error, 'Error:'+error)
            })
        })
      })
      .on('error', err => {
        console.error('Error:'+err.message)
        callback(error, 'Error:'+error)
      }));
};
