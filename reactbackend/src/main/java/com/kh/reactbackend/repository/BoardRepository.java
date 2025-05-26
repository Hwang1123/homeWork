package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.Optional;

public interface BoardRepository {
    Page<Board> findByStatus(Pageable pageable);
    Optional<Board> findById(Long id);
    Long save(Board board);
    void delete(Board board);

    Collection<Board> findTop5ByCount();
    void updateCount(Long boardNo);
}
