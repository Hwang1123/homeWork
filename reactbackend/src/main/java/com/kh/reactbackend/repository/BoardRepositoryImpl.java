package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Board;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.Optional;

public class BoardRepositoryImpl implements BoardRepository {

    @PersistenceContext
    private EntityManager em;



    @Override
    public Optional<Board> findById(Long id) {
        if(id == null) return Optional.empty();
        return Optional.ofNullable(em.find(Board.class, id));
    }

    @Override
    public Long save(Board board) {
        em.persist(board);
        return board.getBoardNo();
    }

    @Override
    public void delete(Board board) {
        System.out.println("BoardNo : " + board.getBoardNo());
        em.remove(board);
    }
}
