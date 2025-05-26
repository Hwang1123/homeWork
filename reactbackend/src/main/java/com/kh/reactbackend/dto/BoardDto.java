package com.kh.reactbackend.dto;

import com.kh.reactbackend.entity.Board;
import com.kh.reactbackend.entity.Member;
import lombok.*;

import java.time.LocalDateTime;

public class BoardDto {

    @Getter
    @AllArgsConstructor
    public static class Create{
        private String boardTitle;
        private String boardContent;
        private String userId;


        public Board toEntity() {
            return Board.builder()
                    .boardTitle(this.boardTitle)
                    .boardContent(this.boardContent)

                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Update{
        private String boardTitle;
        private String boardContent;

        public Board toEntity() {
            return Board.builder()
                    .boardTitle(this.boardTitle)
                    .boardContent(this.boardContent)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response {

        private Long boardNo;
        private String boardTitle;
        private String boardContent;
        private LocalDateTime createDate;
        private Integer count;
        private String userId;
        private String userName;

        public static Response toDto(Board board) {
            return Response.builder()
                    .boardNo(board.getBoardNo())
                    .boardTitle(board.getBoardTitle())
                    .boardContent(board.getBoardContent())
                    .count(board.getCount())
                    .createDate(board.getCreateDate())
                    .userId(board.getMember()
                            .getUserId())
                    .userName(board.getMember()
                            .getUserName())
                    .build();
            //boardTag x boardTag가 여러개이기 때문에 하나마다 전부 -> tag추출
        }

        public static Response toSimpleDto(Board board) {
            return Response.builder()
                    .boardNo(board.getBoardNo())
                    .boardTitle(board.getBoardTitle())
                    .count(board.getCount())
                    .createDate(board.getCreateDate())
                    .userId(board.getMember()
                            .getUserId())
                    .build();
        }
    }
}