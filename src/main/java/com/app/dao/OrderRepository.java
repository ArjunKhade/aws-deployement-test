package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

	Optional<OrderEntity> findByOrderId(String orderId);
}
