import React from 'react';
import Link from 'next/link';

export default function Signup() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">물류 관리 시스템</h1>
          <p className="mt-2 text-sm text-gray-600">새 계정 등록하기</p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                placeholder="이름을 입력하세요"
              />
            </div>
            
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                이메일 주소
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                placeholder="이메일 주소를 입력하세요"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            
            <div>
              <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">
                비밀번호 확인
              </label>
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                placeholder="비밀번호를 다시 입력하세요"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                권한
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              >
                <option value="staff">물류 담당자</option>
                <option value="viewer">조회 전용 사용자</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">관리자 권한은 기존 관리자만 부여할 수 있습니다.</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              회원가입
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
              로그인하기
            </Link>
          </p>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>© 2025 물류 관리 시스템. All rights reserved.</p>
      </footer>
    </div>
  );
}
