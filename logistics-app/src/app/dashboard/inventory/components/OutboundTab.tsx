import React, { useState } from 'react';
import { Product } from '@/context/LogisticsContext';

// 이력 데이터 타입 정의
type HistoryItem = {
  id: string;
  type: 'inbound' | 'outbound';
  productId: string;
  productName: string;
  quantity: number;
  date: string;
  staff: string;
  note: string;
};

interface OutboundTabProps {
  historyData: HistoryItem[];
  products: Product[];
  processOutbound: (productId: string, quantity: number, staff: string, note?: string) => void;
}

const OutboundTab = ({ historyData, products, processOutbound }: OutboundTabProps) => {
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    note: ''
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.product || !formData.quantity) {
      alert('상품과 수량을 입력해주세요.');
      return;
    }
    
    const quantity = parseInt(formData.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      alert('유효한 수량을 입력해주세요.');
      return;
    }
    
    // 선택한 상품 찾기
    const selectedProduct = products.find(p => p.id === formData.product);
    if (!selectedProduct) {
      alert('유효한 상품을 선택해주세요.');
      return;
    }
    
    // 재고 부족 확인
    if (selectedProduct.stockQuantity < quantity) {
      alert(`재고가 부족합니다. 현재 재고: ${selectedProduct.stockQuantity}`);
      return;
    }
    
    // Context API를 통해 출고 처리
    processOutbound(
      formData.product,
      quantity,
      '김물류', // 실제로는 로그인한 사용자 정보를 사용
      formData.note || '고객 주문'
    );
    
    // 성공 후 폼 초기화
    setFormData({
      product: '',
      quantity: '',
      note: ''
    });
    
    alert('출고 처리가 완료되었습니다.');
  };

  return (
    <>
      {/* 출고 등록 폼 */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-gray-900">출고 등록</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label htmlFor="product-out" className="block text-sm font-medium text-gray-700">
              상품 선택
            </label>
            <select
              id="product-out"
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              <option value="">상품을 선택하세요</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.id} - {product.name} (재고: {product.stockQuantity})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quantity-out" className="block text-sm font-medium text-gray-700">
              수량
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity-out"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              placeholder="수량을 입력하세요"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="note-out" className="block text-sm font-medium text-gray-700">
              비고
            </label>
            <textarea
              id="note-out"
              name="note"
              rows={3}
              value={formData.note}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              placeholder="출고 사유 및 추가 정보를 입력하세요"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              출고 처리
            </button>
          </div>
        </form>
      </div>

      {/* 최근 출고 이력 */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">최근 출고 이력</h2>
        <div className="mt-4 flex flex-col">
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
                    {historyData.map((item) => (
                      <tr key={item.id}>
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
                    {historyData.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                          출고 이력이 없습니다.
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
    </>
  );
};

export default OutboundTab;
