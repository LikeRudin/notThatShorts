FFmpeg: records and converts media Stream

파일을 기록하고 변환하는 패키지

주요 메서드

- createFFmpeg()
- load()
- FS()
- run()
- fetchFile()
- exit()

        run load fetchFile 은 프로미스를 반환합니다.

# How to use

```
const ffmpeg = createFFmpeg({log: true});


    async() => {
    // load ffmpeg wasm-core script
    await ffmpeg.load();
    await ffmpeg.FS("function on file system", "filename", await fetchFile("FilePAth"));

    // 여기서 사용되는 인자들은 CLi 환경의 커맨드 순서로 입력한다.
    ffmpeg.run('-i', 'input file name', '-s','option 이책에선 해상도 ', 'converted file name');

    await ff.promises.writeFile("filepath", ffmpeg)
    process.exit()

    }

```

# CS 용어

- coreScript :primary or essential script which forms basis for a large software

- CDN contents delivery Network
- WASM WebAssembly
- MEMFS Memory file sysyem

## FFMpEG 메서드 및 인자 정리

### createFFmpeg({})

ffmpeg 객체를 생성한다

- 옵션 오브젝트에 들어가는 인자
  corepath,log, logger, progress

  log: boolean

  logger, progress - 함수

  corepath - CDN 경로. contents delivery network // 만약에 값 입력시 새로운 경로

### load()

ffmpeg의 핵심 웹어셈블리 코드를 가져옵니다

    core path값에 따라 fetch from CDM (by default ) or corepath (this is an argument of createFFmpeg)

### run()

ffmpeg의 핵심, 파일을 변환하는 메서드

ffmpeg라는 프로그램의 cli명렁어 순서로 인자를 입력합니다.

run('-i', "input filename", '-s', '해상도', 'converted filename')

    the arguments are wriitten cli command order.

    -i means start input set

    -s mean start output set

### FS()

operate File System

파일시스템 관리자 프로그램을 실행합니다.

FS(method, ..arg)

    - 인자
        - method: readfile openfile같은 FS만의 인자이름

- File System의 cli 명령어를 공부해야할거같다

### fetchFile()

여러 자원으로부터 파일을 가져오는역할

helper for fetching files from various resources

- 인자
  arg can be URL, base64String, File, Blob, buffer

### exit()

실행을 종료하고 메모리파일시스템을 메모리에서 해제함.

kill the execution of the program.

remove MEMFS to free memory

### +@ setLogging, setLogger, setProgress

# Blob Object

### what is the blob?

- definition: blob is pure-text basis file.

        blob can be read of text or binary data

블롭은 순수하게 텍스트형식으로된 여러가지 파일을 의미

### 주의사항

blob uses UTF-8

javascript uses UTF-16 as standard

```
blob은 UtF- 8 을 기본으로 사용하니 주의할것.
```

## how to use Blob

```
const myBlob = new Blob(array, {mime-type, ending})
```

- array에는 ArrayBuffer, TypedArray, Dataview, Blob등이 들어감.
- option object에는 MIME Type, ending이 들어간다.

- 인자
  ending
  - line ending nomarlization to perform

`string 의 끝부분을 정규화 할까말까?`

-> this has relation with being created from string data

ending can have one value in ['transparent', 'native']

transparent: keeps source's original ending - 안함

native: perform normalization - 함

## blob property:

### size, type

## blob method - arrayBuffer, slice, stream, text

### stream: return readableStream <- ??/

readableStream

-> represent stream that can read byte-unit data

https://developer.mozilla.org/ko/docs/Web/API/ReadableStream

### slice:

```
return blob
duplicate or create new blob from origin.
```

### text, arrayBuffer

```
return promise
text resolves with USV String

USV String??

-> represent Unicode scalar values.
maps to a String when return in javascript
```

# MediaRcorder

```
has a relationship with Media capturing, Streams API, Web RTC
```

## How to use

1. `<video>`

   create HTMl Tag - audio or video

2. `new MediaRecorder(stream, option object)`

   create MediaRecorder object

3. `instance.ondataavailable = (event) = >{}`

   set eventListener: ondataavailable

```
dataavailable event

triggered by

1. media stream ends + blob passed
2. MediaRecorder.stop() is executed
3. MediaRecorder.requestData() is executed
4. repeat with gap- literally (timeslice) passed on start()

```

4. `recording MediaRecorder.start()`

   source for recording must be ready

5. `MediaRecorder.stop`

   stop -> if source media (recording media) stops, then it stops automatically

## mediaRecorder Object properties and methods

### properties

- mimetype
- store
- stream
- videoBitsPerSecond
- audioBitsPerSecond

```
videoBitsPerSecond, audioBitsPerSecond

number of bits saved per second
it can be passed as args for option object when creating mediaRecorder obejct
```

## methods

### for instance

- pause()
- requestsData()
- resume()
- start()
- stop()

### static

- isTypeSupported()

### event

dataavilable, error, pause, resume, start, stop, warning

# URL api

for creating, analyzing, nomalization, ecoding URL

## properties

hash, host, hostname, href, origin, password, pathname, port, protocol, search, username

모든 property는 전부 USVString 타입이다.

## instance method

- toString()
- toJson()

having same value with URL.href

## static method

- createObjectURL()

```
return DOMString

DOMString

String global object
```

- revokeObjectURL()

```
remove URL
```
