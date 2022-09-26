package com.app.controllers;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.OrderRepository;
import com.app.dto.UserDto;
import com.app.entities.OrderEntity;
import com.app.entities.Packate;
import com.app.entities.PaymentUpdatePackate;
import com.app.exceptions.ResourceNotFoundException;
import com.app.service.IUserService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@RestController
@CrossOrigin("*")
@RequestMapping("/payment")
public class PaymentController {

	@Autowired
	private IUserService userService;
	
	@Autowired
	private OrderRepository orderRepo;
	
	@PostMapping("/order")
	public String createOrder(@RequestBody Packate order) throws Exception {
		
		int amt = order.getAmount();
		
	System.err.println(order.getCreate());
	var client = 	new RazorpayClient("rzp_test_Xgle7zv3RN4KYE","JJDFFMSeWFkUFTops8VeAisN");
		
	JSONObject ob = new JSONObject();
	  ob.put("amount", amt*100);
	  ob.put("currency", "INR");
	  ob.put("receipt", "txn_255425");
	  
	  Order orderToRazorpay = client.Orders.create(ob);
	
	    System.out.println(orderToRazorpay);
	    
	    OrderEntity orderEntity = new OrderEntity();
	    
	    orderEntity.setAmount(orderToRazorpay.get("amount"));
	    orderEntity.setOrderId(orderToRazorpay.get("id"));
	    orderEntity.setPaymentId(null);
	    orderEntity.setStatus("created");
	    orderEntity.setUser(userService.findUserById(order.getUserId()));
	    orderEntity.setReceipt(orderToRazorpay.get("receipt"));
	    
	     orderRepo.save(orderEntity);
	
		return orderToRazorpay.toString();
		
	}
	
	
	@PostMapping("/order/update")
	public ResponseEntity<?> updatePaymentSatus(@RequestBody PaymentUpdatePackate packate){
		
	  OrderEntity order = orderRepo.findByOrderId(packate.getOrder_id()).
			  orElseThrow(()-> new ResourceNotFoundException("Order With Id "+packate.getOrder_id()+" Not Found!!!"));
					 
	  order.setPaymentId(packate.getPayment_id());
	  order.setStatus(packate.getPayment_status().toString());
	  
	  OrderEntity updatedOrder = orderRepo.save(order);
		System.out.println(packate.toString());
		
		return ResponseEntity.ok("Order Updated Successfully!!!!"+updatedOrder.getId());
	}
	
	//get all users 
		@GetMapping("")
		public ResponseEntity<List<OrderEntity>>getAllOrder(){
			List<OrderEntity> orders = orderRepo.findAll();
			if(orders.isEmpty()) {
				throw new ResourceNotFoundException("Order List is Empty!!!");
			}
			return ResponseEntity.ok(orders);
		}
	
	
	
	
}
