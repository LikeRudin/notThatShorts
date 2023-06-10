# apiRouter

ReferenceError: registerView is not defined

import 를 안해주어서 다시 추가했다.

http://localhost:8000

# EditProfile

non-social login user로 로그인후
프로파일을 수정하자 다음과 같은 오류가 출력되었다.

usercontroller- avatarUrl에 문제가 있는듯하다

```
C:\Users\MY\Desktop\clone\deeprun\notThatShorts\src\controllers\userController.js:205
            avatarUrl: file.path || avatarUrl,
                            ^

TypeError: Cannot read properties of undefined (reading 'path')
```

console.log(avatarUrl) 을 추가하자
undefined 가 출력되었다.

다시 console.log(req.session.user) 로
user 객체가 담고있는 정보를 확인해주었다.

```
postEdit is running
{
  _id: '6483df52f432a071b833abf2',
  email: '223@444.com',
  socialOnly: false,
  username: 'MyName',
  password: '$2b$10$koUeI4.KFrOW92j07e0BX.cKVyxmE48pPIVPvXAJnC/R6XoeZABXi',
  name: 'MyName',
  comments: [],
  videos: [],
  location: 'seoul',
  __v: 0
}
```

db 에서 유저정보를 한번더 지워보고
안되면 바로 아틀라스로 db를 옮기자

1.avatarUrl 에 제대로된 정보를 넣어서 해결

2. req.body 가 parse 안되는 문제

multer를 postEdit 이전에 넣어서 해결

## npm run build

mini-css 를 설치해주지 않았다.

```

[webpack-cli] Failed to load 'C:\Users\MY\Desktop\clone\deeprun\notThatShorts\webpack.config.js' config
[webpack-cli] Error: Cannot find module 'mini-css-extra-plugin'
```

npm install --save-dev mini-css-extract-plugin

```

ERROR in commentSection
Module not found: Error: Can't resolve '.src/client/js/videopage/commentSection.js' in 'C:\Users\MY\Desktop\clone\deeprun\notThatShorts'

ERROR in main
Module not found: Error: Can't resolve '.src/client/js/main.js' in 'C:\Users\MY\Desktop\clone\deeprun\notThatShorts'

ERROR in videoPlayer
Module not found: Error: Can't resolve '.src/client/js/videopage/videoPlayer.js' in 'C:\Users\MY\Desktop\clone\deeprun\notThatShorts'

```

webpack의 CLINET_JS_PATH 에 오타가 있었다

const CLIENT_JS_PATH = "./src/client/js/";
