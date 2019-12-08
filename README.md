# @deptno/yiguana

![](https://github.com/deptno/yiguana/workflows/pr/badge.svg)
![](https://github.com/deptno/yiguana/workflows/master/badge.svg)

Yiguana-sdk,

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

## 객체
| 객체이름 | 설명 |
| --- | --- |
| Post | 글 |
| Comment | 댓글 혹은 답글, 답글의 경우 `commentId` 를 가지공 있다. |
| AggReport | 신고 누적 객체로 `reports` 라는 누적 카운트를 가지고 있다. |
| Report | 개별 신고 객체 |

## 다이어그램
[사용자 관점 시퀀스 다이어그램](asset/puml/sequence-diagram.puml)



