유투브 클론 졸업작품

not that shorts

# 파일 계획

```
/src
    server.js
    db.js
    init.js
    middlewares.js
    /models
        video.js
        user.js
        comment.js
    /controllers
        userController.js
        videoController.js
    /routers
        rootRouter.js
        userRouter.js
        apiRouter.js
    /views
        /mixins
            message.pug
            video.pug
        /partials
            footer.pug
            header.pug
            social-login.pug
        /users
            change-password.pug
            profile.pug
        404.pug
        layout.pug
        edit-profile.pug
        edit.pug
        home.pug
        join.pug
        login.pug
        search.pug
        upload.pug
        video-page.pug
    /client
        /js
            main.js
            /upload
                recorder.js
            /videopage
                commentSection.js
                videoPlayer.js
        /scss
            /config
            /components
            /screens
            style.scss
```

# 프로젝트 계획

1. 패키지 설치
2. 폴더 및 파일 생성
3. 개념정리 및 코딩
4. 배포
5. 디자인
6. 기능 추가

### 이슈

1. 현재 강의를 50% 정도밖에 안들었다.
2. 배포과정, client과정은 하면서 공부해야한다.

---

# 20230529

1.  readme.md 파일 생성
2.  폴더 분류 및 파일 생성
3.  패키지 설치

    - package.json으로 최신버전의 패키지를 설치하기
      버전을 "\*" 으로 입력해준다

    ```
     "pug": "*"
    ```

    - js 오브젝트와는 다르게 package.json에선 {} 블록 내부 마지막 항목에 , 를 붙이면 안된다.

      -Trailing comma 문제 메시지가 발생한다.

    - 유료 패키지
      - npm fund 키워드로 지불 수단을 찾을수 있다.
        90 packages are looking for funding
        run `npm fund` for details

4.  모델 생성

모델은 다음과 같은 순서로 생성합니다.

```
1. 스키마 선언

const 스키마이름 = new mongoose.schema({속성:{옵션}})

2. 미들웨어 선언

스키마이름.pre("Hook 걸어줄 작업", 메서드 콜백)

스키마이름.static("호출에 사용할 이름", 메서드 콜백)


3. 모델만들기

const 모델이름 = mongoose.model("모델이름", 스키마이름)

4. export default 모델이름

-> 사용하는곳에서 원하는 이름으로 import 가능

주의사항

이때,  this 사용시 상위스코프에 정적 바인딩되는 화살표 콜백을 사용하면 안됩니다.
실제로는 모델.미들웨어 식으로 객체 바인딩되어 사용되므로, 메서드형태 콜백을 써야합니다.
```

mongoDB 용어정리

```
1. document - 실제로 저장하는 데이터
2. collection - 같은 형태의 document들 모음
3. schema - collection에 저장되는 document들의 형태를 정의
4. model - schema의 형태를 갖는 데이터들이 mongoose를 통해 mongoDb와 의사소통을 가능케함

shema로 형태를 만들고 model로 mongoDb와 의사소통을 가능케 하여
document를 저장시 collection에 저장된다
```

type

```
type: mongoose.Schema.Types.ObjectId 은 항상 ref와 함께온다.

ref가 참조하는 mongoDB collection을 저장한다
 {type: mongoose.Schema.Types.ObjectId, required:true, ref: "User"},
```

스키마의 속성하나에 여러 데이터가 할당될시 배열로 지정해준다 []

```
    hashtags: [{type: String, trim: true}],

    comments: [
        {type: mongoose.Schema.Types.ObjectId, required:true, ref:"Comment" }
    ],

```

isModified - isDirectModified와 알아두자.

https://mongoosejs.com/docs/api/document.html#Document.prototype.isModified()

