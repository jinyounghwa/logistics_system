<div align="center">
<img src="/image.jpg" alt="image" width="800" height="800">
</div>

# 물류 관리 시스템 (Logistics Management System)

## 프로젝트 개요

이 프로젝트는 상품 등록, 재고 관리, 입출고 처리를 통합적으로 관리할 수 있는 웹 기반 물류 관리 시스템입니다. Next.js와 React를 기반으로 개발되었으며, 상태 관리를 위해 Context API를 활용하여 모든 컴포넌트가 데이터를 공유할 수 있도록 구현하였습니다.

## 주요 기능

### 1. 상품 관리
- 상품 등록: 상품 ID, 이름, 카테고리, 위치, 재고 수량, 최소/최대 재고 수준 설정
- 상품 목록 조회: 등록된 상품 목록 표시 및 필터링
- 상품 삭제: 등록된 상품 삭제 기능
- 재고 상태 표시: 재고 수준에 따른 상태 표시 (low, normal, excess)

### 2. 입출고 관리
- 입고 처리: 상품 선택 및 입고 수량 입력을 통한 입고 처리
- 출고 처리: 상품 선택 및 출고 수량 입력을 통한 출고 처리 (재고 부족 검사 포함)
- 이력 관리: 입출고 이력 저장 및 조회

### 3. 대시보드
- 상품 현황 요약: 전체 상품 수, 재고 상태별 현황 표시
- 최근 입출고 이력: 최근 입출고 이력 표시

## 기술 스택

- **프론트엔드**: Next.js 15.3.2, React, TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: React Context API
- **데이터 저장**: LocalStorage

## 프로젝트 구조

```
logistics-app/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── page.tsx             # 대시보드 페이지
│   │   │   ├── products/
│   │   │   │   ├── page.tsx         # 상품 관리 페이지
│   │   │   │   ├── register/
│   │   │   │       └── page.tsx     # 상품 등록 페이지
│   │   │   ├── inventory/
│   │   │   │   ├── page.tsx         # 재고 관리 페이지
│   │   │   │   ├── components/
│   │   │   │       ├── InboundTab.tsx  # 입고 관리 컴포넌트
│   │   │   │       ├── OutboundTab.tsx # 출고 관리 컴포넌트
│   │   │   │       └── HistoryTab.tsx  # 이력 조회 컴포넌트
│   │   │   └── reports/
│   │   │       └── page.tsx         # 리포트 페이지
│   │   ├── layout.tsx              # 전체 레이아웃
│   │   └── page.tsx                # 랜딩 페이지
│   ├── context/
│   │   └── LogisticsContext.tsx    # 글로벌 상태 관리
│   └── components/
│       └── ...
├── public/
├── next.config.js                # Next.js 구성 파일
├── package.json
└── ...
```

## 주요 구현 사항

### Context API를 활용한 상태 관리

상품 등록, 재고 관리, 입출고 처리가 모두 통합되어 실시간으로 데이터가 반영되도록 Context API를 구현했습니다. 이를 통해 상품 등록이 재고 관리와 입출고 관리 시스템에 실시간으로 반영됩니다.

### 재고 상태 자동 계산

상품의 재고 수량에 따라 재고 상태(low, normal, excess)가 자동으로 계산되도록 구현했습니다. 이를 통해 재고 관리자가 재고 상태를 신속하게 파악할 수 있습니다.

### 입출고 처리 및 이력 관리

입고와 출고 처리시 자동으로 이력이 기록되며, 재고 수량이 업데이트됩니다. 출고 처리의 경우 재고 부족 여부를 검사하여 부족한 경우 출고가 처리되지 않도록 구현했습니다.

### 데이터 영속성

상품 데이터와 입출고 이력을 LocalStorage에 저장하여 페이지를 새로고침해도 데이터가 유지되도록 구현했습니다.

## 실행 방법

```bash
# 프로젝트 디렉토리로 이동
cd logistics-app

# 라이브러리 설치
yarn install

# 개발 서버 실행
yarn dev

# 빌드
yarn build

# 프로덕션 서버 실행
yarn start
```

## 미개발 목록

- 사용자 인증 및 권한 관리 기능 추가
- 데이터베이스 연동을 통한 데이터 영구 저장
- 상품 바코드 스캔 기능 추가
- 상품 이미지 업로드 기능 추가
- 리포트 및 통계 기능 개선
- 알림 및 알림 설정 기능 추가

## LiCENSE

MIT
