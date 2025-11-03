// Importamos React y el hook useState
import React, { useState } from "react";

// Importamos los componentes hijos que conforman nuestra aplicación
import FormularioEmpleados from "./components/formulario_empleados"; // Formulario para crear/editar empleados
import ListaEmpleados from "./components/lista_empleados"; // Listado de empleados
import './App.css'; // Estilos globales opcionales

/**
 * Componente principal: App
 * -------------------------
 * Este componente orquesta toda la aplicación de Gestión de Empleados.
 * Se encarga de manejar el estado compartido entre EmployeeForm y EmployeeList.
 *
 * Funcionalidades:
 *  - Permite seleccionar un empleado para editarlo.
 *  - Limpia el formulario después de guardar.
 *  - Renderiza el formulario y la lista de empleados.
 */
function App() {
  // -------------------- ESTADO PRINCIPAL --------------------
  // selectedEmployee almacena el empleado que se está editando actualmente.
  // Si es null, el formulario se usa para crear un nuevo empleado.
  const [seleccionar_empleados, setseleccionar_empleados] = useState(null);

  // -------------------- FUNCIÓN: EDITAR --------------------
  /**
   * handleEdit se ejecuta cuando el usuario hace clic en "Editar" desde EmployeeList.
   * Recibe un objeto empleado y lo almacena en el estado selectedEmployee.
   * Esto hace que EmployeeForm cargue sus datos para editar.
   */
  const handleEdit = (empleados) => {
    setseleccionar_empleados(empleados);
  };

  // -------------------- FUNCIÓN: GUARDAR COMPLETADO --------------------
  /**
   * handleSaveComplete se ejecuta cuando el formulario termina de guardar o actualizar
   * un empleado correctamente. Limpia el estado selectedEmployee para resetear el formulario.
   */
  const handleSaveComplete = () => {
    setseleccionar_empleados(null);
  };

  // -------------------- RENDERIZADO --------------------
  // Estructura visual principal de la aplicación.
  return (
    <div style={{ margin: "20px" }}>
      {/* Título de la aplicación */}
      <h1>Gestión de Empleados</h1>

      {/* Formulario de creación/edición */}
      <FormularioEmpleados
        editar_empleados={seleccionar_empleados}     // Prop: empleado actual a editar
        onSaveComplete={handleSaveComplete}          // Prop: callback al guardar
      />

      <hr /> {/* Separador visual */}

      {/* Lista de empleados */}
      <ListaEmpleados
        onEdit={handleEdit}                          // Prop: función que se ejecuta al editar
      />
    </div>
  );
}

// Exportamos el componente para que sea usado en index.js
export default App;