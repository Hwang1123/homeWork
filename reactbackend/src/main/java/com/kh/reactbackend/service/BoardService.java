package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.BoardDto;

import java.io.IOException;
import java.util.List;

public interface BoardService {

    BoardDto.Response getBoardDetail(Long boardNo);
    Long createBoard(BoardDto.Create boardDto) throws IOException;
    void deleteBoard(Long boardNo);
    BoardDto.Response updateBoard(Long boardNo ,BoardDto.Update boardDto) throws IOException;
}
