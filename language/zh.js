module.exports = {
    title: "创建BugScan节点",
    success: "创建成功",
    error: "创建失败",
    tips: {
        label: "使用前请先在虚拟终端下检查 python 是否在环境变量中",
        url: "前往 <a href='https://www.bugscan.net'>BugScan</a> 获取节点地址。<br>在此处填写 urlopen 函数中的 url<br/><b>eg:</b><br>在 BugScan 获取的代码为 <p>python -c 'exec(__import__('urllib2').urlopen('http://t.cn/Rqu1SmB?xxxxxx').read())' -m 5</p><br>则此处填写的为:<br>http://t.cn/Rqu1SmB?xxxxxx",
       tasks: "该节点同一时间能够进行的最大任务数" 
    }, 
    cella: {
        title: "配置",
        start: "开始",
        form: {
            url: "节点链接",
            tasks: "最大任务"
        }
    }
}