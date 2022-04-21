// importaciones
import { Todo } from '../classes';
import { todoList } from '../index';

// referencias en el html
const divTodoList = document.querySelector( '.todo-list' );
const txtInput = document.querySelector( '.new-todo' );
const btnEliminarCompletados = document.querySelector( '.clear-completed' );
const ulFiltros = document.querySelector( '.filters' );
const anchorFiltros = document.querySelectorAll( '.filtro' );
const todosPendientes = document.querySelector( '.todo-count' );

export const crearTodoHtml = ( todo ) => {

	const htmlTodo = `
	<li class="${ ( todo.completado ) ? 'completed': '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked': '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;


	const div = document.createElement( 'div' );
	div.innerHTML = htmlTodo;

	divTodoList.append( div.firstElementChild );

	todosPendientes.innerText = `${ todoList.obtenerPendientes() } pendiente(s)`;

	return div;
}

// Eventos
txtInput.addEventListener( 'keyup', ( event ) => {

	// verificar que el usuario de enter y que el campo no esté vació
	if ( event.keyCode === 13 && txtInput.value.length > 0 ) {
		
		// crear una nueva instancia del nuevo Todo
		const nuevoTodo = new Todo( txtInput.value );
		// añadir el nuevo Todo a la lista de Todos
		todoList.nuevoTodo( nuevoTodo );
		// crear un elemento del todo en el html
		crearTodoHtml( nuevoTodo);
		// vaciar el input tras generar un todo
		txtInput.value = '';
	}
});

divTodoList.addEventListener( 'click', ( event ) => {

	// obtener el nombre del elemento al que se le da click
	const nombreElemento 	= event.target.localName; // input, label, button
	// obtener el elemento del id en el que está encapsulado
	const todoElemento 		= event.target.parentElement.parentElement;
	// obtener el id del elemento
	const todoId			= todoElemento.getAttribute( 'data-id' );

	// verificar que lo que se le dio click sea un input
	if ( nombreElemento.includes( 'input' ) ) {
		// marcar el todo como completado
		todoList.marcarCompletado( todoId );
		// agregar estilos del todo para que se vea completado
		todoElemento.classList.toggle( 'completed' );
	} else if ( nombreElemento.includes( 'button' ) ) {
		// inicializar la función de eliminar todo
		todoList.eliminarTodo( todoId );
		// eliminar el elemento del html
		divTodoList.removeChild( todoElemento );
	}

	todosPendientes.innerText = `${ todoList.obtenerPendientes() } pendiente(s)`;

});

btnEliminarCompletados.addEventListener( 'click', () => {

	// eliminar los todos completados del contenedor
	todoList.eliminarCompletados();

	// recorrer cada uno de los elementos completados
	for ( let i = divTodoList.children.length -1; i >= 0; i -- ) {

		// obtener la información del elemento
		const elemento = divTodoList.children[ i ];
		
		// verificar que tenga la clase completado
		if( elemento.classList.contains( 'completed' ) ) {
			// eliminar elemento
			divTodoList.removeChild( elemento );
		}
		
	}

});

ulFiltros.addEventListener( 'click', ( event ) => {
	// obtener el texto del anchor clickeado
	const filtro = event.target.text;
	// verificar que el anchor no sea undefined
	if ( !filtro ) { return; }

	// quitar la clase selected de los anchors
	anchorFiltros.forEach( ( elem ) => elem.classList.remove( 'selected' ) );
	// agregar la clase selected solo al boton seleccionado
	event.target.classList.add( 'selected' );

	// recorrer cada uno de los todos
	for ( const elemento of divTodoList.children ) {

		// quitar la clase hidden de todos los todos
		elemento.classList.remove( 'hidden' );

		// verificar si el todo está completado
		const completado = elemento.classList.contains( 'completed' );

		// hacer un switch con el tipo de filtro que quiere el usuario
		switch( filtro ) {

			// ver los todos pendientes
			case 'Pendientes':
				// verificar si el todo esta completado
				if ( completado ) {
					// en caso de estarlo se oculta
					elemento.classList.add( 'hidden' );
				}
			break;

			// ver los todos completados
			case 'Completados':
				// verificar que los todos no esten completos
				if ( !completado ) {
					// en caso de no estarlo se ocultan
					elemento.classList.add( 'hidden' );
				}
			break;

		}
	}

});