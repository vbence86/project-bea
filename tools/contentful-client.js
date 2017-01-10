const ContentProvider = require('../src/js/components/ContentProvider');

ContentProvider.connect({
  space: 'v9u7v7jawm36',
  accessToken: 'a15a60af447bb88662e7eed5dc8ed2042d623307cfbda6b9c1e7aa849ca15ef7',
  locale: 'en-GB'
}).then(() => {
  console.log(ContentProvider.get('homepage'))
});