module.exports = {
    title: "BugScan",
    success: "Create Success",
    error: "Create Error",
    tips: {
        label: "Make sure the variable python is defined in environment.",
        url: "Visit <a href='https://www.bugscan.net'>BugScan</a> and get your node url<br>Input the url in urlopen function.<br/><b>eg:</b><br>Your code to build BugScan nodes like this: <p>python -c 'exec(__import__('urllib2').urlopen('http://t.cn/Rqu1SmB?xxxxxx').read())' -m 5</p><br>then you should input:<br>http://t.cn/Rqu1SmB?xxxxxx",
       tasks: "Max tasks in the same time." 
    },
    cella: {
        title: "Settings",
        start: "Start",
        form: {
            url: "Node URL",
            tasks: "Max Tasks"
        }
    }
}