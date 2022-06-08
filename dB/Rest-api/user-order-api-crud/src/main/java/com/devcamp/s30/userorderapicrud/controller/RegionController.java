package com.devcamp.s30.userorderapicrud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import com.devcamp.s30.userorderapicrud.modal.CCountry;
import com.devcamp.s30.userorderapicrud.modal.CRegion;
import com.devcamp.s30.userorderapicrud.reponsitory.CountryRepository;
import com.devcamp.s30.userorderapicrud.reponsitory.RegionRepository;

@RestController
@RequestMapping("/")
@CrossOrigin(value = "*",maxAge = -1)
public class RegionController {
	@Autowired
	private RegionRepository regionRepository;
	
	@Autowired
	private CountryRepository countryRepository;
	
	@PostMapping("/region/{id}")
	public ResponseEntity<Object> createRegion(@PathVariable("id") Long id, @RequestBody CRegion cRegion) {
		try {
			Optional<CCountry> countryData = countryRepository.findById(id);
			if (countryData.isPresent()) {
			CRegion newRole = new CRegion();
			newRole.setRegionName(cRegion.getRegionName());
			newRole.setRegionCode(cRegion.getRegionCode());
			
			CCountry _country = countryData.get();
			newRole.setCountry(_country);
			newRole.setCountryName(_country.getCountryName());
			
			CRegion savedRole = regionRepository.save(newRole);
			return new ResponseEntity<>(savedRole, HttpStatus.CREATED);
			}
		} catch (Exception e) {
			System.out.println("+++++++++++++++++++++::::: "+e.getCause().getCause().getMessage());
			return ResponseEntity.unprocessableEntity().body("Failed to Create specified Voucher: "+e.getCause().getCause().getMessage());
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PutMapping("/region/{id}")
	public ResponseEntity<Object> updateRegion(@PathVariable("id") Long id, @RequestBody CRegion cRegion) {
		Optional<CRegion> regionData = regionRepository.findById(id);
		if (regionData.isPresent()) {
			CRegion newRegion = regionData.get();
			newRegion.setRegionName(cRegion.getRegionName());
			newRegion.setRegionCode(cRegion.getRegionCode());
			CRegion savedRegion = regionRepository.save(newRegion);
			return new ResponseEntity<>(savedRegion, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/region/{id}")
	public ResponseEntity<Object> deleteRegionById(@PathVariable Long id) {
		try {
			regionRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/regions/{id}")
	public ResponseEntity<Object> getRegionById(@PathVariable Long id) {
		try {
			return regionRepository.findById(id).isPresent()
			? new ResponseEntity<>(regionRepository.findById(id).get(), HttpStatus.OK)
			: ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find Region with id: " + id);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	@GetMapping("/regions")
	public ResponseEntity<List<CRegion>> getAllRegions() {
		try {
			return new ResponseEntity<>(regionRepository.findAll(),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/country/{countryId}/regions")
    public ResponseEntity<List<CRegion>> getRegionsByCountry(@PathVariable(value = "countryId") Long countryId) {
       try {
		   return new ResponseEntity<>(regionRepository.findByCountryId(countryId), HttpStatus.OK);
	   } catch (Exception e) {
		   return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	   }
    }
	
	@GetMapping("/country/{countryId}/regions/{id}")
    public Optional<CRegion> getRegionByRegionAndCountry(@PathVariable(value = "countryId") Long countryId,@PathVariable(value = "id") Long regionId) {
        return regionRepository.findByIdAndCountryId(regionId,countryId);
    }

	@GetMapping("/region-count/{countryid}")
	public ResponseEntity<Long> countRegionByCountryId(@PathVariable("countryid") long countryId) {
		try {
			return new ResponseEntity<>(regionRepository.countRegionByCountryId(countryId),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/region/check/{id}")
	public ResponseEntity<Boolean> checkRegionById(@PathVariable long id) {
		try {
			return new ResponseEntity<Boolean>(regionRepository.existsById(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Boolean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}


