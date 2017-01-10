'use strict';
import { default as contentful } from 'contentful';

const DEFAULT_LOCALE = 'en-GB';
const content = {};
let client;

function processFields(entry, locale) {
  let fields = {};
  if (!entry.fields) {
    return entry;
  }
  Object.keys(entry.fields).forEach(key => {
    const obj = entry.fields[key][locale];
    if (obj.forEach) {
      obj.forEach((value) => {
        if (!fields[key]) fields[key] = [];
        fields[key].push(processFields(value, locale));
      });
    } else {
      fields[key] = processFields(obj, locale);
    }
  });
  return fields;
}

function processContent(entries, locale) {
  if (!entries || !entries.forEach) return;
  entries.forEach(entry => {
    content[entry.sys.contentType.sys.id] = processFields(entry, locale);
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
