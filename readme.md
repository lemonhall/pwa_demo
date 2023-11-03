https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable



1、第一件事，是搞一个https的站点出来

打开dns，这就是分分钟的事情了

2、第二步，搞一下nginx

到/etc/nginx/sites-enabled,目录下

lemonhall@lemonhallme:/etc/nginx/sites-enabled$ ls
code-server  default  lemon-blog
lemonhall@lemonhallme:/etc/nginx/sites-enabled$ 

sudo cp lemon-blog pwa-demo

server {
    listen 80;
    server_name pwa.lemonhall.me;
    # enforce https
    return 301 https://$server_name:443$request_uri;
}


然后：
sudo systemctl reload nginx

3、验证一下哈
https://pwa.lemonhall.me/login

没问题哈


4、修改成静态文件
server {
    listen 80;
    server_name pwa.lemonhall.me;
    # enforce https
    return 301 https://$server_name:443$request_uri;
}
server {
    listen 443 ssl http2;
    server_name pwa.lemonhall.me;
    ssl_certificate /etc/letsencrypt/live/172-233-73-134.ip.linodeusercontent.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/172-233-73-134.ip.linodeusercontent.com/privkey.pem;
    location / {
        root /home/lemonhall/pwa_demo;
        index index.html;
        try_files $uri $uri/ =404;
    }
}

5、在/home/lemonhall/pwa_demo，下面设立index.html

<!doctype html>
<html lang="en">
  <head>
    <link rel="manifest" href="manifest.json" />
    <!-- ... -->
  </head>
  <body>
    <h1>Hello pwa</h1>
  </body>
</html>

6、接着来
安全上下文
要使 Web 应用程序可安装，它必须在安全上下文中提供。通常意味着它必须通过 HTTPS 提供。本地资源，如 localhost、127.0.0.1 和 file:// 也被视为安全。

我这么搞，首先满足了安全上下文吧？
对吧

7、然后
https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation

接下来让这个应用可以离线起来
https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/HTML_and_CSS

接着就是一个教程了

首先我优化了viewport
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Cycle Tracker</title>
    <link rel="stylesheet" href="style.css" />

声明我自己是个中文：
<html lang="zh">

8、开始写主程序

https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/JavaScript_functionality


const doButton = document.getElementById("dododo");
const outputArea = document.getElementById("output");

const randomPass = function (len = 16, mode = "high") {
    const lowerCaseArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
    const blockLetterArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const specialArr = ['!', '@', '-', '_', '=', '<', '>', '#', '*', '%', '+', '&', '^', '$'];
    const passArr = [];
    let password = '';
  
    //指定参数随机获取一个字符
    const specifyRandom = function (...arr) {
      let str = "";
      arr.forEach(item => {
        str += item[Math.floor(Math.random() * item.length)]
      });
      return str;
    }
  
    switch (mode) {
      case "high":
        //安全最高的
        password += specifyRandom(lowerCaseArr, blockLetterArr, numberArr, specialArr);
        passArr.push(...lowerCaseArr, ...blockLetterArr, ...numberArr, ...specialArr);
        break;
      case "medium":
        //中等的
        password += specifyRandom(lowerCaseArr, blockLetterArr, numberArr);
        passArr.push(...lowerCaseArr, ...blockLetterArr, ...numberArr);
        break;
      //低等的
      case "low":
        password += specifyRandom(lowerCaseArr, numberArr);
        passArr.push(...lowerCaseArr, ...numberArr);
        break;
      default:
        password += specifyRandom(lowerCaseArr, numberArr);
        passArr.push(...lowerCaseArr, ...numberArr);
    }
  
    const forLen = len - password.length;
    for (let i = 0; i < forLen; i++) {
      password += specifyRandom(passArr);
    }
  
    return password;
  }

doButton.addEventListener("click", (event) => {
    var outputHtml = "";
    for(var i=0;i<5;i++){
        pass1 = randomPass();
        outputHtml = outputHtml + pass1 + "</br>";
    }
    outputArea.innerHTML=outputHtml;
});



9、开始想办法能让它离线
https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Service_workers

