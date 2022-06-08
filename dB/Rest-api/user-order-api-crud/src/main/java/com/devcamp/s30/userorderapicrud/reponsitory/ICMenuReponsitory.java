package com.devcamp.s30.userorderapicrud.reponsitory;

import com.devcamp.s30.userorderapicrud.modal.CMenu;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ICMenuReponsitory extends JpaRepository<CMenu, Long>{
    
}
