package com.devcamp.s30.userorderapicrud.modal;
import java.util.Date;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "drinks")
public class CDrink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "ma_nuoc_uong")
    private String maNuocUong;

    @Column(name = "ten_nuoc_uong")
    private String tenNuocUong;

    @Column(name = "don_gia")
    private long donGia;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ngay_tao", nullable = true, updatable = false)
    @CreatedDate
    private Date ngayTao;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ngay_cap_nhat", nullable = true)
    @LastModifiedDate
    private Date ngayCapNhat;
    
    @Column(name = "ghi_chu")
    private String ghiChu;
    public CDrink() {
    }
   
    public CDrink(String maNuocUong, String tenNuocUong, long donGia, String ghiChu) {
        this.maNuocUong = maNuocUong;
        this.tenNuocUong = tenNuocUong;
        this.donGia = donGia;
        this.ghiChu = ghiChu;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getMaNuocUong() {
        return maNuocUong;
    }
    public void setMaNuocUong(String maNuocUong) {
        this.maNuocUong = maNuocUong;
    }
    public String getTenNuocUong() {
        return tenNuocUong;
    }
    public void setTenNuocUong(String tenNuocUong) {
        this.tenNuocUong = tenNuocUong;
    }
    public long getDonGia() {
        return donGia;
    }
    public void setDonGia(long donGia) {
        this.donGia = donGia;
    }

    public Date getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Date ngayTao) {
        this.ngayTao = ngayTao;
    }

    public Date getNgayCapNhat() {
        return ngayCapNhat;
    }

    public void setNgayCapNhat(Date ngayCapNhat) {
        this.ngayCapNhat = ngayCapNhat;
    }

}
