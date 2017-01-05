'use strict';
const contentful = require('contentful');

const DEFAULT_LOCALE = 'en-GB';
const content = {};
let client;
let locale;
let promise;

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

    locale = config.locale || DEFAULT_LOCALE;
    client = contentful.createClient({
      space: config.space,
      accessToken: config.accessToken
    });
  },

  ready() {
    if (!promise) {
      console.log('promise is created');
      promise = client.sync({initial: true})
        .then(response => {
          processContent(response.entries, locale);
        });
    }
    return promise;
  },

  get(id) {
    return content[id];
  }

};
