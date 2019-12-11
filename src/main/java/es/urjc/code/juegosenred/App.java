package es.urjc.code.juegosenred;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {

	public static void main(String[] args) {
		
		//Esta clase es cien por cien necesaria 
		//Ejecuta la spring app

		 SpringApplication.run(App.class, args);
		 System.err.println("App iniciada");
		 
		
		 
		 
	}
	


}





