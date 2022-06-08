package com.devcamp.s30.userorderapicrud.controller;

import java.util.List;
import java.util.Optional;

import com.devcamp.s30.userorderapicrud.modal.CMenu;
import com.devcamp.s30.userorderapicrud.reponsitory.ICMenuReponsitory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin(value = "*", maxAge = -1)
public class CMenuController {
    @Autowired
    ICMenuReponsitory pMenuReponsitory;

    @GetMapping("/menus")
    public ResponseEntity<List<CMenu>> getAllMenus() {
        try {
            return new ResponseEntity<>(pMenuReponsitory.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/menu/{id}")
    public ResponseEntity<Object> getMenuById(@PathVariable long id) {
        Optional<CMenu> menuData = pMenuReponsitory.findById(id);
        if (menuData.isPresent()) {
            return new ResponseEntity<>(menuData.get(), HttpStatus.OK);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not find Menu with Id: " + id);
    }

    @PostMapping("/menu")
    public ResponseEntity<Object> createMenu(@RequestBody CMenu newMenu) {
        try {
            CMenu _menu = new CMenu(newMenu.getSize(), newMenu.getDuongKinh(), newMenu.getSuon(), newMenu.getSalad(),
                    newMenu.getSoLuongNuocNgot(), newMenu.getDonGia());
            pMenuReponsitory.save(_menu);
            return new ResponseEntity<>(_menu, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity()
                    .body("Failed to Create specified menu: " + e.getCause().getCause().getMessage());
        }
    }

    @PutMapping("/menu/{id}")
    public ResponseEntity<Object> updateMenu(@PathVariable long id, @RequestBody CMenu pMenu) {
        Optional<CMenu> menuData = pMenuReponsitory.findById(id);
        if(menuData.isPresent()) {
            CMenu _menu = menuData.get();
            _menu.setDonGia(pMenu.getDonGia());
            _menu.setDuongKinh(pMenu.getDuongKinh());
            _menu.setSalad(pMenu.getSalad());
            _menu.setSize(pMenu.getSize());
            _menu.setSoLuongNuocNgot(pMenu.getSoLuongNuocNgot());
            _menu.setSuon(pMenu.getSuon());
            pMenuReponsitory.save(_menu);

            return new ResponseEntity<>(_menu,HttpStatus.OK);
        }else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body("Not find Menu with Id: "+ id);
    }

    @DeleteMapping("/menu/{id}")
    public ResponseEntity<Object> deleteMenu(@PathVariable long id) {
        if(pMenuReponsitory.findById(id).isPresent()) {
            pMenuReponsitory.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Deleted Menu Seccessfully");
        }else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not find Menu with id: "+ id);
    }
    @DeleteMapping("/menu/all")
    public ResponseEntity<Object> deleteAllMenu() {
       try {
        pMenuReponsitory.deleteAll();;
        return ResponseEntity.status(HttpStatus.OK).body("Deleted All Menu Seccessfully");
       } catch (Exception e) {
          return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
}
