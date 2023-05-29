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
            /layout
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
