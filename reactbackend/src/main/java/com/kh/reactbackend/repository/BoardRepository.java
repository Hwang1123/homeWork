package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Board;
import java.util.Optional;

public interface BoardRepository {
    Optional<Board> findById(Long id);
    Long save(Board board);
    void delete(Board board);
}
