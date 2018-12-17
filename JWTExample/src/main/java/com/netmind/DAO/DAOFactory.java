package com.netmind.DAO;

public class DAOFactory {

	public static final DAO getDao(String tipo) throws Exception {
		switch (tipo) {
		case "usuario":
			UsuarioDAO uDao = UsuarioDAOImpl.getInstance();
			return uDao;

//		el switch actua como un if else pero tiende a complicarse. Con switch se mira un parametro (en este caso tipo)
//			y dependiendo del caso que tome dicho parametro (usuario) actua de una manera 
		}

		return null;
	}

}