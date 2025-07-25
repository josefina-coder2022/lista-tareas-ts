import { useState } from "react";
import ListaTareas from "./ListaTareas";


const TodoApp = () => {
  const [nuevaTarea, setNuevaTarea] = useState<string>("");
  const [listaTareas, setListaTareas] = useState<string[]>([])

  const handleAddTask = () => { 
    if (nuevaTarea === "") return //si la nueva tarea es vacio no la guarda, sino la agrega y borra el input
    setListaTareas(tareasAnteriores => [...tareasAnteriores, nuevaTarea])
    setNuevaTarea("")
  }
  const handleBorrarTarea = (index:number) => {
    setListaTareas(tareas => tareas.filter((_, i) => i !== index))//acá el index que le pase lo borra y devuelve todas las tareas que no correspondan a ese indice, filtra todas las tareas que sean distintas a ese indice
    
  }

  return (
    <div>
      <h1>Lista de Tareas</h1>

      <div>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva Tarea"
        />

        <button onClick={handleAddTask}>Agregar Tarea</button>
      </div>

      <ListaTareas listaTareas={listaTareas} borrarTarea={handleBorrarTarea}></ListaTareas>
    </div>
  )
}

export default TodoApp
