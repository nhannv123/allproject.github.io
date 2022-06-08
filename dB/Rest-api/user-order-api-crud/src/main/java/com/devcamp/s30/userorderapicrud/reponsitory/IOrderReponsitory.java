package com.devcamp.s30.userorderapicrud.reponsitory;

import com.devcamp.s30.userorderapicrud.modal.COrder;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderReponsitory extends JpaRepository<COrder, Long>{
    
}
