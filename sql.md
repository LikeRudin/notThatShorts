나중에 mongoDB에서 SQL로 바꾸어보기위해서
코딩애플 강의를 듣고 sql을 필기했습니다.
ai한테 글씨 체만좀 정리해달라고 부탁했습니다.

### nodejs에서 sql 관리하기

MySQL 데이터베이스에서 쿼리를 실행, 결과를 출력하는 코드

```
connection.query('SELECT 어쩌구', function (에러, 결과, 필드) {
  if (에러){ console.log(에러) }
  console.log('result : ', 결과);
});
```

### SQL 인젝션(SQL injection)

악의적인 사용자가 입력을 조작하여 원치 않는 SQL 쿼리를 실행하게 하는 보안 취약점

사용자 입력을 그대로 쿼리에 포함하는 악의적 공격

- 테이블이 삭제될 수 있음

```
connection.query(' SELECT * FROM table1 WHERE 상품명 = "유저가입력한상품명" ', function (에러, 결과, 필드) {
  // 어쩌구~
});
```

SQL 인젝션 공격으로부터 데이터베이스를 보호하기 위한 필수적인 방법

쿼리를 바로 던지지말고 escape 처리해야 함

connection.escape

```
connection.query('SELECT * FROM table1 WHERE 상품명 = ' + connection.escape('유저가입력한상품명'), function (에러, 결과, 필드) {

});
```

플레이스홀더를 사용하여 쿼리를 구성하는것도 괜찮음

```
connection.query('SELECT * FROM users WHERE id = ?', ['유저가입력한거'], function (error, results, fields) {

});
```

# SQL 기본 강의 필기 PART 1

### 1. 테이블 생성과 데이터타입

데이터베이스는 폴더와 같으며 테이블은 파일과 같다. 테이블을 생성하기 위해서는 먼저 어떤 형태로 생겼는지 정의해야 한다. 이를 위해 컬럼(column)을 저장해야 한다. 컬럼 생성은 GUI에서 우클릭 후 '생성'을 선택하면 된다.

각 컬럼은 DataType을 명시해야 한다. 예를 들어, 가격은 숫자로 표현되어야 하므로 INT를 사용할 수 있다. 문자는 대표적으로 VARCHAR를 사용한다. CHAR, VARCHAR, Text, TinyText, MediumText, LongText 등의 문자 데이터 타입이 존재한다.

### 2. 데이터 출력과 정렬 (SELECT, ORDER BY)

데이터베이스에서 데이터를 출력하거나 정렬하기 위해서는 SQL의 SELECT와 ORDER BY 문을 사용한다. SELECT문은 테이블에서 하나 이상의 컬럼을 선택하고, ORDER BY 문은 결과 집합을 특정 컬럼 기준으로 정렬한다.

`SELECT * FROM product;`

위 문장은 product 테이블에서 모든 컬럼을 선택한다는 의미이다. 이때, '\*'는 모든 것을 의미한다. 여기에 컬럼 이름을 명시하면 해당 컬럼만을 선택한다.

`ORDER BY column_name ASC/DESC;`

ORDER BY 문은 특정 컬럼을 기준으로 결과를 정렬한다. ASC는 오름차순을, DESC는 내림차순을 의미한다.

### 3. 데이터 필터링 (WHERE)

WHERE 문을 사용하면 특정 조건을 만족하는 행(row)만 출력할 수 있다. 예를 들어, '가구' 카테고리에 속하는 제품만 출력하려면 다음과 같이 작성할 수 있다.

`SELECT * FROM product WHERE category = '가구';`

WHERE 문 뒤에는 다양한 조건식을 사용할 수 있다. 예를 들어, 비교 연산자인 =, !=, <, >, >=, <= 등을 사용할 수 있다.

`WHERE price BETWEEN lower_limit AND upper_limit;`

위의 문장은 가격이 특정 범위 내에 있는 행만 선택한다는 의미이다.

### 4. 다중 조건 사용 (AND, OR, NOT)

다중 조건을 사용하려면 AND와 OR 연산자를 사용한다.

`WHERE price = 5000 OR category = '가구';`

AND, OR 연산자가 여러 개 중첩되면 괄호를 사용해 명확하게 표현할 수 있다. 또한, NOT 연산자를 사용하면 조건을 부정할 수 있다.

### 5. 패턴 매

