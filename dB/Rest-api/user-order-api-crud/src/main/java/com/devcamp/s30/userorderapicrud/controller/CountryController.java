package com.devcamp.s30.userorderapicrud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import com.devcamp.s30.userorderapicrud.modal.CCountry;
import com.devcamp.s30.userorderapicrud.reponsitory.CountryRepository;

@RestController
@RequestMapping("/")
@CrossOrigin(value = "*", maxAge = -1)
public class CountryController {
	@Autowired
	private CountryRepository countryRepository;

	@PostMapping("/countries")
	public ResponseEntity<Object> createCountry(@RequestBody CCountry cCountry) {
		try {
			CCountry newRole = new CCountry();
			newRole.setCountryName(cCountry.getCountryName());
			newRole.setCountryCode(cCountry.getCountryCode());
			newRole.setRegions(cCountry.getRegions());
			CCountry savedRole = countryRepository.save(newRole);
			return new ResponseEntity<>(savedRole, HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println("+++++++++++++++++++++::::: " + e.getCause().getCause().getMessage());
			return ResponseEntity.unprocessableEntity()
					.body("Failed to Create specified Voucher: " + e.getCause().getCause().getMessage());
		}
	}

	@PutMapping("/country/{id}")
	public ResponseEntity<Object> updateCountry(@PathVariable("id") Long id, @RequestBody CCountry cCountry) {
		Optional<CCountry> countryData = countryRepository.findById(id);
		if (countryData.isPresent()) {
			CCountry newCountry = countryData.get();
			newCountry.setCountryName(cCountry.getCountryName());
			newCountry.setCountryCode(cCountry.getCountryCode());
			newCountry.setRegions(cCountry.getRegions());
			CCountry savedCountry = countryRepository.save(newCountry);
			return new ResponseEntity<>(savedCountry, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/country/{id}")
	public ResponseEntity<Object> deleteCountryById(@PathVariable Long id) {
		try {
			Optional<CCountry> optional = countryRepository.findById(id);
			if (optional.isPresent()) {
				countryRepository.deleteById(id);
			} else {
				// countryRepository.deleteById(id);
			}
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/countries/{id}")
	public ResponseEntity<Object> getCountryById(@PathVariable Long id) {
		try {
			if (countryRepository.findById(id).isPresent())
				return new ResponseEntity<>(countryRepository.findById(id).get(), HttpStatus.OK);
			else
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find Country with id: " + id);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/countries")
	public ResponseEntity<List<CCountry>> getAllCountry() {
		try {
			return new ResponseEntity<>(countryRepository.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/countries/count")
	public ResponseEntity<Long> countCountry() {
		try {
			return new ResponseEntity<>(countryRepository.count(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/countries/check/{id}")
	public ResponseEntity<Boolean> checkCountryById(@PathVariable long id) {
		try {
			return new ResponseEntity<Boolean>(countryRepository.existsById(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Boolean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
