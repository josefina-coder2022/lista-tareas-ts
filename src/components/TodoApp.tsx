import { useState, useEffect } from "react"
import ListaTareas from "./ListaTareas"
import ContadorTareas from "./ContadorTareas"
import type { Tarea } from "../types/tarea"
import Swal from "sweetalert2"





const TodoApp = () => {
  const [nuevaTarea, setNuevaTarea] = useState<string>("")
  const [nuevaFecha, setNuevaFecha] = useState<string>("")
  const [listaTareas, setListaTareas] = useState<Tarea[]>([])
  const [filtroFecha, setFiltroFecha] = useState<string>("")
  const [ordenAscendente, setOrdenAscendente] = useState<boolean>(true)


  // Cargar tareas desde localStorage
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      const tareasParseadas: Tarea[] = JSON.parse(tareasGuardadas).map(
        (t: any) => ({
          ...t,
          fecha: new Date(t.fecha),
        })
      )
      setListaTareas(tareasParseadas);
    }
  }, [])

  //Guardar tareas en el LocalStorge cada vez que cambian las tareas
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(listaTareas))
  }, [listaTareas])

  //Agregar nueva tarea
  const handleAddTask = () => {
    if (nuevaTarea.trim() === "" || nuevaFecha === "") {
      
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor ingresa una fecha y una tarea.",
        confirmButtonColor: "#3085d6",
      })
      setNuevaTarea("")
      return
    }
    
    const nueva: Tarea = {
      texto: nuevaTarea.trim(),
      completada: false,
      fecha: new Date(nuevaFecha),
    }

    setListaTareas((tareasAnteriores) => [...tareasAnteriores, nueva])
    setNuevaTarea("")
    setNuevaFecha("")
  }

  //Borrar tarea por índice
  const handleBorrarTarea = (index: number) => {
    setListaTareas((tareas) => tareas.filter((_, i) => i !== index)) 
  }

  //Marcar/Desmarcar como completada
  const toggleCompletarTarea = (index: number) => {
    setListaTareas((prevTareas) =>
      prevTareas.map((tarea, i) =>
        i === index ? { ...tarea, completada: !tarea.completada } : tarea
      )
    )
  }

  // Filtrar y ordenar
  const tareasFiltradasYOrdenadas = listaTareas
   
    .filter((tarea) => {
      if (!filtroFecha) return true
      const fechaTarea = tarea.fecha.toISOString().split("T")[0]
      return fechaTarea === filtroFecha
    })
    .sort((a, b) => {
      return ordenAscendente
        ? a.fecha.getTime() - b.fecha.getTime()
        : b.fecha.getTime() - a.fecha.getTime()
    })
  
  
  return (
    <div>

      <h1>Lista de Tareas</h1>

      {/* Formulario para nueva tarea */}
      <div className="formulario-tarea">
        <label className="formulario-label">
          Ingresa fecha de la tarea:
          <input
            type="date"
            value={nuevaFecha}
            onChange={(e) => setNuevaFecha(e.target.value)}
            className="formulario-input-fecha"
          />
        </label>
        <br />

        <div className="formulario-input-contenedor">
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Ingresa la tarea"
            className="formulario-input-texto"
          />

          <button onClick={handleAddTask} className="formulario-boton">
            Agregar Tarea
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtro-fecha-contenedor">
        <label className="formulario-label">
          Filtrar por fecha:
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            className="formulario-input-fecha"
          />
        </label>

        <button className="button-ordenar-tareas" onClick={() => setOrdenAscendente(!ordenAscendente)}>
          {ordenAscendente ? "⬆️ Antiguas" : "⬇️ Recientes"}
        </button>
      </div>

      <ContadorTareas tareas={listaTareas} />

      <ListaTareas
        listaTareas={tareasFiltradasYOrdenadas}
        borrarTarea={handleBorrarTarea}
        toggleCompletarTarea={toggleCompletarTarea}
      />
    </div>
  )
}

export default TodoApp