칭 (LIKE, %, _)
LIKE 연산자를 사용하면 특정 패턴을 가진 데이터를 검색할 수 있다. '%'는 0개 이상의 임의의 문자를, '_'는 하나의 임의의 문자를 의미한다.

`WHERE product_name LIKE '%소파%';`

위의 문장은 상품명에 '소파'가 포함된 모든 상품을 선택한다는 의미이다.

### 6. 집계 함수 (MIN, MAX, AVG, SUM)

집계 함수를 사용하면 특정 컬럼의 최소값(MIN), 최대값(MAX), 평균값(AVG), 합계(SUM) 등을 계산할 수 있다.

`SELECT MAX(price) FROM product;`

위의 문장은 product 테이블에서 가격 컬럼의 최대값을 구한다는 의미이다. AS 키워드를 사용하면 결과에 이름을 부여할 수 있다.

`SELECT MAX(price) AS Maximum_Price FROM product;`

또한, SELECT DISTINCT를 사용하면 중복을 제거한 유니크한 결과를 얻을 수 있다.

### 7. 숫자 조작 함수

숫자를 조작하는 SQL 함수로는 GREATEST, LEAST, FLOOR, CEIL, ROUND, TRUNCATE 등이 있다. 이들은 각각 최대값, 최소값, 내림, 올림, 반올림, 절사를 수행한다.

### 8. 서브쿼리

서브쿼리는 SELECT문 내부에 또 다른 SELECT문을 넣는 것을 말한다. 서브쿼리는 소괄호 () 내부에 위치해야 한다.

### 9. 그룹 별 통계 (GROUP BY, HAVING)

GROUP BY를 사용하면 특정 컬럼을 기준으로 그룹을 만들고, 집계 함수를 이용해 그룹별 통계를 내릴 수 있다. GROUP BY 뒤에는 HAVING을 사용해 특정 조건을 만족하는 그룹만 선택할 수 있다.

### 10. 조건 분기 (IF, CASE)

IF나 CASE 문을 사용하면 특정 조건에 따라 분기처리를 할 수 있다.

`IF (condition, true_value, false_value);`

`CASE
	WHEN condition1 THEN value1
	WHEN condition2 THEN value2
	ELSE default_value
END;`

CASE문은 조건이 여러 개인 경우에 사용하며, 조건식을 만족하는 여러 가지 경우 중 맨 윗줄에 있는 하나만 선택된다.

# Part 2. mySQL 기본 강의 필기

### 1. 테이블과 컬럼 생성에 SQL언어 사용하기

데이터를 다루는 문법은 Data Manipulation Language (DML), 형태를 다루는 문법은 Data Definition Language (DDL)라고 부릅니다. 데이터베이스 생성과 삭제는 다음과 같이 할 수 있습니다.

```
CREATE DATABASE DB이름;
DROP DATABASE DB이름;
```

테이블 생성, 삭제, 수정은 다음과 같이 할 수 있습니다.

```
CREATE TABLE DB이름.테이블이름 (
	컬럼이름 데이터타입 DEFAULT 기본값
	);

DROP TABLE 테이블이름;

MODIFY COLUMN 컬럼이름 데이터타입;
DROP COLUMN 컬럼이름;
ADD 컬럼이름 데이터타입 DEFAULT 값;
```

하지만 컬럼에 저장된 값에 따라 데이터타입 변경이 불가능할 수도 있습니다. 예를 들어, 문자가 저장된 컬럼을 INT 타입으로 변경하는 것은 불가능합니다.

### 2. COLUMN에 안전하게 제약(Constraints) 주기

저장된 값을 제한하기 위해 제약을 주는 것이 중요합니다. 이는 타입스크립트의 타입 체크와 비슷합니다.

```
컬럼이름 데이터타입 NOT NULL;    //NULL 값을 허용하지 않음
컬럼이름 데이터타입 UNIQUE;      //중복 값을 허용하지 않음
컬럼이름 데이터타입 CHECK (조건식); //특정 조건을 만족해야 함
컬럼이름 데이터타입 PRIMARY KEY; //유일한 값을 갖도록 강제
```

PRIMARY KEY는 NOT NULL과 UNIQUE 제약이 자동으로 부여되며, AUTO_INCREMENT를 함께 사용하면 값이 자동으로 1씩 증가해서 저장됩니다. CONSTRAINT 키워드를 이용하면 제약조건을 커스텀 제작할 수 있습니다.

