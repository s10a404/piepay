'use client'

import {Payment} from "@/model/participant";
import {useQueryClient} from "@tanstack/react-query";
import Open from "@/app/(post-verification)/[meetId]/payment/approve/[payId]/page/Open";
import Complete from "@/app/(post-verification)/[meetId]/payment/approve/[payId]/page/Complete";
import QRCode from "@/app/(post-verification)/[meetId]/payment/approve/[payId]/page/QRCode";
import { useEffect, useState } from 'react';
import {usePayment} from "@/store/usePayment";
import { getCookie } from '@/util/getCookie';
import { Me } from '@/model/member';

type Props = {  params: { payId: string }}

export default function Page({ params}: Props) {
    const {payId} = params;
    const queryClient = useQueryClient();
    const p: Payment | undefined = queryClient.getQueryData(['payment',Number(payId)]);
    const {payment, setPayment} = usePayment();

    // 내 정보
    const [token, setToken] = useState('');
    useEffect(() => {
        const token = getCookie('accessToken') as string;
        setToken(token);
    }, [token]);

    useEffect(() => {
        // 만약 방 개설자 아니다 || 방 개설자지만 나갔다가 들어왔다면  => 서버에서 불러온 payment를 넣어주는 과정
        const myInfo: Me | undefined = queryClient.getQueryData(['userInfo',token]);
        if(payment || !p ) return;
        p.participants.sort((member)=>member.memberInfo.memberId==myInfo?.memberId ? -1 : 1)
        setPayment(p);
    }, [p]);

    return(<>
        { payment?.payStatus ==='OPEN' &&<Open payId={Number(payId)}/>}
        { payment?.payStatus ==='ING' && <QRCode payId={Number(payId)}/>}
        { payment?.payStatus ==='COMPLETE' && <Complete payId={Number(payId)}/>}
    </>)
}