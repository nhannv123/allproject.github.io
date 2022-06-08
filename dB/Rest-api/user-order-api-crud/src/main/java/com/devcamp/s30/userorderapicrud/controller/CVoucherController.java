package com.devcamp.s30.userorderapicrud.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.devcamp.s30.userorderapicrud.modal.CVoucher;
import com.devcamp.s30.userorderapicrud.reponsitory.IVoucherRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin(value = "*", maxAge = -1)
public class CVoucherController {
    @Autowired
    IVoucherRepository pIVoucherRepository;

    @GetMapping("/vouchers")
    public ResponseEntity<List<CVoucher>> getAllVoucher() {
        try {
            return new ResponseEntity<>(pIVoucherRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/voucher/{id}")
    public ResponseEntity<Object> getVoucherById(@PathVariable long id) {
        if (pIVoucherRepository.findById(id).isPresent()) {
            return new ResponseEntity<>(pIVoucherRepository.findById(id).get(), HttpStatus.OK);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not find Voucher with Id: " + id);
    }

    @PostMapping("/voucher")
    public ResponseEntity<Object> createVoucher(@RequestBody CVoucher newVoucher) {
        try {
            newVoucher.setNgayTao(new Date());
            newVoucher.setNgayCapNhat(null);
            return new ResponseEntity<>(pIVoucherRepository.save(newVoucher), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/voucher/{id}")
    public ResponseEntity<Object> updateVoucher(@PathVariable long id, @RequestBody CVoucher pVoucher) {
        Optional<CVoucher> voucherData = pIVoucherRepository.findById(id);
        if (voucherData.isPresent()) {
            CVoucher _voucher = voucherData.get();
            _voucher.setPhanTramGiamGia(pVoucher.getPhanTramGiamGia());
            _voucher.setMaVoucher(pVoucher.getMaVoucher());
            _voucher.setGhiChu(pVoucher.getGhiChu());
            _voucher.setNgayCapNhat(new Date());
            pIVoucherRepository.save(_voucher);
            return new ResponseEntity<>(_voucher, HttpStatus.OK);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not find Voucher with Id: " + id);
    }

    @DeleteMapping("/voucher/{id}")
    public ResponseEntity<Object> deleteVoucher(@PathVariable long id) {
        Optional<CVoucher> voucherData = pIVoucherRepository.findById(id);
        if (voucherData.isPresent()) {
            try {
                pIVoucherRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not find Voucher with Id: " + id);
    }

    @DeleteMapping("/voucher/all")
    public ResponseEntity<Object> deleteAllVoucher() {
        try {
            pIVoucherRepository.deleteAll();
            ;
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