### 3. 정규형을 통한 DB설계

정규화와 정규형에 대해 알아봅니다. JOIN 문법은 여러 개의 테이블을 합치는 것입니다. 테이블을 나눠 놓는 이유는 정규화 때문입니다.

- 제1 정규화 : 한 칸에는 하나의 데이터만
- 제2 정규화: 현재 테이블의 주제와 관련이 없는 컬럼은 다른 테이블로 분리
- 제3 정규화: 일반 컬럼에만 종속된 컬럼은 따로 분리

테이블을 쪼갤 때 첫 column은 항상 Primary key를 넣는 것이 좋고, 테이블 쪼갤때 유의사항
ㄱ. 첫 column은 항상 Primary key를 넣는게 좋습니다.
ㄴ. 다른테이블의 데이터 사용시 primary key를 적어야합니다.

ㄴ에서 사용하는 키를 Foreign key라고 부릅니다.
다른 테이블의 Primary key를 Foreign key라고 한합니다

myfirstproject20230531!

테이블 설정에서 foriegn keys를 눌러서
어떤 테이블의 primary key를 어디에 저장할지 선택해야합니다

foreign key 장점
ㄱ. 링크를통해 값을 확인하기 쉽다.
ㄴ. 다른테이블에서 쓰는데이터 실수로 삭제하는걸 방지합니다

### 4. 테이블을 합쳐보자 INNER JOIN

INNER JOIN을 사용하면 두 테이블을 연결할 수 있습니다. 이를테면, "program"과 "teacher" 테이블을 조인하려면 아래와 같이 작성할 수 있습니다.

```
SELECT * FROM program INNER JOIN teacher ON program.teacher_id = teacher.id;
```

또한, 여러 테이블을 동시에 조인하려면 아래와 같이 작성할 수 있습니다.

```
SELECT * FROM 테이블1
INNER JOIN 테이블2 ON 조건1
INNER JOIN 테이블3 ON 조건2;
```

CROSS JOIN은 가능한 모든 행의 조합을 출력합니다. 이는 모든 경우를 셀 때나 더미 데이터를 만들 때 사용합니다.

### 5. LEFT/ RIGHT JOIN

LEFT JOIN은 FROM 바로 뒤에 오는 테이블의 모든 행을 출력하고, RIGHT JOIN은 JOIN 뒤에 오는 테이블의 모든 행을 출력합니다. LEFT JOIN이나 RIGHT JOIN은 NULL 값을 추적하는데 유용하며, IS NULL 문법도 있습니다.

```
SELECT * FROM 테이블1 LEFT JOIN 테이블2 ON 조건;
WHERE column IS NULL;
```

### 6. INSERT로 데이터를 넣거나 복사하기

INSERT INTO를 사용하면 데이터를 테이블에 넣을 수 있습니다.

```
INSERT INTO 테이블명 (컬럼1, 컬럼2) VALUES (데이터1, 데이터2);
```

모든 컬럼에 데이터를 넣을 필요는 없으며, NULL 값이 허용되는 컬럼은 데이터를 넣지 않아도 됩니다. 데이터 값에 서브쿼리를 넣어도 됩니다.

테이블 간 데이터를 복사하거나 새 테이블을 생성하고 복사하려면 아래와 같이 작성할 수 있습니다.

```
INSERT INTO 테이블1 SELECT * FROM 테이블2;   // 데이터 복사
CREATE TABLE 새테이블 AS SELECT * FROM 기존테이블; // 새 테이블 생성 및 복사
```

### 7. 수정 삭제는 UPDATE/ DELETE

UPDATE와 DELETE를 사용하면 데이터를 수정하거나 삭제할 수 있습니다.

```
UPDATE 테이블명 SET 컬럼 = 값 WHERE 조건;  // 데이터 수정
DELETE FROM 테이블명 WHERE 조건; // 데이터 삭제
```

JOIN하여 생성한 테이블에서 데이터를 삭제하려면 아래와 같이 작성할 수 있습니다.

```
DELETE A FROM A INNER JOIN B ON 조건 WHERE 조건;
```

### 8. SELECT 결과를 합치는 UNION

UNION을 사용하면 SELECT 문의 결과를 합칠 수 있습니다. UNION

