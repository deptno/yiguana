# @deptno/yiguana

![](https://github.com/deptno/yiguana/workflows/pr/badge.svg)
![](https://github.com/deptno/yiguana/workflows/master/badge.svg)

yiguana-sdk,

## v2
- [ ] read, view, get 이 비슷한 의미를 가진다 통일 가능한지
  - Comment.read
  - User.get
  - Post.view
  
## uml
### 유스케이스
#### 보기
![](asset/svg/usecase-get.svg)
#### 생성,수정,삭제</summary>
![](asset/svg/usecase-put.svg)
### 클래스 다이어그램
![](asset/svg/class-diagram.svg)
### 시퀀스 다이어그램
![](asset/svg/sequence-diagram.svg)

---

### Yiguana SDK V0 흐름도
![](asset/svg/sdk-v0.svg)

## log
```shell script
DEBUG=yiguana
DEBUG=yiguana:assert
DEBUG=yiguana:api:common
DEBUG=yiguana:api:post
DEBUG=yiguana:api:comment
DEBUG=yiguana:api:reply
DEBUG=yiguana:api:administrator:report
DEBUG=yiguana:api:administrator:aggReport
DEBUG=yiguana:api:user
DEBUG=yiguana:api:user:post
DEBUG=yiguana:api:user:comment
DEBUG=yiguana:api:user:reply
DEBUG=yiguana:api:user:report
DEBUG=yiguana:store:s3
DEBUG=yiguana:store:ddb
```
