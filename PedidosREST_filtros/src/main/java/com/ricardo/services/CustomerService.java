package com.ricardo.services;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ricardo.models.Customer;

@Path("/customers")
public class CustomerService {

	private static final List<Customer> customers = new ArrayList<Customer>();

	static {
		customers.add(new Customer(1, "Santi Abascal", "00000001�", "santi@voxespana.es"));
		customers.add(new Customer(2, "Jose Antonio Ortega Lara", "00000002�", "pepetoni@voxespana.es"));
		customers.add(new Customer(3, "Rocio Monasterio", "00000003�", "rocimona@voxespana.es"));
		customers.add(new Customer(4, "Jorge Arturo Cutillas", "00000004�", "cuti@voxespana.es"));
		customers.add(new Customer(5, "Javier P�rez", "00000005�", "javipe@voxespana.es"));
	}

	@GET
	@Produces("application/json")
	public List<Customer> getCustomers() {
		return this.customers;
		}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
		public boolean addCustomer(Customer customerNuevo) {
			customerNuevo.setCid(customers.size() + 1);
			customers.add(customerNuevo);
			return true;
		}
		
		
		@Path("/{cid}")
		@GET
		@Produces("application/json")
		
		public Customer getCustomer(@PathParam("cid") int cid) {
			Customer customerRet = null;

			for (Customer customer : customers) {
				if (customer.getCid() == cid) {
					customerRet = customer;
					break;
				}

			}
			return customerRet;
		}
		
//		POST command
//		curl -X POST -d "{\"cid\":0,\"nombre\":\"curl\",\"dni\":\"0000023N\",\"email\":\"curl@voxespana.es\"}" -H "Content-type: application/json" http://localhost:8080/PedidosREST/api/customers -v


}