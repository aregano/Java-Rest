package com.ricardo.sevices;

import static org.junit.Assert.*;

import org.junit.Test;

import com.ricardo.services.PedidosService;

public class PedidoServicesTest {

	@Test
	public void getPedidoValid() {
		PedidosService pserv= new PedidosService();
		
		assertTrue(pserv.getPedido(1, null)!=null);
		
		assertTrue(pserv.getPedido(7, null)==null);

	}

}
