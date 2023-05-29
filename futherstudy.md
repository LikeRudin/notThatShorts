# 세션

쿠키는 브라우저에 저장, 세션은 express가 데이터베이스에 저장.

둘다 session id를 저장한다

### 백엔드에서 쿠키와 세션을 확인하는법

- 쿠키: 미들웨어 내부에서 req.headers
- 세션: 미들웨어 내부에서 다음 코드를 통해 모든 세션을 출력할 수 있습니다.

  ```
  req.sessionStore.all((error, sessions) => {
      console.log(sessions);
      next();
  });
  ```

- req.sessionStore.all()
  - sessionStore에 저장된것을 전부 반환한다.
    - 말 그대로 session을 저장하는곳

+@ req.session.id 와 같이 프로퍼티 동적 추가를이용해 백엔드가 정보를 저장한다

### 브라우저에서 쿠키 확인 방법

- 개발자 도구의 Application 탭에서 확인

### 세션의 저장

기본적으로 DB에 저장하지 않는 한, 세션은 메모리에 저장

코드 변경 후 서버를 재시작하면 세션은 초기화

이 때문에 Mongo-Store가 필요
