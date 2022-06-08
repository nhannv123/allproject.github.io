package com.devcamp.s30.userorderapicrud.modal;
import java.util.Date;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "vouchers")
public class CVoucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(name = "ma_voucher", unique = true)
    private String maVoucher;

    @Column(name = "phan_tram_giam_gia")
    private String phanTramGiamGia;

    @Column(name = "ghi_chu")
    private String ghiChu;

   @Temporal(TemporalType.TIMESTAMP)
   @Column(name = "ngay_tao", nullable = true, updatable = false)
   @CreatedDate
   private Date ngayTao;
   
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ngay_cap_nhat", nullable = true)
    @LastModifiedDate
    private Date ngayCapNhat;
    
    
    public CVoucher() {
    }

   
    public CVoucher(String maVoucher, String phanTramGiamGia, String ghiChu) {
        this.maVoucher = maVoucher;
        this.phanTramGiamGia = phanTramGiamGia;
        this.ghiChu = ghiChu;

    }


    public long getId() {
        return id;
    }


    public void setId(long id) {
        this.id = id;
    }


    public String getPhanTramGiamGia() {
        return phanTramGiamGia;
    }


    public void setPhanTramGiamGia(String phanTramGiamGia) {
        this.phanTramGiamGia = phanTramGiamGia;
    }


    public String getGhiChu() {
        return ghiChu;
    }
    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }
    public String getMaVoucher() {
        return maVoucher;
    }
    public void setMaVoucher(String maVoucher) {
        this.maVoucher = maVoucher;
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

