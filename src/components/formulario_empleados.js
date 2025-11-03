// Importamos React y los hooks necesarios desde la biblioteca
import React, { useState, useEffect } from "react";

/**
 * Componente EmployeeForm
 * -----------------------
 * Este componente se utiliza para crear o editar empleados.
 * Puede funcionar en dos modos:
 *  - Modo "crear": cuando no hay empleado seleccionado (employeeToEdit = null)
 *  - Modo "editar": cuando se recibe un empleado con sus datos
 *
 * Props:
 *  - employeeToEdit: objeto con los datos del empleado a editar (puede ser null)
 *  - onSaveComplete: función callback que se ejecuta cuando se guarda correctamente
 */
function FormularioEmpleados({ editar_empleados, onSaveComplete }) {

  // -------------------- ESTADOS --------------------
  // Cada campo del formulario tiene su propio estado local controlado.
  // Esto permite reflejar en tiempo real lo que el usuario escribe.
  const [RUT_empleado, setRUT_empleado] = useState("");
  const [id_cargo, setId_cargo] = useState("");
  const [nombre_empleado, setNombre_empleado] = useState("");
  const [telefono_empleado, setTelefono_empleado] = useState("");
  const [direccion_empleado, setDireccion_empleado] = useState("");
  const [correo_electronico, setCorreo_electronico] = useState("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [EPS, setEPS] = useState("");
  const [salario, setSalario] = useState("");
  const [tipo_contrato, setTipo_contrato] = useState("");

  // -------------------- EFECTO DE SINCRONIZACIÓN --------------------
  // Este useEffect se ejecuta cada vez que cambia la prop employeeToEdit.
  // Si existe un empleado para editar, los campos se llenan con sus datos.
  // Si no existe (modo creación), se limpian los campos del formulario.
  useEffect(() => {
    if (editar_empleados) {
      // Precargar datos del empleado seleccionado
      setRUT_empleado(editar_empleados.RUT_empleado);
      setId_cargo(editar_empleados.id_cargo);
      setNombre_empleado(editar_empleados.nombre_empleado);
      setTelefono_empleado(editar_empleados.telefono_empleado);
      setDireccion_empleado(editar_empleados.direccion_empleado);
      setCorreo_electronico(editar_empleados.correo_electronico);
      setFecha_nacimiento(editar_empleados.fecha_nacimiento);
      setEPS(editar_empleados.EPS);
      setSalario(editar_empleados.salario);
      setTipo_contrato(editar_empleados.tipo_contrato);

    } else {
      // Limpiar el formulario para crear uno nuevo
      setRUT_empleado("");
      setId_cargo("");
      setNombre_empleado("");
      setTelefono_empleado("");
      setDireccion_empleado("");
      setCorreo_electronico("");  
      setFecha_nacimiento("");  
      setEPS("");    
      setSalario("");
      setTipo_contrato(""); 
    }
  }, [editar_empleados]); // Se vuelve a ejecutar si cambia employeeToEdit

  // -------------------- MANEJO DEL ENVÍO --------------------
  // Esta función controla lo que ocurre al enviar el formulario.
  // Se encarga de crear o actualizar el empleado según corresponda.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página por defecto.

    // Construimos un objeto con los datos del formulario
    const nuevo_empleado = { RUT_empleado, id_cargo, nombre_empleado, telefono_empleado, direccion_empleado, correo_electronico, fecha_nacimiento, EPS, salario, tipo_contrato };

    // Determinamos si el formulario está en modo edición o creación
    const method = editar_empleados ? "PUT" : "POST";
    const url = editar_empleados
      ? `http://localhost:3000/api/empleados/${editar_empleados._id}` // Actualizar
      : "http://localhost:3000/api/empleados"; // Crear nuevo

    // -------------------- PETICIÓN FETCH --------------------
    // Enviamos los datos al backend (Node.js / Express)
    fetch(url, {
      method, // PUT o POST según el caso
      headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo es JSON
      body: JSON.stringify(nuevo_empleado), // Convertimos el objeto a texto JSON
    })
      .then((res) => res.json()) // Convertimos la respuesta a formato JSON
      .then((data) => {
        // Mostramos un mensaje al usuario
        alert(
          editar_empleados
            ? `Empleado ${data.nombre_empleado} actualizado`
            : `Empleado ${data.nombre_empleado} creado`
        );

        // Notificamos al componente padre (por ejemplo, para refrescar la lista de empleados)
        onSaveComplete();
      })
      .catch((err) => console.error("Error:", err)); // Captura y muestra errores en consola
  };

  // -------------------- RENDERIZADO DEL FORMULARIO --------------------
  // Se muestran los campos de entrada controlados y un botón dinámico.
  // El texto del botón y el título cambian según si se está creando o editando un empleado.
  return (
    <form onSubmit={handleSubmit}>
      {/* Título dinámico del formulario */}
      <h2>{editar_empleados ? "Editar Empleado" : "Agregar Empleado"}</h2>

      {/* Campo de texto: RUT del empleado */}
      <input
        type="text"
        placeholder="RUT"
        value={RUT_empleado}
        onChange={(e) => setRUT_empleado(e.target.value)}
        required
      />

      {/* Campo de texto: ID del cargo */}
      <input
        type="text"
        placeholder="ID del cargo"
        value={id_cargo}
        onChange={(e) => setId_cargo(e.target.value)}
        required
      />

      {/* Campo de texto: Nombre del empleado */}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre_empleado}
        onChange={(e) => setNombre_empleado(e.target.value)}
        required
      />

      {/* Campo de texto: Telefono del empleado */}
      <input
        type="text"
        placeholder="Telefono"
        value={telefono_empleado}
        onChange={(e) => setTelefono_empleado(e.target.value)}
        required
      />

      {/* Campo de texto: Direccion del empleado */}
      <input
        type="text"
        placeholder="Direccion"
        value={direccion_empleado}
        onChange={(e) => setDireccion_empleado(e.target.value)}
        required
      />

      {/* Campo de texto: Correo Electronico del empleado */}
      <input
        type="email"
        placeholder="Correo Electronico"
        value={correo_electronico}
        onChange={(e) => setCorreo_electronico(e.target.value)}
        required
      />

      {/* Campo de texto: Fecha de Nacimiento del empleado */}
      <input
        type="date"
        placeholder="Fecha de Nacimiento"
        value={fecha_nacimiento}
        onChange={(e) => setFecha_nacimiento(e.target.value)}
        required
      />

      {/* Campo de texto: EPS del empleado */}
      <input
        type="text"
        placeholder="EPS"
        value={EPS}
        onChange={(e) => setEPS(e.target.value)}
        required
      />

      {/* Campo de texto: Salario del empleado */}
      <input
        type="number"
        placeholder="Salario"
        value={salario}
        onChange={(e) => setSalario(e.target.value)}
        required
      />

      {/* Campo de texto: Tipo de Contrato del empleado */}
      <input
        type="text"
        placeholder="Tipo de Contrato"
        value={tipo_contrato}
        onChange={(e) => setTipo_contrato(e.target.value)}
        required
      />

      {/* Botón dinámico (cambia texto según acción) */}
      <button type="submit">
        {editar_empleados ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

// Exportamos el componente para que pueda ser importado en otros archivos
export default FormularioEmpleados;