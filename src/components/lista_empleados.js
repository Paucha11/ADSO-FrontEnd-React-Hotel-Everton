// Importamos React y los hooks necesarios
import React, { useEffect, useState } from "react";

/**
 * Componente Lista de empleados
 * -----------------------
 * Muestra la lista de empleados obtenidos desde la API del backend.
 * Permite eliminar empleados y notificar al componente padre cuando se desea editar uno.
 *
 * Props:
 *  - onEdit: función callback que recibe el empleado seleccionado para editar.
 */
function Lista_empleados({ onEdit }) {
  // -------------------- ESTADO --------------------
  // employees almacena el listado de empleados cargados desde la API.
  const [empleados, setEmpleados] = useState([]);

  // -------------------- FUNCIÓN DE CARGA --------------------
  // Esta función obtiene la lista completa de empleados desde el backend.
  const fetchEmpleados = () => {
    fetch("http://localhost:3000/api/empleado")
      .then((res) => res.json()) // Convertimos la respuesta a JSON
      .then((data) => setEmpleados(data)) // Guardamos los empleados en el estado
      .catch((err) => console.error("Error:", err)); // Mostramos errores si ocurren
  };

  // -------------------- useEffect --------------------
  // Este efecto se ejecuta una sola vez al montar el componente ([] como dependencia vacía)
  // Llama a fetchEmpleados() para cargar los datos iniciales desde la API.
  useEffect(() => {
    fetchEmpleados();
  }, []);

  // -------------------- FUNCIÓN ELIMINAR --------------------
  // handleDelete recibe el ID del empleado a eliminar.
  // Pide confirmación al usuario y, si acepta, envía la solicitud DELETE al backend.
  const handleDelete = (RUT_empleado) => {
    // Confirmación para evitar eliminaciones accidentales
    if (!window.confirm("¿Seguro que deseas eliminar este empleado?")) return;

    // Petición DELETE al servidor
    fetch(`http://localhost:3000/api/empleado/${RUT_empleado}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Empleado eliminado"); // Mensaje de confirmación
        fetchEmpleados(); // Recargamos la lista para reflejar el cambio
      })
      .catch((err) => console.error("Error al eliminar:", err));
  };

  // -------------------- RENDERIZADO --------------------
  // Muestra un mensaje si no hay empleados o una tabla si existen registros.
  return (
    <div>
      <h2>Lista de Empleados</h2>

      {/* Si no hay empleados, mostrar un mensaje */}
      {empleados.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        // Si hay empleados, renderizamos una tabla HTML sencilla
        <table border="1" cellPadding="5">
          <thead>
            <tr>

                <th>RUT</th>
                <th>id_cargo</th>
                <th>nombre_empleado</th>
                <th>telefono_empleado</th>
                <th>direccion_empleado</th>
                <th>correo_electronico</th>
                <th>fecha_nacimiento</th>
                <th>EPS</th>
                <th>salario</th>
                <th>tipo_contrato</th> 

            </tr>
          </thead>

          <tbody>
            {/* Recorremos el arreglo de empleados */}
            {empleados.map((emp) => (
              // Cada fila debe tener una key única (usamos emp._id o emp.id)
              <tr key={emp._id || emp.id}>
                <td>{emp.RUT_empleado}</td>
                <td>{emp.id_cargo}</td>
                <td>{emp.nombre_empleado}</td>
                <td>{emp.telefono_empleado}</td>
                <td>{emp.direccion_empleado}</td>
                <td>{emp.correo_electronico}</td>               
                <td>{emp.fecha_nacimiento}</td>
                <td>{emp.EPS}</td>
                <td>{emp.salario}</td>          
                <td>{emp.tipo_contrato}</td>        
                
                <td>
                  {/* Botón Editar: llama a onEdit pasando el empleado seleccionado */}
                  <button onClick={() => onEdit(emp)}>Editar</button>

                  {/* Botón Eliminar: llama a handleDelete con el ID del empleado */}
                  <button
                    onClick={() => handleDelete(emp._id || emp.id)}
                    style={{ marginLeft: "10px" }} // Espacio visual entre botones
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Exportamos el componente para que pueda usarse en App.js u otros componentes
export default Lista_empleados;