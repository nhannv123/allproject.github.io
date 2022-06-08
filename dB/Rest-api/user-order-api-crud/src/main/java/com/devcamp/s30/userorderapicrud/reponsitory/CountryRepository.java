package com.devcamp.s30.userorderapicrud.reponsitory;
import com.devcamp.s30.userorderapicrud.modal.CCountry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<CCountry, Long> {
	CCountry findByCountryCode(String countryCode);

}
