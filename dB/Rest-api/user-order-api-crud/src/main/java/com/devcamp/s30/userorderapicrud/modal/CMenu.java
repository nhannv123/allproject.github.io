package com.devcamp.s30.userorderapicrud.modal;

import javax.persistence.*;

@Entity
@Table(name = "menu")
public class CMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "size_pizza")
    private String size;

    @Column(name = "duong_kinh_pizza")
    private long duongKinh;

    @Column(name = "suon")
    private long suon;

    @Column(name = "salad")
    private long salad;

    @Column(name = "so_luong_nuoc_ngot")
    private long soLuongNuocNgot;

    @Column(name = "don_gia")
    private long donGia;

    public CMenu() {
    }

    public CMenu(String size, long duongKinh, long suon, long salad, long soLuongNuocNgot, long donGia) {
        this.size = size;
        this.duongKinh = duongKinh;
        this.suon = suon;
        this.salad = salad;
        this.soLuongNuocNgot = soLuongNuocNgot;
        this.donGia = donGia;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public long getDuongKinh() {
        return duongKinh;
    }

    public void setDuongKinh(long duongKinh) {
        this.duongKinh = duongKinh;
    }

    public long getSuon() {
        return suon;
    }

    public void setSuon(long suon) {
        this.suon = suon;
    }

    public long getSalad() {
        return salad;
    }

    public void setSalad(long salad) {
        this.salad = salad;
    }

    public long getSoLuongNuocNgot() {
        return soLuongNuocNgot;
    }

    public void setSoLuongNuocNgot(long soLuongNuocNgot) {
        this.soLuongNuocNgot = soLuongNuocNgot;
    }

    public long getDonGia() {
        return donGia;
    }

    public void setDonGia(long donGia) {
        this.donGia = donGia;
    }
}
