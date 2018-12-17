package com.ricardo.services;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ricardo.models.Pedido;
import com.ricardo.models.StatusMessage;
import com.ricardo.services.JSONService;;


@Path("/pedidos")
public class PedidosService extends JSONService{

	private static final List<Pedido> pedidos = new ArrayList<Pedido>();

	static {
		pedidos.add(new Pedido(1, "Producto 1", 23));
		pedidos.add(new Pedido(2, "Producto 2", 24));
		pedidos.add(new Pedido(3, "Producto 3", 25));
		pedidos.add(new Pedido(4, "Producto 4", 26));
		pedidos.add(new Pedido(5, "Producto 5", 27));
	}
	
//	curl -H "username: santi@voxespana.es" -H "password: vox" http://localhost:8080/PedidosREST/api/authenticate -v

	@GET
	@Produces("application/json")
//	@Produces(MediaType.APPLICATION_JSON) <- se puede escribir asi tambien, y es mas preciso
	public Response getPedidos(@HeaderParam("token") String token) {
		String useremail= getUserEmailFromToken(token);
		Response mResponse = null;

		if (useremail == null) {
			StatusMessage statusMessage = new StatusMessage(Status.FORBIDDEN.getStatusCode(),"Access Denied for this functionality !!!");
			mResponse=Response.status(Status.FORBIDDEN.getStatusCode()).entity(statusMessage).build();
		}else  mResponse=Response.status(200).entity(pedidos).build();
		
		return mResponse;

	}

// Los Path estan concatenados, por ellos este path es:"/pedidos/{pid}"
	@Path("/{pid}")
	@GET
	@Produces("application/json")

//	PathParam sirve para inyectar directamente el pid en el directorio
	public Response getPedido(@PathParam("pid") int pid, @HeaderParam("token") String token) {
		String useremail= getUserEmailFromToken(token);
		Response resp = null;

		if (useremail != null) {
			Pedido pedidoRet = null;

			for (Pedido pedido : pedidos) {
				if (pedido.getPid() == pid) {
					pedidoRet = pedido;
					break;
				}
			}

			if (pedidoRet == null) {
				resp = Response.status(404).entity(new StatusMessage(pid, "El pedido no existe")).build();
			} else {
				resp = Response.status(200).entity(pedidoRet).build();
			}
		} else {
			resp = Response.status(403).entity(new StatusMessage(pid, "Necesitas permisos")).build();
		}

		return resp;

	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)

	public Response addPedido(Pedido pedidoNuevo, @HeaderParam("token") String token) {
		String useremail= getUserEmailFromToken(token);
		Response resp = null;

		if (useremail != null) {

			pedidoNuevo.setPid(pedidos.size() + 1);
			pedidos.add(pedidoNuevo);
			resp = Response.status(200).entity(pedidoNuevo).build();

		} else {
			resp = Response.status(403).entity(new StatusMessage(null, "Necesitas permisos")).build();
		}

		return resp;

	}

//	Para a�adir pedidos en curl
//	curl -X POST -d "{\"pid\":0,\"descripcion\":\"Producto 1\",\"monto\":23.0}" -H "Content-type: application/json" http://localhost:8080/PedidosREST/api/pedidos -v

	@Path("/{pid}")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)

//	PathParam sirve para inyectar directamente el pid en el directorio
	public boolean deletePedido(@PathParam("pid") int pid) {
		boolean Ok = false;

		for (Pedido pedido : pedidos) {
			if (pedido.getPid() == pid) {
				pedidos.remove(pedido);
				Ok = true;
				break;
			}

		}
		return Ok;
	}

//	Para borrar un pedido por su pid
//	curl -X DELETE http://localhost:8080/PedidosREST/api/pedidos/5 -v

	@Path("/{pid}")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)

	public boolean actualizarPedido(@PathParam("pid") int pid, Pedido unPedido) {
		boolean Ok = false;

		for (Pedido pedido : pedidos) {
			if (pedido.getPid() == pid) {
				pedidos.remove(pedido);
				pedidos.add(unPedido);
				Ok = true;
				break;
			}

		}
		return Ok;
	}

// comand PUT
//	curl -X PUT -d "{\"pid\":2,\"descripcion\":\"Cambio Descripcion\",\"monto\":35.0}" -H "Content-Type: application/json" http://localhost:8080/PedidosREST/api/pedidos/2 -v
}
