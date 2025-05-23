package com.kh.reactbackend.repository;

import com.kh.reactbackend.dto.MemberDto;
import com.kh.reactbackend.entity.Member;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository {
    void save(Member member);
    Optional<Member> findOne(String userId);
    Member findByUserIdAndUserPwd(String userId, String userPwd);
    void delete(Member member);
}
