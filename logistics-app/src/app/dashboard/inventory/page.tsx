'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import InboundTab from './components/InboundTab';
import OutboundTab from './components/OutboundTab';
import HistoryTab from './components/HistoryTab';
import { useLogistics } from '@/context/LogisticsContext';

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

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('inbound'); // 'inbound', 'outbound', 'history'
  
  // Context API에서 이력 데이터 가져오기
  const { inventoryHistory, products, processInbound, processOutbound } = useLogistics();
  
  // 이력 데이터를 HistoryItem 형식으로 변환
  const historyData: HistoryItem[] = inventoryHistory.map(history => ({
    id: history.id,
    type: history.type,
    productId: history.productId,
    productName: history.productName,
    quantity: history.quantity,
    date: history.date.toLocaleString(),
    staff: history.staff,
    note: history.note || ''
  }));
  
  // 입고/출고 처리 후 이력 데이터 업데이트
  useEffect(() => {
    console.log('인벤토리 이력 업데이트:', inventoryHistory.length);
  }, [inventoryHistory]);
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
                  className="inline-flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900"
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
          <h1 className="text-2xl font-semibold text-gray-900">입출고 관리</h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 입출고 탭 */}
          <div className="mt-4 border-b border-gray-200">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button 
                    onClick={() => setActiveTab('inbound')}
                    className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'inbound' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    입고 관리
                  </button>
                  <button 
                    onClick={() => setActiveTab('outbound')}
                    className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'outbound' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    출고 관리
                  </button>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    이력 조회
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* 탭 내용 */}
          {activeTab === 'inbound' && <InboundTab historyData={historyData.filter(item => item.type === 'inbound')} products={products} processInbound={processInbound} />}
          {activeTab === 'outbound' && <OutboundTab historyData={historyData.filter(item => item.type === 'outbound')} products={products} processOutbound={processOutbound} />}
          {activeTab === 'history' && <HistoryTab historyData={historyData} />}
        </div>
      </div>
    </div>
  );
}
