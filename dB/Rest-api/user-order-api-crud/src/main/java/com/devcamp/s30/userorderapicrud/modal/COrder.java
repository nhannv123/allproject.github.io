package com.devcamp.s30.userorderapicrud.modal;


import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "pizza_order")
public class COrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "order_code", nullable = false, updatable = true)
    private String orderCode;

    @Column(name = "pizza_size", nullable = false, updatable = true)
    private String pizzaSize;

    @Column(name = "pizza_type", nullable = false, updatable = true)
    private String pizzaType;

    @Column(name = "price", nullable = false, updatable = true) 
    private long price;

    @Column(name = "voucher_code", nullable = false, updatable = true)
    private String voucherCode;

    @Column(name = "paid")
    private long paid;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = true, updatable = false)
    @CreatedDate
    private Date created;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", nullable = true,updatable = true)
    @LastModifiedDate
    private Date updated;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    @JsonBackReference
    private CUser cUser;

    public COrder() {
    }

    

    public COrder(String orderCode, String pizzaSize, String pizzaType, long price, String voucherCode, long paid,
            CUser cUser) {
        this.orderCode = orderCode;
        this.pizzaSize = pizzaSize;
        this.pizzaType = pizzaType;
        this.price = price;
        this.voucherCode = voucherCode;
        this.paid = paid;
        this.cUser = cUser;
    }

    public String getVoucherCode() {
        return voucherCode;
    }

    public void setVoucherCode(String voucherCode) {
        this.voucherCode = voucherCode;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public String getPizzaSize() {
        return pizzaSize;
    }

    public void setPizzaSize(String pizzaSize) {
        this.pizzaSize = pizzaSize;
    }

    public String getPizzaType() {
        return pizzaType;
    }

    public void setPizzaType(String pizzaType) {
        this.pizzaType = pizzaType;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public long getPaid() {
        return paid;
    }

    public void setPaid(long paid) {
        this.paid = paid;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public CUser getcUser() {
        return cUser;
    }

    public void setcUser(CUser cUser) {
        this.cUser = cUser;
    }
    
    
}
