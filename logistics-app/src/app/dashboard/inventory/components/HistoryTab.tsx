import React, { useState, useEffect } from 'react';
import { useLogistics, Product } from '@/context/LogisticsContext';

// 이력 데이터 타입 정의
type HistoryItem = {
  id: string;
  type: 'inbound' | 'outbound'; // 입고 또는 출고 타입
  productId: string;
  productName: string;
  quantity: number;
  date: string;
  staff: string;
  note: string;
};

interface HistoryTabProps {
  historyData: HistoryItem[];
}

const HistoryTab = ({ historyData }: HistoryTabProps) => {
  // Context API에서 상품 목록 가져오기
  const { products } = useLogistics();
  const [filterData, setFilterData] = useState({
    historyType: 'all',
    startDate: '',
    endDate: '',
    productFilter: '',
    staff: ''
  });

  // 필터링된 이력 데이터
  const [filteredHistoryData, setFilteredHistoryData] = useState<HistoryItem[]>(historyData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('이력 조회 필터:', filterData);
    
    // 필터링 로직 구현
    const filtered = historyData.filter(item => {
      // 유형 필터링
      if (filterData.historyType !== 'all' && item.type !== filterData.historyType) {
        return false;
      }
      
      // 날짜 필터링
      if (filterData.startDate && new Date(item.date.replace(/-/g, '/')) < new Date(filterData.startDate)) {
        return false;
      }
      
      if (filterData.endDate && new Date(item.date.replace(/-/g, '/')) > new Date(filterData.endDate + ' 23:59:59')) {
        return false;
      }
      
      // 상품 필터링
      if (filterData.productFilter && item.productId !== filterData.productFilter) {
        return false;
      }
      
      // 담당자 필터링
      if (filterData.staff && !item.staff.includes(filterData.staff)) {
        return false;
      }
      
      return true;
    });
    
    setFilteredHistoryData(filtered);
    alert('이력 조회가 완료되었습니다.');
  };

  // 컴포넌트 마운트 시 초기 데이터 설정
  useEffect(() => {
    setFilteredHistoryData(historyData);
  }, [historyData]);

  const handleExcelDownload = () => {
    console.log('엑셀 다운로드 요청');
    alert('엑셀 파일 다운로드가 시작되었습니다.');
  };

  return (
    <>
      {/* 이력 조회 필터 */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-gray-900">이력 조회</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          <div>
            <label htmlFor="history-type" className="block text-sm font-medium text-gray-700">
              유형
            </label>
            <select
              id="history-type"
              name="historyType"
              value={filterData.historyType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              <option value="all">전체</option>
              <option value="inbound">입고</option>
              <option value="outbound">출고</option>
            </select>
          </div>

          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
              시작일
            </label>
            <input
              type="date"
              name="startDate"
              id="start-date"
              value={filterData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
              종료일
            </label>
            <input
              type="date"
              name="endDate"
              id="end-date"
              value={filterData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="product-filter" className="block text-sm font-medium text-gray-700">
              상품
            </label>
            <select
              id="product-filter"
              name="productFilter"
              value={filterData.productFilter}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              <option value="">전체</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.id} - {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="staff" className="block text-sm font-medium text-gray-700">
              담당자
            </label>
            <select
              id="staff"
              name="staff"
              value={filterData.staff}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              <option value="">전체 담당자</option>
              <option value="김물류">김물류</option>
              <option value="이창고">이창고</option>
              <option value="박재고">박재고</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              조회
            </button>
            <button
              type="button"
              onClick={handleExcelDownload}
              className="ml-3 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              엑셀 다운로드
            </button>
          </div>
        </form>
      </div>

      {/* 이력 조회 결과 */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">조회 결과</h2>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        유형
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        상품
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
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        비고
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredHistoryData.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.type === 'inbound' ? '입고' : '출고'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-900">{item.productId}</div>
                          <div className="text-sm text-gray-500">{item.productName}</div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.date}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.staff}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.note}
                        </td>
                      </tr>
                    ))}
                    {filteredHistoryData.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          조회된 이력이 없습니다. 다른 필터 조건을 시도해보세요.
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

      {/* 페이지네이션 */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            이전
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            다음
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              전체 <span className="font-medium">{filteredHistoryData.length}</span> 개 항목 중{' '}
              <span className="font-medium">1</span> 에서{' '}
              <span className="font-medium">{Math.min(filteredHistoryData.length, 10)}</span> 까지 표시
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">이전</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </a>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                3
              </a>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">다음</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryTab;
