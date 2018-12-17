package com.ricardo.models;

public class Pedido {
	private int pid;
	private String descripcion;
	private double monto;

	public Pedido() {

	}

	public Pedido(int pid, String descripcion, double monto) {
		super();
		this.pid = pid;
		this.descripcion = descripcion;
		this.monto = monto;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public double getMonto() {
		return monto;
	}

	public void setMonto(double monto) {
		this.monto = monto;
	}

	public boolean validate() {
		boolean esValido = true;
		if (this.getDescripcion() == null || this.getDescripcion() == "") {
			esValido = false;
		}
		if (this.getMonto() == 0) {
			esValido = false;
		}

		return esValido;

	}
}
