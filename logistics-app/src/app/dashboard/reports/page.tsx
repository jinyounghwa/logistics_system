import React from 'react';
import Link from 'next/link';

export default function Reports() {
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
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
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
                  className="inline-flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900"
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
          <h1 className="text-2xl font-semibold text-gray-900">리포트</h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 리포트 필터 */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">리포트 설정</h2>
            <form className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
              <div>
                <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">
                  리포트 유형
                </label>
                <select
                  id="report-type"
                  name="report-type"
                  className="mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                >
                  <option value="inventory">재고 현황</option>
                  <option value="inbound">입고 통계</option>
                  <option value="outbound">출고 통계</option>
                  <option value="category">카테고리별 분석</option>
                </select>
              </div>

              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                  시작일
                </label>
                <input
                  type="date"
                  name="start-date"
                  id="start-date"
                  className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                />
              </div>

              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                  종료일
                </label>
                <input
                  type="date"
                  name="end-date"
                  id="end-date"
                  className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  리포트 생성
                </button>
                <button
                  type="button"
                  className="ml-3 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  CSV 다운로드
                </button>
              </div>
            </form>
          </div>

          {/* 그래프 및 차트 */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 월별 입출고 그래프 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">월별 입출고 현황</h3>
              <div className="mt-4 h-80 bg-gray-100 rounded flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500">이곳에 월별 입출고 그래프가 표시됩니다.</p>
                  <p className="text-sm text-gray-400 mt-2">데이터 시각화 라이브러리 필요 (Chart.js, D3.js 등)</p>
                </div>
              </div>
            </div>

            {/* 카테고리별 재고 분포 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">카테고리별 재고 분포</h3>
              <div className="mt-4 h-80 bg-gray-100 rounded flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500">이곳에 카테고리별 재고 분포 차트가 표시됩니다.</p>
                  <p className="text-sm text-gray-400 mt-2">데이터 시각화 라이브러리 필요 (Chart.js, D3.js 등)</p>
                </div>
              </div>
            </div>
          </div>

          {/* 상세 데이터 테이블 */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">상세 데이터</h2>
            <div className="mt-4 flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            날짜
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            입고 수량
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            출고 수량
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            순 변동
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            2025-05-26
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-green-600">
                            +45
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-red-600">
                            -23
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-blue-600 font-medium">
                            +22
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            2025-05-25
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-green-600">
                            +32
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-red-600">
                            -18
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-blue-600 font-medium">
                            +14
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            2025-05-24
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-green-600">
                            +15
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-red-600">
                            -27
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-red-600 font-medium">
                            -12
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            2025-05-23
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-green-600">
                            +38
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-red-600">
                            -15
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-blue-600 font-medium">
                            +23
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            2025-05-22
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-green-600">
                            +29
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-red-600">
                            -31
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-red-600 font-medium">
                            -2
                          </td>
                        </tr>
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                            합계
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-green-600">
                            +159
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-red-600">
                            -114
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-blue-600">
                            +45
                          </td>
                        </tr>
                      </tfoot>
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
