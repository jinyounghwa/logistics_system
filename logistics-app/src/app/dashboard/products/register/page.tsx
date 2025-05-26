'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLogistics } from '@/context/LogisticsContext';

// 상품 카테고리 옵션
const CATEGORIES = [
  { id: 'electronics', name: '전자제품' },
  { id: 'office', name: '사무용품' },
  { id: 'furniture', name: '가구' },
  { id: 'consumables', name: '소모품' },
  { id: 'etc', name: '기타' }
];

// 보관 위치 옵션
const LOCATIONS = [
  { id: 'A', name: 'A 구역' },
  { id: 'B', name: 'B 구역' },
  { id: 'C', name: 'C 구역' },
  { id: 'D', name: 'D 구역' }
];

export default function ProductRegister() {
  const router = useRouter();
  const { addProduct } = useLogistics();
  
  // 상품 등록 폼 상태
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    category: '',
    price: '',
    cost: '',
    stockQuantity: '',
    minStockLevel: '',
    maxStockLevel: '',
    optimalStockLevel: '',
    location: '',
    description: '',
    supplier: '',
    imageUrl: '',
    stockStatus: 'normal' // 'low', 'normal', 'excess'
  });

  // 이미지 미리보기 URL
  const [previewUrl, setPreviewUrl] = useState('');
  
  // 폼 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // 수량 관련 필드인 경우 재고 상태 계산
    const newFormData = {
      ...formData,
      [name]: value
    };
    
    // 재고수량, 최소/최대 재고 수준이 변경되면 재고 상태 업데이트
    if (['stockQuantity', 'minStockLevel', 'maxStockLevel', 'optimalStockLevel'].includes(name)) {
      newFormData.stockStatus = calculateStockStatus(
        name === 'stockQuantity' ? Number(value) : Number(formData.stockQuantity),
        name === 'minStockLevel' ? Number(value) : Number(formData.minStockLevel),
        name === 'maxStockLevel' ? Number(value) : Number(formData.maxStockLevel)
      );
    }
    
    setFormData(newFormData);
  };
  
  // 재고 상태 계산 함수
  const calculateStockStatus = (quantity: number, minLevel: number, maxLevel: number): 'low' | 'normal' | 'excess' => {
    if (isNaN(quantity) || isNaN(minLevel)) return 'normal';
    
    if (quantity < minLevel) return 'low';
    if (maxLevel && quantity > maxLevel) return 'excess';
    return 'normal';
  };
  
  // 이미지 업로드 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 실제 업로드 대신 미리보기만 구현
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // 실제로는 이미지 URL을 서버에 업로드하고 반환된 URL을 저장해야 함
      setFormData(prev => ({
        ...prev,
        imageUrl: 'https://example.com/images/placeholder.jpg' // 임시 URL
      }));
    }
  };
  
  // 상품 ID 자동 생성
  const generateProductId = () => {
    // 카테고리 첫 글자 + 3자리 숫자
    const categoryPrefix = formData.category ? formData.category.charAt(0).toUpperCase() : 'X';
    const randomNum = Math.floor(Math.random() * 900) + 100; // 100-999 사이의 랜덤 숫자
    
    setFormData(prev => ({
      ...prev,
      productId: `${categoryPrefix}-${randomNum}`
    }));
  };
  
  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.productId || !formData.productName || !formData.category || !formData.stockQuantity || !formData.minStockLevel || !formData.maxStockLevel) {
      alert('상품 ID, 상품명, 카테고리, 재고수량, 최소/최대 재고 수준은 필수 입력 항목입니다.');
      return;
    }
    
    // 최소/최대 재고 수준 검증
    if (Number(formData.minStockLevel) >= Number(formData.maxStockLevel)) {
      alert('최소 재고 수준은 최대 재고 수준보다 작아야 합니다.');
      return;
    }
    
    // Context API를 통해 상품 추가
    addProduct({
      id: formData.productId,
      name: formData.productName,
      category: formData.category,
      location: formData.location,
      stockQuantity: Number(formData.stockQuantity),
      minStockLevel: Number(formData.minStockLevel),
      maxStockLevel: Number(formData.maxStockLevel),
      optimalStockLevel: formData.optimalStockLevel ? Number(formData.optimalStockLevel) : undefined
    });
    
    alert('상품이 성공적으로 등록되었습니다.');
    router.push('/dashboard/products');
    
    // 여기서 API 호출하여 상품 등록 처리
    console.log('상품 등록 데이터:', formData);
    
    // 성공 메시지 표시
    alert('상품이 성공적으로 등록되었습니다.');
    
    // 상품 목록 페이지로 이동
    router.push('/dashboard/products');
  };
  
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
                  className="inline-flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900"
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">상품 등록</h1>
            <Link
              href="/dashboard/products"
              className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 상품 등록 폼 */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 기본 정보 섹션 */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
                      상품 ID
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="productId"
                        id="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                        placeholder="예: A-123"
                      />
                      <button
                        type="button"
                        onClick={generateProductId}
                        className="ml-2 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                      >
                        자동생성
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                      상품명 *
                    </label>
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      required
                      value={formData.productName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                      placeholder="상품명을 입력하세요"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      카테고리 *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                    >
                      <option value="">카테고리 선택</option>
                      {CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                      공급업체
                    </label>
                    <input
                      type="text"
                      name="supplier"
                      id="supplier"
                      value={formData.supplier}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                      placeholder="공급업체명"
                    />
                  </div>
                </div>
              </div>
              
              {/* 가격 및 재고 정보 */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">가격 및 재고 정보</h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      판매가격 (원)
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
                      원가 (원)
                    </label>
                    <input
                      type="number"
                      name="cost"
                      id="cost"
                      value={formData.cost}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                      재고수량 *
                    </label>
                    <input
                      type="number"
                      name="stockQuantity"
                      id="stockQuantity"
                      required
                      value={formData.stockQuantity}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="minStockLevel" className="block text-sm font-medium text-gray-700">
                      최소 재고 수준 *
                    </label>
                    <input
                      type="number"
                      name="minStockLevel"
                      id="minStockLevel"
                      required
                      value={formData.minStockLevel}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                      placeholder="0"
                    />
                    <p className="mt-1 text-xs text-gray-500">이 수치 미만이면 재고 부족 상태로 표시됩니다</p>
                  </div>
                  
                  <div>
                    <label htmlFor="maxStockLevel" className="block text-sm font-medium text-gray-700">
                      최대 재고 수준 *
                    </label>
                    <input
                      type="number"
                      name="maxStockLevel"
                      id="maxStockLevel"
                      required
                      value={formData.maxStockLevel}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                      placeholder="0"
                    />
                    <p className="mt-1 text-xs text-gray-500">이 수치 초과시 재고 과장 상태로 표시됩니다</p>
                  </div>
                  
                  <div>
                    <label htmlFor="optimalStockLevel" className="block text-sm font-medium text-gray-700">
                      최적 재고 수준
                    </label>
                    <input
                      type="number"
                      name="optimalStockLevel"
                      id="optimalStockLevel"
                      value={formData.optimalStockLevel}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                      placeholder="0"
                    />
                    <p className="mt-1 text-xs text-gray-500">관리자가 정한 이상적인 재고 수준</p>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      보관 위치
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                    >
                      <option value="">위치 선택</option>
                      {LOCATIONS.map(location => (
                        <option key={location.id} value={location.id}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      재고 상태
                    </label>
                    <div className="mt-2 flex items-center">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${formData.stockStatus === 'low' ? 'bg-red-100 text-red-700' : formData.stockStatus === 'excess' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-700'}`}>
                        {formData.stockStatus === 'low' ? '재고 부족' : formData.stockStatus === 'excess' ? '재고 과잉' : '정상'}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        (현재 재고: {formData.stockQuantity || 0}, 최소: {formData.minStockLevel || 0}, 최대: {formData.maxStockLevel || 0})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 추가 정보 */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">추가 정보</h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      상품 설명
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                      placeholder="상품에 대한 상세 설명을 입력하세요"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
                      상품 이미지
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                    </div>
                    {previewUrl && (
                      <div className="mt-2">
                        <img
                          src={previewUrl}
                          alt="이미지 미리보기"
                          className="h-32 w-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 제출 버튼 */}
              <div className="flex justify-end space-x-3">
                <Link
                  href="/dashboard/products"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  상품 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
