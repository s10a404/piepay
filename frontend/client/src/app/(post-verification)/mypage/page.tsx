'use client';

import { faker } from '@faker-js/faker';
import React from 'react';
import { useRouter } from 'next/navigation';
import { getDate } from '@/util/dateFormat';
import * as styles from '@/styles/mypage/myPageMain.css';
import MyInfo from '@/app/(post-verification)/mypage/component/MyInfo';
import MyAccount from '@/app/(post-verification)/mypage/component/MyAccount';
import { QueryClient } from '@tanstack/react-query';
import { getMembers } from '@/api/member';
import UnpaidInfo from './component/UnpaidInfo';

const Borrower = {
  memberId: 5,
  profileImage: faker.image.avatar(),
  nickname: '속석주',
};
const UnsettledBox = {
  createAt: new Date().toString(),
  Borrower: Borrower,
};
const Meet = {
  meetId: 1,
  meetName: '갈까마귀모임',
  meetImage: faker.image.avatar(),
};

const Receipt = {
  payId: 1,
  storeName: '(주) 뽕족 강남점',
  totalAmount: 40500,
};
const Payment = {
  createAt: new Date().toString(),
  meet: Meet,
  receipt: Receipt,
};

export default function MyPage() {
  const route = useRouter();

  // const token = cookies().get('accessToken');

  // const {meetId} = params;
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({queryKey: ['members', meetId, token?.value], queryFn: getMembers});
  return (
    <div className={styles.container}>
      <MyInfo />
      <MyAccount />
      <UnpaidInfo />
      <section>
        <div className="flex justify-between mb-2">
          <p className="font-bold text-lg">결제 내역</p>
          <button
            onClick={() => route.push('mypage/payment-list')}
            className="text-gray-500 text-xs"
          >
            더 보기
          </button>
        </div>
        <div className="flex flex-col h-[100%] justify-between p-4 bg-white rounded-xl shadow-xl">
          <div className="flex">
            <p className="mr-3 text-sm text-gray-500">
              {getDate(new Date(Payment.createAt))}
            </p>
            <p className="text-green-600 text-sm">정산 완료</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-sm">{Payment.meet.meetName}</p>
            <p className="font-bold text-lg">{Payment.receipt.storeName}</p>
          </div>
          <div className="flex justify-end w-[100%]">
            <p className="text-lg font-bold">
              {Payment.receipt.totalAmount.toLocaleString()} 원
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
