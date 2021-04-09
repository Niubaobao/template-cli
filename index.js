#! /usr/bin/env node

const { program } = require('commander'); // link
const download = require('download-git-repo')// 下载
const handlebars = require('handlebars') // 解析
var inquirer = require('inquirer');//终端交互
const fs = require('fs') // 读取文件
const ora = require('ora');  // 视觉美化 提示下载文本  loading 效果1
const chalk = require('chalk');
const logSymbols = require('log-symbols');



const template = {
  "tel-a": {
    url: 'github:Niubaobao/vue3.0-test#master',
    description: "脚手架"
  }
}

// 使用node开发命令行工具所执行的js脚本必须在顶部加入 #!/user/bin/env node 声明

program
  .version('0.1.0')

program
  .command('init <templateName> <projectName>')
  .description('初始化项目模板')
  .action((templateName, projectName) => {
    // 根据模板名下载对应的模板到本地并起名 为用户输入的名字
    const { url } = template[templateName]

    const spinner = ora('正在下载模板......').start(); //增加下载动画
    // 下载之前loading

    download(url, projectName, function (err) {
      if (err) {
        spinner.fail()//下载失败
        console.log(logSymbols.error, chalk.red('下载失败'))
      }

      spinner.succeed()//下载成功

      // 把项目下的packages.json 文件读取出来
      // 使用项目的方式采集用户输入的值
      // 使用模板引擎把用户输入的数据解析到package.json 文件中
      // 解析完毕 把解析之后的结果重新写入 package.json 文件中
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'name',
            message: '请输入项目名称'
          },
          {
            type: 'input',
            name: 'description',
            message: '请输入项目简介'
          },
          {
            type: 'input',
            name: 'author',
            message: '请输入作者'
          }
        ])
        .then(answers => {
          //把用户输入的数据解析替换到package.json 文件中
          console.log(answers)
          const packagePth = `${projectName}/package.json` //路径
          const packagesContent = fs.readFileSync(packagePth, 'utf8') //  读取本地文件
          const packagesResult = handlebars.compile(packagesContent)(answers) // 对比替换用户输入
          fs.writeFileSync(packagePth, packagesResult) // 写到本地
          console.log(logSymbols.success, chalk.blue('初始化成功'));


        })

    })

  });

// lrainw init a abc  基于a模板新建的项目

program
  .command('list')
  .description('查看所有可用模板')
  .action(() => {
    console.log('这里面是所有可用的模板')

  });


program.parse(process.argv);

/*
  ```
  https://github.com/tj/commander.js
1 获取用户输入的命令
  原生获取命令行的方式
  console.log(process.argv)
  使用commander 模块处理参数
2 根据不同的执行 执行不同的功能操作


#下载仓库
下载仓库使用模块  npm install download-git-repo

const download = require('download-git-repo')
download('bitbucket:flippidippi/download-git-repo-fixture#my-branch', 'test/tmp', { clone: true }, function (err) {
    console.log(err ? 'Error' : 'Success')
  })


如果不行试试去掉  { clone: true }

使用 clone 时，路径

GitHub - github:owner/name or simply owner/name
GitLab - gitlab:owner/name
Bitbucket - bitbucket:owner/name


# 增加命令行交互
模板引擎替换



#ora 下载进度动画 视觉美化

#美化字体
https://github.com/chalk/chalk
const chalk = require('chalk');
console.log(chalk.blue('Hello world!'));

# 添加logo
https://github.com/sindresorhus/log-symbols
 npm install log-symbols
const logSymbols = require('log-symbols');
console.log(logSymbols.success, 'Finished successfully!');


# npm 发包

1 打开npm.js 官网
2 注册npm账号
3 在package.jsoon 中的name 修改包名 （和项目名称无关）

```
*/