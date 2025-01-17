"use client";


import {ReactNode, useEffect, useState} from "react";
import * as mainStyles from "@/styles/main/main.css";
import * as meetMemberStyles from "@/styles/meet/meetMember.css";
import Image from "next/image";
import backIcon from "@/assets/icons/back.svg";
import * as fontStyles from "@/styles/fonts.css";
import {useRouter} from "next/navigation";
import MemberCard from "@/app/(post-verification)/[meetId]/member/component/MemberCard";
import {useQueryClient} from "@tanstack/react-query";
import {getCookie} from "@/util/getCookie";
import {MeetMember} from "@/model/meet/member";
import {Payment} from "@/model/meet/payment";
import {memberList} from "@/styles/payment/select/memberList.css";
import {Me} from "@/model/member";


type Props = {
    params: { meetId: string },
}


export default function Members({params}: Props) {
    const {meetId} = params;
    const router = useRouter();
    const queryClient = useQueryClient();

    const token = getCookie('accessToken');
    const memberList: MeetMember[]|undefined  = queryClient.getQueryData(['meetMembers', meetId, token]);
    const userInfo: Me|undefined  = queryClient.getQueryData(['userInfo', token]);
    const [members, setMembers] = useState<MeetMember[]>([]);
    const [categoryStatus, setCategoryStatus] = useState<number>(0);
    const [totalPayCount, setTotalPayCount] = useState<number>(0);

    useEffect(() => {
        const paymentList: Payment[]|undefined = queryClient.getQueryData(['meetPayments', meetId, token]);
        if (typeof memberList !== 'undefined') {
            setMembers(sortByName(memberList));
        }

        if (typeof paymentList !== 'undefined') {
            setTotalPayCount(paymentList.length);
        }
    }, []);

    useEffect(() => {
        if (members.length > 0) {
            let sortedMembers;
            switch (categoryStatus) {
                case 0:
                    sortedMembers = sortByName([...members]);
                    break;
                case 1:
                    sortedMembers = sortByPaytotal([...members]);
                    break;
                case 2:
                    sortedMembers = sortByPaycount([...members]);
                    break;
                default:
                    sortedMembers = sortByName([...members]);
                    break;
            }
            setMembers(sortedMembers);
        }
    }, [categoryStatus]);

    const sortByName = (memberData: MeetMember[]):MeetMember[] => {
        return [...memberData].sort((a, b) => a.nickname.localeCompare(b.nickname));
    };

    const sortByPaytotal = (memberData: MeetMember[]):MeetMember[] => {
        return [...memberData].sort((a, b) => {
            if (a.payTotal > b.payTotal) return -1;
            if (a.payTotal < b.payTotal) return 1;

            return 0;
        });
    };

    const sortByPaycount = (memberData: MeetMember[]):MeetMember[] => {
        return [...memberData].sort((a, b) => {
            if (a.payCount > b.payCount) return -1;
            if (a.payCount < b.payCount) return 1;

            return 0;
        });
    };

    const onClickBack = () => {
        router.back();
    };

    return (
        <section>
            <header className={mainStyles.detailHeader}>
                <button onClick={onClickBack}>
                    <Image src={backIcon} alt="back icon" width={36} height={36}/>
                </button>
                <h1 className={fontStyles.bold}>모임 멤버</h1>
            </header>
            <div className={mainStyles.categoryContainer.smallMargin}>
                <h5>멤버 {typeof members !== 'undefined' && members.length}</h5>
            </div>
            {typeof memberList !== 'undefined' && members.map((member: MeetMember, index) => {
                return (
                    <MemberCard params={{ member, category: categoryStatus, totalPayCount: totalPayCount, index, myId: userInfo?.memberId }} key={ member.memberId } />
                );
            })}
            <footer className={meetMemberStyles.categoryLayout}>
                <button className={`${meetMemberStyles.categoryButton} ${fontStyles.bold} ${categoryStatus === 0 && meetMemberStyles.categoryButtonActive}`} onClick={() => setCategoryStatus(0)}>기본 보기</button>
                <button className={`${meetMemberStyles.categoryButton} ${fontStyles.bold} ${categoryStatus === 1 && meetMemberStyles.categoryButtonActive}`} onClick={() => setCategoryStatus(1)}>지출 금액</button>
                <button className={`${meetMemberStyles.categoryButton} ${fontStyles.bold} ${categoryStatus === 2 && meetMemberStyles.categoryButtonActive}`} onClick={() => setCategoryStatus(2)}>참여 횟수</button>
            </footer>
        </section>
    );
}