package com.spring.jpa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.spring.jpa.dao.IClienteDao;

@Controller
public class ClienteController {

	@Autowired
	@Qualifier("clienteDaoJpa")
	private IClienteDao clienteDao;
	
	@RequestMapping(value = "listar", method = RequestMethod.GET)
	public String listar(Model model){
		model.addAttribute("titulo", "Listado de Clientes");
		
		model.addAttribute("clientes", clienteDao.findAll());
		return "listar";
	}
}
