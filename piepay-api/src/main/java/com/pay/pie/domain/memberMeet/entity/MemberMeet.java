package com.pay.pie.domain.memberMeet.entity;

import com.pay.pie.domain.BaseEntity;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.member.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "member_meet")
public class MemberMeet extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_meet_id")
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "meet_id")
	private Meet meet;

	@Column(name = "top_fixed", columnDefinition = "boolean default false")
	private boolean topFixed;

	@Builder
	public MemberMeet(Member member, Meet meet) {
		this.member = member;
		this.meet = meet;
		meet.getMemberMeetList().add(this);
		member.getMemberMeetList().add(this);
	}
}