import { useReducer, useState } from 'react'

function reducer(state, action) {
  if(action.type === 'REMOVE_TODO') 
  {
    return {
      ...state,
      todos: state.todos.filter(todo => todo !== action.payload)
    }
  }
  if(action.type === 'TOGGLE_TODO')
  {
    return {
      ...state,
      todos: state.todos.map(todo => todo === action.payload ? {
        ...todo,
        checked: !todo.checked
      } : todo)
    }
  }
  if(action.type === 'CLEAR_COMPLETED')
  {
    return {
      ...state,
      todos: state.todos.filter(todo => !todo.checked)
    }
  }
  return state;
}

function App() {

  const [state, dispatch ]=useReducer(reducer,    // state renseigne sur l'état  && dispatch permet de déclencher un changement
    {    
    todos: [{
      name: 'Faire les courses',
      checked: false,
    },
    {
      name: 'Faire le ménage',
      checked: false,
    },
    {
      name: 'Faire la vaisselle',
      checked: false,
    },
    {
      name: 'Faire la cuisine',
      checked: false,
    },
  ],
  })

  return <div className="container">
    <div className="row">
      <ul className='list-group'>
        {state.todos.map(todo => (<li className=' col-3 list-group-item d-flex justify-content-between align-items-center' 
        key={todo.name}
        >
          <input type="checkbox" onChange={() => dispatch({type: 'TOGGLE_TODO', payload: todo})} checked={todo.checked}/>
          {todo.name}
        <button className='' onClick={() => dispatch({type: 'REMOVE_TODO', payload: todo})}>❌</button>
        </li>))}
      </ul>
          <button className='btn btn-dark col-3' onClick={() => dispatch({type:'CLEAR_COMPLETED'})}>Supprimer les tâches accomplies</button>
    </div>
  </div>
}

export default App
