/**
 * 插件UI框架
 */

const WIN = require('ui/window');
const LANG = require('../language/');

class UI {
  constructor(opt) {
    // 创建一个windows窗口
    this.win = new WIN({
      title: `${LANG['title']} - ${opt['url']}`,
      height: 213,
      width: 440,
    });
    this.createMainLayout();
    return {
      onStart: (func) => {
        this.bindToolbarClickHandler(func);
      },
      onAbout: () => {}
    }
  }

  createMainLayout() {
    let layout = this.win.win.attachLayout('1C');
    // 扫描输入
    layout.cells('a').hideHeader();
    layout.cells('a').setText(`<i class="fa fa-cogs"></i> ${LANG['cella']['title']}`);
    // 创建toolbar
    this.createToolbar(layout.cells('a'));
    // 创建form
    this.createForm(layout.cells('a'));

    this.layout = layout;
  }

  /**
   * 创建扫描输入工具栏
   * @param  {Object} cell [description]
   * @return {[type]}      [description]
   */
  createToolbar(cell) {
    let toolbar = cell.attachToolbar();
    toolbar.loadStruct([
      { id: 'start', type: 'button', text: LANG['cella']['start'], icon: 'play' }
    ]);
    this.toolbar = toolbar;
  }

  /**
   * 创建扫描输入表单
   * @param  {Object} cell [description]
   * @return {[type]}      [description]
   */
  createForm(cell) {
    let formdata=[{
        type: 'settings', position: 'label-left',
        labelWidth: 100, inputWidth: 270
      }, {
        type: 'block', inputWidth: 'auto',
        offsetTop: 12,
        list: [{
            type: 'label', label: LANG['tips']['label'], labelWidth: 350
          },{
            type: 'input', label: LANG['cella']['form']['url'], name: 'url',
            required: true, validate:"NotEmpty",
            value: antSword['storage']("bugscan_url", "", "http://t.cn/Rqu1SmB?xxxxxx"),
            info: true,
            userdata: {
              info: LANG['tips']['url']
            }
          }, {
            type: 'input', label: LANG['cella']['form']['tasks'], name: 'tasks',
            required: true,
            value: antSword['storage']("bugscan_tasks", "", 5),
            info: true,
            userdata: {
              info: LANG['tips']['tasks']
            }
        }]
    }];
    let form = cell.attachForm(formdata, true);
    form.enableLiveValidation(true);
    form.attachEvent("onInfo", (name, e) => {
      var tips_popup;
      if(tips_popup == null){
        tips_popup = new dhtmlXPopup({mode: "bottom"});
        tips_popup.attachHTML(
          "<div style='width:300px;'>" +
          this.form.getUserData(name, "info") +
          "</div>");
        var t = e.target || e.srcElement;
        var x = window.dhx4.absLeft(t);
        var y = window.dhx4.absTop(t);
        var w = t.offsetWidth;
        var h = t.offsetHeight;
        tips_popup.show(x,y,w,h);
      }
    });
    this.form = form;
  }

  /**
   * 监听开始按钮点击事件
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  bindToolbarClickHandler(callback) {
    this.toolbar.attachEvent('onClick', (id) => {
      switch (id) {
        case 'start':
          // 加载中
          this.win.win.progressOn();
          // 获取FORM表单
          let formvals = this.form.getValues();
          antSword['storage']('bugscan_url', formvals['url']);
          antSword['storage']('bugscan_tasks', formvals['tasks']);
          // 传递给扫描核心代码
          callback({
            url: formvals['url'],
            tasks: formvals['tasks']
          }).then((ret) => {
              // 解析扫描结果
              if (ret.text == "0") {
                toastr.error(LANG['error'], antSword['language']['toastr']['error']);
              }else{
                toastr.success(LANG['success'], antSword['language']['toastr']['success']);
              }
              // 取消锁定LOADING
              this.win.win.progressOff();
            })
          .catch((err) => {
            toastr.error(LANG['error'], antSword['language']['toastr']['error']);
            this.win.win.progressOff();
          });
          break;
        default:
      }
    })
  }
}

module.exports = UI;
