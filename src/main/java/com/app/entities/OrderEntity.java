package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="orders")
public class OrderEntity  extends BaseEntity{

	private String orderId;
	
	private String receipt;
	
	private String status;
	
	private int amount;
	
	private String paymentId;
	
	@ManyToOne
	@JsonIgnore
	private User user;
	

	
	
}
