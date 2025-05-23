package com.kh.reactbackend.dto;

import com.kh.reactbackend.entity.Member;
import lombok.*;

public class MemberDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create {
        private String userId;
        private String userPwd;
        private String userName;
        private String profileUrl;
        private Member.Gender gender;
        private Integer age;

        public Member toEntity() {
            return Member.builder()
                    .userId(this.userId)
                    .userPwd(this.userPwd)
                    .userName(this.userName)
                    .profileUrl(this.profileUrl)
                    .gender(this.gender)
                    .age(this.age)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Update {
        private String userName;
        private Member.Gender gender;
        private Integer age;
        private String profileUrl;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private String userId;
        private String userName;
        private String profileUrl;
        private Member.Gender gender;
        private Integer age;

        public static Response toDto(Member member) {
            return Response.builder()
                    .userId(member.getUserId())
                    .userName(member.getUserName())
                    .profileUrl(member.getProfileUrl())
                    .gender(member.getGender())
                    .age(member.getAge())
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LoginRequest {
        private String userId;
        private String userPwd;
    }
}

