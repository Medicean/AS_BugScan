const UI = require('./libs/ui');
const BUUGSCAN = require('./libs/bugscan');

class Plugin {
  constructor(opts) {
    opts.map((opt) => {
      new UI(opt)
        .onStart((argv) => {
          return new BUUGSCAN(opt, argv);
        })
    })
  }
}

module.exports = Plugin;
