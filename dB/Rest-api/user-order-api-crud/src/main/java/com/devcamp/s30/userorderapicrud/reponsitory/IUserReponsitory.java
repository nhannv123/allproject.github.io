package com.devcamp.s30.userorderapicrud.reponsitory;

import com.devcamp.s30.userorderapicrud.modal.CUser;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserReponsitory extends JpaRepository<CUser, Long>{
}
