'use strict';
const contentful = require('contentful');

const DEFAULT_LOCALE = 'en-GB';
const content = {};
let client;

function processContent(entries, locale) {
  if (!entries || !entries.forEach) return;
  entries.forEach(entry => {
    let fields = {};
    Object.keys(entry.fields).forEach(key => {
      fields[key] = entry.fields[key][locale];
    });
    content[entry.sys.contentType.sys.id] = fields;
  });
}


export let ContentProvider = {

  connect(config) {
    if (!config) return Promise.resolve('Invalid config object');

    client = contentful.createClient({
      space: config.space,
      accessToken: config.accessToken
    });
    
    return client.sync({initial: true})
      .then(response => {
        processContent(response.entries, config.locale || DEFAULT_LOCALE);
      });
  },

  get(id) {
    return content[id];
  }

};
