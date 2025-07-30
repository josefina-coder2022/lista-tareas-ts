import type { Tarea } from "../types/tarea"
import { MdPendingActions } from "react-icons/md"

type Props = {
  tareas: Tarea[]
}

const ContadorTareas = ({ tareas }: Props) => {

   const pendientes = tareas.filter((t) => !t.completada).length

   return (
     <div
       style={{
         display: "flex",
         alignItems: "center",
         gap: "8px",
         marginTop: "20px",
       }}
     >
       <div
         className="contador-tareas" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
         <MdPendingActions size={24} />
         <strong>{pendientes}</strong> tarea{pendientes !== 1 ? "s" : ""}{" "} pendiente{pendientes !== 1 ? "s" : ""}
       </div>

     </div>
   )
}

export default ContadorTareas
