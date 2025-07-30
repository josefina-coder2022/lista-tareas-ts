import type { Tarea as TareaType } from "../types/tarea"



type Props = {
  tarea: TareaType
  borrarTarea: () => void
  toggleCompletar: () => void
}

const Tarea = ({ tarea, borrarTarea, toggleCompletar }: Props) => {
  //Convierto la fecha a objeto Date por si viene como string
  const fecha = new Date(tarea.fecha)

  // Formato extendido: martes 29 de julio de 2025
  const fechaFormateada = fecha.toLocaleDateString("es-AR", {
    weekday: "long", // martes
    year: "numeric", // 2025
    month: "long", // julio
    day: "numeric", // 29
  })

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={toggleCompletar}
      />

      <span
        style={{
          textDecoration: tarea.completada ? "line-through" : "none",
          marginLeft: "8px",
          marginRight: "8px",
        }}
      >
        {tarea.texto}
      </span>

      <span style={{ fontSize: "0.9rem", color: "#a8a6a6", marginRight: "10px" }}>
        ({fechaFormateada})
      </span>

      <button onClick={borrarTarea}>Borrar</button>
    </div>
  )
}

export default Tarea
