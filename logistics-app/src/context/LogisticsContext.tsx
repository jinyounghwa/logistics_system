'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 상품 타입 정의
export type Product = {
  id: string;
  name: string;
  category: string;
  location: string;
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  optimalStockLevel?: number;
  stockStatus: 'low' | 'normal' | 'excess';
  createdAt: Date;
};

// 입출고 이력 타입 정의
export type InventoryHistory = {
  id: string;
  productId: string;
  productName: string;
  type: 'inbound' | 'outbound';
  quantity: number;
  date: Date;
  staff: string;
  note?: string;
};

// 컨텍스트 타입 정의
type LogisticsContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, 'stockStatus' | 'createdAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  inventoryHistory: InventoryHistory[];
  addInventoryHistory: (history: Omit<InventoryHistory, 'id' | 'date'>) => void;
  processInbound: (productId: string, quantity: number, staff: string, note?: string) => void;
  processOutbound: (productId: string, quantity: number, staff: string, note?: string) => void;
};

// 컨텍스트 생성
const LogisticsContext = createContext<LogisticsContextType | undefined>(undefined);

// 컨텍스트 제공자 컴포넌트
export const LogisticsProvider = ({ children }: { children: ReactNode }) => {
  // 상품 상태
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'A-001',
      name: '노트북',
      category: '전자제품',
      location: 'A-1-2',
      stockQuantity: 5,
      minStockLevel: 10,
      maxStockLevel: 30,
      stockStatus: 'low',
      createdAt: new Date('2025-05-20')
    },
    {
      id: 'B-042',
      name: '모니터',
      category: '전자제품',
      location: 'B-3-1',
      stockQuantity: 3,
      minStockLevel: 5,
      maxStockLevel: 20,
      stockStatus: 'low',
      createdAt: new Date('2025-05-21')
    },
    {
      id: 'C-103',
      name: '키보드',
      category: '전자제품',
      location: 'C-2-4',
      stockQuantity: 120,
      minStockLevel: 30,
      maxStockLevel: 100,
      stockStatus: 'excess',
      createdAt: new Date('2025-05-22')
    },
    {
      id: 'D-205',
      name: '마우스',
      category: '전자제품',
      location: 'D-1-3',
      stockQuantity: 45,
      minStockLevel: 20,
      maxStockLevel: 80,
      stockStatus: 'normal',
      createdAt: new Date('2025-05-23')
    }
  ]);

  // 입출고 이력 상태
  const [inventoryHistory, setInventoryHistory] = useState<InventoryHistory[]>([
    {
      id: 'H-001',
      productId: 'A-001',
      productName: '노트북',
      type: 'inbound',
      quantity: 10,
      date: new Date('2025-05-20'),
      staff: '김물류'
    },
    {
      id: 'H-002',
      productId: 'B-042',
      productName: '모니터',
      type: 'inbound',
      quantity: 5,
      date: new Date('2025-05-21'),
      staff: '이재고'
    },
    {
      id: 'H-003',
      productId: 'A-001',
      productName: '노트북',
      type: 'outbound',
      quantity: 5,
      date: new Date('2025-05-24'),
      staff: '박출고'
    },
    {
      id: 'H-004',
      productId: 'C-103',
      productName: '키보드',
      type: 'inbound',
      quantity: 120,
      date: new Date('2025-05-22'),
      staff: '김물류'
    }
  ]);

  // 재고 상태 계산 함수
  const calculateStockStatus = (
    stockQuantity: number,
    minStockLevel: number,
    maxStockLevel: number
  ): 'low' | 'normal' | 'excess' => {
    if (stockQuantity < minStockLevel) {
      return 'low';
    } else if (stockQuantity > maxStockLevel) {
      return 'excess';
    } else {
      return 'normal';
    }
  };

  // 상품 추가 함수
  const addProduct = (productData: Omit<Product, 'stockStatus' | 'createdAt'>) => {
    const stockStatus = calculateStockStatus(
      productData.stockQuantity,
      productData.minStockLevel,
      productData.maxStockLevel
    );

    const newProduct: Product = {
      ...productData,
      stockStatus,
      createdAt: new Date()
    };

    setProducts(prevProducts => [...prevProducts, newProduct]);

    // 입고 이력 추가
    addInventoryHistory({
      productId: newProduct.id,
      productName: newProduct.name,
      type: 'inbound',
      quantity: newProduct.stockQuantity,
      staff: '시스템',
      note: '상품 등록'
    });
  };

  // 상품 업데이트 함수
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // 상품 삭제 함수
  const deleteProduct = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== productId)
    );
  };

  // 입출고 이력 추가 함수
  const addInventoryHistory = (historyData: Omit<InventoryHistory, 'id' | 'date'>) => {
    const newHistory: InventoryHistory = {
      ...historyData,
      id: `H-${Date.now().toString().slice(-6)}`,
      date: new Date()
    };

    setInventoryHistory(prevHistory => [...prevHistory, newHistory]);
  };

  // 입고 처리 함수
  const processInbound = (productId: string, quantity: number, staff: string, note?: string) => {
    // 상품 찾기
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // 재고 수량 업데이트
    const updatedQuantity = product.stockQuantity + quantity;
    const updatedStockStatus = calculateStockStatus(
      updatedQuantity,
      product.minStockLevel,
      product.maxStockLevel
    );

    // 상품 업데이트
    const updatedProduct: Product = {
      ...product,
      stockQuantity: updatedQuantity,
      stockStatus: updatedStockStatus
    };

    updateProduct(updatedProduct);

    // 입고 이력 추가
    addInventoryHistory({
      productId,
      productName: product.name,
      type: 'inbound',
      quantity,
      staff,
      note
    });
  };

  // 출고 처리 함수
  const processOutbound = (productId: string, quantity: number, staff: string, note?: string) => {
    // 상품 찾기
    const product = products.find(p => p.id === productId);
    if (!product) return;
    if (product.stockQuantity < quantity) {
      alert('재고가 부족합니다.');
      return;
    }

    // 재고 수량 업데이트
    const updatedQuantity = product.stockQuantity - quantity;
    const updatedStockStatus = calculateStockStatus(
      updatedQuantity,
      product.minStockLevel,
      product.maxStockLevel
    );

    // 상품 업데이트
    const updatedProduct: Product = {
      ...product,
      stockQuantity: updatedQuantity,
      stockStatus: updatedStockStatus
    };

    updateProduct(updatedProduct);

    // 출고 이력 추가
    addInventoryHistory({
      productId,
      productName: product.name,
      type: 'outbound',
      quantity,
      staff,
      note
    });
  };

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const savedProducts = localStorage.getItem('logistics-products');
    const savedHistory = localStorage.getItem('logistics-history');

    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        // Date 객체로 변환
        const productsWithDates = parsedProducts.map((product: any) => ({
          ...product,
          createdAt: new Date(product.createdAt)
        }));
        setProducts(productsWithDates);
      } catch (error) {
        console.error('상품 데이터 로드 오류:', error);
      }
    }

    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Date 객체로 변환
        const historyWithDates = parsedHistory.map((history: any) => ({
          ...history,
          date: new Date(history.date)
        }));
        setInventoryHistory(historyWithDates);
      } catch (error) {
        console.error('이력 데이터 로드 오류:', error);
      }
    }
  }, []);

  // 데이터 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('logistics-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('logistics-history', JSON.stringify(inventoryHistory));
  }, [inventoryHistory]);

  return (
    <LogisticsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        inventoryHistory,
        addInventoryHistory,
        processInbound,
        processOutbound
      }}
    >
      {children}
    </LogisticsContext.Provider>
  );
};

// 컨텍스트 사용을 위한 훅
export const useLogistics = () => {
  const context = useContext(LogisticsContext);
  if (context === undefined) {
    throw new Error('useLogistics must be used within a LogisticsProvider');
  }
  return context;
};
