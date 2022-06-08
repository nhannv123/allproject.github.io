package com.devcamp.s30.userorderapicrud.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.devcamp.s30.userorderapicrud.modal.COrder;
import com.devcamp.s30.userorderapicrud.modal.CUser;
import com.devcamp.s30.userorderapicrud.reponsitory.IOrderReponsitory;
import com.devcamp.s30.userorderapicrud.reponsitory.IUserReponsitory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/")
@CrossOrigin(value = "*", maxAge = -1)
public class COrderController {
    @Autowired
    IOrderReponsitory pOrderReponsitory;

    @Autowired
    IUserReponsitory pUserReponsitory;

    @GetMapping("/orders")
    private ResponseEntity<List<COrder>> getAllOrders() {
        List<COrder> listOrders = new ArrayList<>();

        try {
            pOrderReponsitory.findAll()
                    .forEach(listOrders::add);
            return new ResponseEntity<>(listOrders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/orders/{id}")
    private ResponseEntity<COrder> getOrderById(@PathVariable long id) {
        Optional<COrder> orderData = pOrderReponsitory.findById(id);

        if (orderData.isPresent()) {
            return new ResponseEntity<>(orderData.get(), HttpStatus.OK);
        } else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/order/search/userId={id}")
    public ResponseEntity<Set<COrder>> getOrderByUserId(@PathVariable("id") long userId) {
        Optional<CUser> userData = pUserReponsitory.findById(userId);

        if (userData.isPresent()) {
            Set<COrder> order = userData.get().getOrders();
            return new ResponseEntity<>(order, HttpStatus.OK);
        } else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PostMapping("/order/create/{id}")
    public ResponseEntity<Object> createOrder(@PathVariable long id, @RequestBody COrder newOrder) {

        COrder order = new COrder();
        Optional<CUser> userData = pUserReponsitory.findById(id);
        try {
            if (userData.isPresent()) {
                order.setCreated(new Date());
                order.setUpdated(null);
                order.setOrderCode(newOrder.getOrderCode());
                order.setPaid(newOrder.getPaid());
                order.setPizzaSize(newOrder.getPizzaSize());
                order.setPizzaType(newOrder.getPizzaType());
                order.setPrice(newOrder.getPrice());
                order.setVoucherCode(newOrder.getVoucherCode());

                CUser _User = userData.get();
                order.setcUser(_User);
                pOrderReponsitory.save(order);
                return new ResponseEntity<Object>(order, HttpStatus.OK);
            } else
                return ResponseEntity.unprocessableEntity().body(
                        "User not Exist");
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity()
                    .body("Can not execute operation about this Entity" + e.getCause().getMessage());
        }
    }

    @PutMapping("/order/update/{id}")
    public ResponseEntity<Object> updateOrder(@PathVariable long id, @RequestBody COrder pOrder) {
        Optional<COrder> orderData = pOrderReponsitory.findById(id);
        if (orderData.isPresent()) {
            try {
                COrder order = orderData.get();
                order.setUpdated(new Date());
                order.setOrderCode(pOrder.getOrderCode());
                order.setPaid(pOrder.getPaid());
                order.setPizzaSize(pOrder.getPizzaSize());
                order.setPizzaType(pOrder.getPizzaType());
                order.setPrice(pOrder.getPrice());
                order.setVoucherCode(pOrder.getVoucherCode());
                pOrderReponsitory.save(order);
                return new ResponseEntity<>(order, HttpStatus.OK);
            } catch (Exception e) {

                return ResponseEntity.unprocessableEntity()
                        .body("Can not execute operation of this Entity" + e.getCause().getCause().getMessage());
            }
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not find User with id");
    }

    @DeleteMapping("/order/delete/{id}")
    public ResponseEntity<Object> deleteOrder(@PathVariable long id) {
        try {
            Optional<COrder> orderData = pOrderReponsitory.findById(id);
            if (orderData.isPresent()) {
                pOrderReponsitory.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not find User with id");
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity()
                    .body("Can not Found with id " + e.getCause().getMessage());
        }
    }
}
