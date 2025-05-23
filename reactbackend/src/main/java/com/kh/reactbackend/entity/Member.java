package com.kh.reactbackend.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) //JPA 스펙상 필수 + 외부 생성 방지
@AllArgsConstructor
@Builder
@DynamicInsert// insert시에 null이 아닌 필드만 쿼리에 포함, default값 활용
@DynamicUpdate
public class Member {

    @Id
    @Column(name = "USER_ID", length = 30)
    private String userId;

    @Column(name = "USER_PWD", length = 100, nullable = false)
    private String userPwd;

    @Column(name = "USER_NAME", length = 15, nullable = false)
    private String userName;

    @Column(name = "GENDER", length = 1)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "PROFILE_URL", length = 10000)
    private String profileUrl;

    private Integer age;


    public enum Gender {
        M, F
    }


    public void updateMemberInfo(String userName, Gender gender, Integer age, String profileUrl) {
        this.userName = userName;
        this.gender = gender;
        this.age = age;
        this.profileUrl = profileUrl;
    }


}
