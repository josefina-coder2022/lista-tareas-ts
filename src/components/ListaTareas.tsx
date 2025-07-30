import Tarea from "./Tarea"
import type { Tarea as TareaType } from "../types/tarea"


type Props = {
  listaTareas: TareaType[]
  borrarTarea: (index: number) => void 
  toggleCompletarTarea: (index: number) => void
}

const ListaTareas = ({
  listaTareas,
  borrarTarea,
  toggleCompletarTarea,
}: Props) => {

  return (
    <div className="taskList">
      {listaTareas.map((tarea, index) => ( 
        <Tarea
          key={index}
          tarea={tarea}
          borrarTarea={() => borrarTarea(index)}
          toggleCompletar={() => toggleCompletarTarea(index)}
        ></Tarea>
      ))}
    </div>
  )
}

export default ListaTareas