은 SELECT 문의 결과를 세로로 합칩니다.

```
SELECT 문1;
UNION
SELECT 문2;
```

### 9. Table 대신 View를 사용해보자

VIEW는 SELECT문을 저장한 가상의 테이블입니다. VIEW를 생성하려면 CREATE VIEW를 사용하며, 테이블처럼 보이지만 실제 테이블이 아닙니다. 따라서 저장 공간을 차지하지 않습니다.

```
CREATE VIEW 뷰이름 AS SELECT 컬럼1, 컬럼2 FROM 테이블명;
```

# Part 3. mySQL 기본 강의 필기

### 1. 저장 프로시져(Stored Procedure) 이해하고 사용하기

프로시저는 함수와 같이 코드를 재사용하는 기능을 제공합니다. 프로시저를 생성하려면 아래와 같이 작성하며, CALL 문을 이용해 호출합니다.

```
DELIMITER $$
CREATE PROCEDURE db이름.함수이름()
BEGIN
 여기에 쿼리문을 작성하세요;
END
$$
```

프로시저에서 자주 사용하는 값은 변수로 설정해 사용할 수 있습니다. SET 문을 이용하며, DECLARE 키워드를 이용해 프로시저 내부에서만 사용되는 지역 변수를 생성할 수 있습니다.

```
SET @변수명 = 값;
DECLARE 변수명 int DEFAULT 값;
```

프로시저에 매개변수를 설정하면 동적으로 내부 코드를 바꿀 수 있습니다.

```
CREATE PROCEDURE db명.함수명(매개변수 데이터타입)
```

### 2. 날짜와 시간 데이터 다루기

mySQL에서는 DATE, DATETIME, TIMESTAMP 타입을 이용해 날짜와 시간을 다룹니다. 이를 활용해 원하는 형식으로 포맷팅할 수 있습니다.

```
date_format(날짜, 바꾸고싶은형식)
```

### 3. 함수(Function) 사용하기

함수는 리턴값을 가지며, 프로시저와 다르게 CALL 사용하지 않고 바로 호출할 수 있습니다. 함수는 계산 등의 작업을 하고 결과를 반환하는 용도로 사용됩니다.

```
CREATE FUNCTION db명.함수이름
RETURNS INT
DETERMINISTIC
BEGIN
	RETURN 100;
END
```

### 4. IF문 사용하기

프로시저 내부에서 조건에 따라 다른 SQL 쿼리를 실행하려면 IF문을 사용합니다.

```
DELIMITER $$

IF 조건식 THEN
	실행할 SQL 쿼리;
ELSEIF 조건식2 THEN
	SQL쿼리;
ELSE
	쿼리문;
END IF ;
$$
```

### 5. 인덱스(INDEX)

인덱스는 데이터를 빠르게 찾아주는 역할을 합니다.

인덱스는 트리 구조를 가지며, 이는 BINARY SEARCH TREE, B-TREE, B+TREE 등 여러 형태가 있습니다.

인덱스를 통해 쿼리 실행 시간을 줄일 수 있습니다.

Binary Tree
B-TREE
B+TREE

### 6. FULL TEXT SEARCH

LIKE문을 사용할 때, 왼쪽에 %가 있다면 인덱스 사용이 불가합니다. 이 때, FULL TEXT 타입의 인덱스를 생성해 사용하면 좋습니다.

```
MATCH(검색컬럼) AGAINST(단어)
```

### 7. TRANSACTION

쿼리로인한 DB변화를 바로 반영하지않고 잠시 대기하게 만드는 기능입니다.

```
START TRANSACTION;
	INSERT INTO 테이블명 (컬럼명) VALUES (값);
	INSERT INTO 테이블명 (컬럼명) VALUES (값);
```

TRANSACTION 아래의 쿼리문은 실행되고, 당장 DB에 반영되지 않t습니다.

`COMMIT` 이나 `ROLLBACK` 으로 함수를 종료할 수있다.

COMMIT이 실행되면 보류되었던 내용들이 반영되며, ROLLBACK을 실행하면 보류되었던 것들이 전부 취소됩니다.

이처럼 mySQL의 여러 기능을 활용해보았습니다. 이를 통해 효율적인 데이터 관리와 분석이 가능합니다. 다음 강의에서는 더 많은 기능과 응용 방법을 알아보겠습니다.
