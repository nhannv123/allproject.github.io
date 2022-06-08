package com.devcamp.s30.userorderapicrud.reponsitory;

import java.util.List;
import java.util.Optional;

import com.devcamp.s30.userorderapicrud.modal.CRegion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RegionRepository extends JpaRepository<CRegion, Long> {
	 List<CRegion> findByCountryId(Long countryId);
	 Optional<CRegion> findByIdAndCountryId(Long id, Long instructorId);
	 Long countRegionByCountryId(Long countryId);
}

