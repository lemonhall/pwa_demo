

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

            doButton.addEventListener("touchstart", (event) => {
                var outputHtml = "";
                for(var i=0;i<5;i++){
                    pass1 = randomPass();
                    outputHtml = outputHtml + pass1 + "</br>";
                }
                outputArea.innerHTML=outputHtml;
            });