import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import * as actions from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo( 'Salvar el mundo' ),
  new Todo( 'Recolectar piedras del infinito' ),
  new Todo( 'Estudiar Angular' ),
  new Todo( 'Estudiar redux' ),
  new Todo( 'Estudiar git' ),
 ];

const _todoReducer = createReducer(
  estadoInicial,
  on(actions.crear, (state, { texto }) => [...state, new Todo( texto )]),
  on(actions.limpiar, state => state.filter( todo => !todo.completado)),


  on(actions.borrar, ( state, { id } ) => state.filter( todo => todo.id !== id)),

  on(actions.toggle, (state, { id }) => {
    return state.map( todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo
      }
    })
  }),
  on(actions.editar, (state, { id, texto }) => {
    return state.map( todo => {
      if (todo.id === id) {
        return {
          ...todo,
          texto
        }
      } else {
        return todo
      }
    })
  }),
  on(actions.toggleAll, (state, { completado }) => {
    return state.map( todo => { return { ...todo, completado }})
  })
)


export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
