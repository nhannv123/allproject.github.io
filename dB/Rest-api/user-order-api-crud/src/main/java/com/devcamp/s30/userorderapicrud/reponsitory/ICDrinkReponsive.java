package com.devcamp.s30.userorderapicrud.reponsitory;

import com.devcamp.s30.userorderapicrud.modal.CDrink;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ICDrinkReponsive extends JpaRepository<CDrink, Long>{
    
}
