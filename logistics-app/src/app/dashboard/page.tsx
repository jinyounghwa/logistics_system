'use client';

import React from 'react';
import Link from 'next/link';
import { useLogistics } from '@/context/LogisticsContext';

export default function Dashboard() {
  // Context API에서 데이터 가져오기
  const { products, inventoryHistory } = useLogistics();
  
  // 재고 상태별 상품 수 계산
  const lowStockCount = products.filter(p => p.stockStatus === 'low').length;
  const normalStockCount = products.filter(p => p.stockStatus === 'normal').length;
  const excessStockCount = products.filter(p => p.stockStatus === 'excess').length;
  
  // 최근 이력 5개 가져오기
  const recentHistory = [...inventoryHistory]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 바 */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-xl font-bold text-blue-600">물류 관리 시스템</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  대시보드
                </Link>
                <Link
                  href="/dashboard/products"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  상품/재고
                </Link>
                <Link
                  href="/dashboard/inventory"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  입출고 관리
                </Link>
                <Link
                  href="/dashboard/reports"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  리포트
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative ml-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">관리자님</span>
                  <button
                    type="button"
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">대시보드</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 요약 카드 */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">총 상품 수</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{products.length}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">오늘 입고</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{lowStockCount}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">오늘 출고</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{excessStockCount}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">알림</dt>
                      <dd>
                        <div className="text-lg font-medium text-red-600">3</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 알림 섹션 */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">최근 알림</h2>
            <div className="mt-2 overflow-hidden rounded-lg bg-white shadow">
              <ul className="divide-y divide-gray-200">
                <li className="px-6 py-4 bg-red-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">상품 'A-001' 재고 부족 (현재: 5, 최소: 10)</p>
                      <p className="text-xs text-gray-500">2025-05-26 14:30</p>
                    </div>
                  </div>
                </li>
                <li className="px-6 py-4 bg-red-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">상품 'B-042' 재고 부족 (현재: 3, 최소: 15)</p>
                      <p className="text-xs text-gray-500">2025-05-26 10:15</p>
                    </div>
                  </div>
                </li>
                <li className="px-6 py-4 bg-yellow-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">상품 'C-103' 과잉 재고 (현재: 120, 최대: 100)</p>
                      <p className="text-xs text-gray-500">2025-05-25 18:45</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* 최근 입출고 이력 */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">최근 입출고 이력</h2>
            <div className="mt-2 flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            상품
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            유형
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            수량
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            일시
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            담당자
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {recentHistory.length > 0 ? (
                          recentHistory.map(history => (
                            <tr key={history.id}>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="text-sm text-gray-900">{history.productId}</div>
                                <div className="text-sm text-gray-500">{history.productName}</div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${history.type === 'inbound' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {history.type === 'inbound' ? '입고' : '출고'}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {history.quantity}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {history.date.toLocaleString()}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {history.staff}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                              이력이 없습니다.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
