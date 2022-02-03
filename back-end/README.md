# Back End

## Initializing

1. ```npm install``` : dependency module 설치 (express, nodemon 등)

## How to Run

1. ```tsc -w```
   - typescript 컴파일 => javascript 파일로 변환, 경로는 설정해둔 dist
2. ```npm run start```
   - nodemon 으로 dist/server.js 실행

## Directory Summary

- server.ts : 루트 파일. 여기에 모든걸 import 하고 실행한다
- routes : controller 를 import 하고 각각의 url 에 컨트롤러에서 실행할 함수를 매핑한다
- controllers : service 를 import 하고 매핑된 url 에 따라 함수를 정의하고 service 계층의 핵심 로직을 실행시킨다
- services : models (Database 계층) 를 import 하고 핵심 로직을 실행시킨다
- models : DB 연결 및 CRUD 를 담당한다

## Naming

- SampleController, SampleRoute, SampleService 와 같이 해당 로직에 대한 이름 + 계층을 사용한다
