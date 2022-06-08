package com.devcamp.s30.userorderapicrud.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.devcamp.s30.userorderapicrud.modal.CUser;
import com.devcamp.s30.userorderapicrud.reponsitory.IUserReponsitory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin(value = "*",maxAge = -1)
public class CUserController {
    @Autowired
    IUserReponsitory pUserReponsitory;

    @GetMapping("/users")
    public ResponseEntity<List<CUser>> getAllUsers() {
        try {
            return new ResponseEntity<>(pUserReponsitory.findAll(),HttpStatus.OK);
        } catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable("id") long id) {
        try {
            return pUserReponsitory.findById(id).isPresent()
            ? new ResponseEntity<>(pUserReponsitory.findById(id).get(), HttpStatus.OK)
            : ResponseEntity.unprocessableEntity()
            .body("Cannot find user with id: " + id);
        } catch (Exception e) {
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/user")
    public ResponseEntity<Object> qcreateUser(@RequestBody CUser newUser) {
        try {
            CUser user = new CUser(newUser.getFullname(), newUser.getEmail(), newUser.getEmail(), newUser.getAddress());

            user.setCreated(new Date());
            user.setUpdate(null);
            pUserReponsitory.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity()
                .body("Failed to Create specified user: " + e.getCause().getCause().getMessage());
        }
    } 

    @PutMapping("/user/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable long id, @RequestBody CUser pUser) {
        Optional<CUser> userData = pUserReponsitory.findById(id);

        if(userData.isPresent()) {
            CUser user = userData.get();
            user.setFullname(pUser.getFullname());
            user.setAddress(pUser.getAddress());
            user.setEmail(pUser.getEmail());
            user.setPhone(pUser.getPhone());
            user.setUpdate(new Date());
            try {
                return new ResponseEntity<>(pUserReponsitory.save(user), HttpStatus.OK);
            } catch (Exception e) {

                return ResponseEntity.unprocessableEntity()
                .body("Can not execute operation of this Entity" + e.getCause().getCause().getMessage());
            }
        }else
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable long id) {
        Optional<CUser> userData = pUserReponsitory.findById(id);
        if(userData.isPresent()) {
            try {
                pUserReponsitory.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {

                return ResponseEntity.unprocessableEntity()
                .body("Can not execute operation of this Entity" + e.getCause().getCause().getMessage());
            }
        }else
            return new ResponseEntity<>("User not found!", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user-count")
    public ResponseEntity<Long> countUser() {
        try {
            return new ResponseEntity<>(pUserReponsitory.count(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/user-check/{id}")
    public  ResponseEntity<Boolean> checkUserbyId(@PathVariable long id) {
        try {
            return new ResponseEntity<Boolean>(pUserReponsitory.existsById(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Boolean>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}   