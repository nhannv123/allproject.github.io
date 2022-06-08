package com.devcamp.s30.userorderapicrud.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.devcamp.s30.userorderapicrud.modal.CDrink;
import com.devcamp.s30.userorderapicrud.reponsitory.ICDrinkReponsive;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin(value = "*", maxAge = -1)
public class CDrinkController {
    @Autowired
    ICDrinkReponsive pDrinkReponsive;

    @GetMapping("/drinks")
    public ResponseEntity<List<CDrink>> getAllDrinks() {
        try {
            return new ResponseEntity<>(pDrinkReponsive.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/drink/{id}")
    public ResponseEntity<Object> getDrinkById(@PathVariable long id) {
        if (pDrinkReponsive.findById(id).isPresent()) {
            return new ResponseEntity<>(pDrinkReponsive.findById(id).get(), HttpStatus.OK);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not find Drink with Id: " + id);
    }

    @PostMapping("/drink")
    public ResponseEntity<Object> createDrink(@RequestBody CDrink newDrink) {
        try {
            CDrink _drink = new CDrink(newDrink.getMaNuocUong(), newDrink.getTenNuocUong(), newDrink.getDonGia(),
                    newDrink.getGhiChu());
            _drink.setNgayTao(new Date());
            _drink.setNgayCapNhat(null);
            pDrinkReponsive.save(_drink);
            return new ResponseEntity<>(_drink, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/drink/{id}")
    public ResponseEntity<Object> updateDrink(@PathVariable long id, @RequestBody CDrink pDrink) {
        Optional<CDrink> drinkData = pDrinkReponsive.findById(id);
        if (drinkData.isPresent()) {
            CDrink _drink = drinkData.get();
            _drink.setDonGia(pDrink.getDonGia());
            _drink.setGhiChu(pDrink.getGhiChu());
            ;
            _drink.setMaNuocUong(pDrink.getMaNuocUong());
            _drink.setNgayCapNhat(new Date());
            _drink.setTenNuocUong(pDrink.getTenNuocUong());
            pDrinkReponsive.save(_drink);
            return new ResponseEntity<>(_drink, HttpStatus.OK);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Not find Drink With Id: " + id);
    }

    @DeleteMapping("/drink/{id}")
    public ResponseEntity<Object> deleteDrink(@PathVariable long id) {
        if(pDrinkReponsive.findById(id).isPresent()) {
            pDrinkReponsive.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Deleted Drink Successfully");
        }else  
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not find Drink with id: " + id);
    }
    @DeleteMapping("/drink/all")
    public ResponseEntity<Object> deleteAllDrink() {
       try {
        pDrinkReponsive.deleteAll();
        return ResponseEntity.status(HttpStatus.OK).body("Deleted All Drink Successfully");
       } catch (Exception e) {
          return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
}
