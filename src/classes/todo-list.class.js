import { Todo } from "./todo.class";

export class TodoList {

	constructor() {

		// this.todos = [];
		this.cargarLocalStorage();
	
	}

	nuevoTodo( todo ) {
		this.todos.push( todo );
		// guardar en el localStorage
		this.guardarLocalStorage();
	}

	eliminarTodo( id ) {
		// generar un nuevo arreglo excluyendo al que tenga el id del eliminado
		this.todos = this.todos.filter( ( todo ) => todo.id != id );
		// guardar en el localStorage
		this.guardarLocalStorage();
	}

	marcarCompletado( id ) {
		// recorrer los todos
		for ( const todo of this.todos ) {

			// verificar que el id recibida coincida con el del todo
			if ( todo.id === parseInt( id ) ) {
				// marcar como true o false dependiendo del estado actual
				todo.completado = !todo.completado;
				// guardar la información en el localStorage
				this.guardarLocalStorage();
				// terminar el bucle
				break;
			}
		}
	}

	eliminarCompletados() {
		// generar un nuevo arreglo con los elementos no completados
		this.todos = this.todos.filter( ( todo ) => !todo.completado );
		// guardar en el localStorage
		this.guardarLocalStorage();
	}

	guardarLocalStorage() {

		// guardar los todos como json
		localStorage.setItem( 'todos', JSON.stringify( this.todos ) );

	}

	cargarLocalStorage() {

		// verificar la existencia del localStorage de los todos
		this.todos = ( localStorage.getItem( 'todos' ) ) 
						? JSON.parse( localStorage.getItem( 'todos' ) ) 
						: [];
						
		// convertir los todos en una nueva instancia				
		this.todos = this.todos.map( Todo.fromJson );
	}

	obtenerPendientes() {
		const pendientes = this.todos.filter( ( todo ) => !todo.completado );

		return pendientes.length;
	}
}