# @deptno/yiguana

![](https://github.com/deptno/yiguana/workflows/pr/badge.svg)
![](https://github.com/deptno/yiguana/workflows/master/badge.svg)

yiguana-sdk,

## gsi
- byUser: 유저별로 데이터를 가져온다.
- posts: 포스트 목록을 시간순으로 가져온다.
- postsByCategory: 포스트 목록을 카테고리별로 가져온다.
- comments: 특정 포스트에 대한 댓글 목록을 가져온다.
- reports: 신고된 리스트를 가져온다.(? 기억이 가)
- reports: 신고 종료된 리스트를 가져온다.(? 기억이 가물)물
- postsByChildrenUpdatedAt: `rk` + `childrenUpdatedAt` 최근 댓글이 달린 순으로 포스트 목록을 가져온다.
  
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

## CHANGELOG
[CHANGELOG](CHANGELOG)