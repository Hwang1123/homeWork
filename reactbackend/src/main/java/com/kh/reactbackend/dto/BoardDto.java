package com.kh.reactbackend.dto;

import com.kh.reactbackend.entity.Board;
import lombok.*;

import java.time.LocalDateTime;

public class BoardDto {

    @Getter
    @AllArgsConstructor
    public static class Create{
        private String board_title;
        private String board_content;
        private String user_id;


        public Board toEntity() {
            return Board.builder()
                    .boardTitle(this.board_title)
                    .boardContent(this.board_content)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Update{
        private String board_title;
        private String board_content;

        public Board toEntity() {
            return Board.builder()
                    .boardTitle(this.board_title)
                    .boardContent(this.board_content)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response {

        private Long board_no;
        private String board_title;
        private String board_content;
        private LocalDateTime create_date;
        private Integer count;
        private String user_id;
        private String user_name;

        public static Response toDto(Board board) {
            return Response.builder()
                    .board_no(board.getBoardNo())
                    .board_title(board.getBoardTitle())
                    .board_content(board.getBoardContent())
                    .count(board.getCount())
                    .create_date(board.getCreateDate())
                    .user_id(board.getMember()
                            .getUserId())
                    .user_name(board.getMember()
                            .getUserName())
                    .build();
            //boardTag x boardTag가 여러개이기 때문에 하나마다 전부 -> tag추출
        }

        public static Response toSimpleDto(Board board) {
            return Response.builder()
                    .board_no(board.getBoardNo())
                    .board_title(board.getBoardTitle())
                    .count(board.getCount())
                    .create_date(board.getCreateDate())
                    .user_id(board.getMember()
                            .getUserId())
                    .build();
        }
    }
}