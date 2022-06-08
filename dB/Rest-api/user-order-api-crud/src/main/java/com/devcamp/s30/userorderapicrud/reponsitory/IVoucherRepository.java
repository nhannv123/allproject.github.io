package com.devcamp.s30.userorderapicrud.reponsitory;


import com.devcamp.s30.userorderapicrud.modal.CVoucher;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IVoucherRepository extends JpaRepository<CVoucher, Long>{
    
}

