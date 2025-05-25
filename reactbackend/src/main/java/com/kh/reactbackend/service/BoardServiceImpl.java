package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.BoardDto;
import com.kh.reactbackend.entity.Board;
import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.repository.BoardRepository;
import com.kh.reactbackend.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardServiceImpl implements BoardService {


    @Override
    public BoardDto.Response getBoardDetail(Long boardNo) {
        return null;
    }

    @Override
    public Long createBoard(BoardDto.Create boardDto) throws IOException {
        return 0L;
    }

    @Override
    public void deleteBoard(Long boardNo) {

    }

    @Override
    public BoardDto.Response updateBoard(Long boardNo, BoardDto.Update boardDto) throws IOException {
        return null;
    }
}