```
Document.prototype.isModified()

입력받은 경로 및 하위 속성에 바뀐 값이 있는지 체크

Parameters:
[path] «String» optional
Returns:
«Boolean»

인자 있음 - 인자부터 하위속성중 번경값이 있으면 true 아니면 false
인자 없음 - 해당경로의 하위속성중 하나라도 변했으면 true



Example:
doc.set('documents.0.title', 'changed');
doc.isModified()                      // true
doc.isModified('documents')           // true
doc.isModified('documents.0.title')   // true
doc.isModified('documents otherProp') // true
doc.isDirectModified('documents')     // false

Document.prototype.isDirectModified

정확히 해당 경로의 속성이 변했는지 체크

Parameters:
[path] «String|Array[String]»
Returns:
«Boolean»

doc.set('documents.0.title', 'changed');
doc.isDirectModified('documents.0.title') // true
doc.isDirectModified('documents') // false

```

user.js 내부의 save 훅 메서드를 분리해주었다.

5. server.js의 express 객체 설정

다음과 같은 절차로 설정한다

```
app.use

1. view engine 세팅
2. body-parser 세팅
    - req.body 를 사용하기위해 필요하다.
    - express.unlencoded와 express.json으로대체
3. session 세팅
    - 아직 Db연결이 안되었으므로, store값은 주석처리 해주었다.

4. 기타 middleware 세팅
    morgan, localsMiddleware(res.locals로 pug에 변수제공) , flash 등

5. express.static으로 server-side에서 보내줄 파일들의 폴더를 지정.

6. 기타 라우터 연결
    root, api, video, user를 각각연결해주었다.
```

6. db.js 에서 mongoDb 설정 및 연결

다음과 같은 절차로 설정한다

```
mongoose.connect("MONGODB URL", {
    connectoption object
});

const db = mongoose.connection;

db.on("error", ()=> {print error});
db.once("open", ()=> {print success message});
```

여기서 db (mongoose.connection)은 eventEmitter를 상속받는 객체이다.

https://nodejs.dev/en/learn/the-nodejs-event-emitter/

once는 한번 실행후 자동으로 이벤트리스너가 제거된다.
일회용 on이라고 생각하자

다음 init.js에

import "./db" 를 추가해준다.

7. init.js 파일 코드작성

server.js에서 만든 app (express 인스턴스) 를 실제로
실행하는 곳이다.

아래와 같이 특정 컴포넌트 사용없이 그저 파일을 import 해주는것은
해당 파일들을 실행하기 위해서이다.

```
import "regenerator-runtime";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";


client/js/layout/main.js도 같은기능을한다.

```

다음과 같은 절차로 구성한다.

```
1. PORT 변수 생성
2. app.listen(PORT, ()=> {서버의 시작을 print 한다})
```

# 230606

현재 배포제외 모든 강의 수강을 완료했다.
일단 천천히 따라가며 버그픽스를 하고, 원하는 기능을 추가하자

적어도 8일까지는 목업 프로그램을 배포해야한다

# 230607

github login

Oauth 를 제대로 클리어했다.

1. github에 post -> code를 반환
2. client_id, client_secretm code -> access_token
3. access_token을 사용해서 email을 찾기
4. 해당 email, github ID가 DB에 존재시 로그인 / 비존재시 User.create({})

github login 및 프로파일 확인 과정을 직접 확인하기위해
프로그램을 실행하여 진행했다.

남은 작업리스트

- pug

  - video-page.pug

- router: api Router

- controller: video controller-api Router
  - register view
  - create comment

# 230610

남은 작업리스트

- router: api Router

- controller: video controller-api Router

  - register view
  - create comment

- frontend part
  - video player
  - comment Secction
- webpack

## small HTML 태그

    작은 글씨를 나타낼 때 사용한다.
    small 과 css중 어떤것을 사용할지는 사용자의맘

    하지만 css 컨트롤을 편하게 하기위해 small을 도입하자

```
    https://developer.mozilla.org/ko/docs/Web/HTML/Element/small
```

watch pug는 강의내용과 똑같아지는거같아 걱정이다.
일단 배포 및 제출은 해야되니 빨리 구현부터 하고 수정하자
