document.addEventListener("DOMContentLoaded", async () => {
  const tablaEmpleados = document.querySelector("#tablaEmpleados tbody");

  async function cargarEmpleados() {
    try {
      const response = await fetch("http://localhost:3000/api/empleados");
      const empleados = await response.json();

      tablaEmpleados.innerHTML = ""; // limpiar tabla

      empleados.forEach(emp => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${emp.RUT_empleado}</td>
          <td>${emp.nombre_empleado}</td>
          <td>${emp.telefono_empleado}</td>
          <td>${emp.direccion_empleado}</td>
          <td>${emp.correo_electronico}</td>
          <td>${emp.fecha_nacimiento ? emp.fecha_nacimiento.split('T')[0] : ''}</td>
          <td>${emp.EPS}</td>
          <td>${emp.salario}</td>
          <td>${emp.tipo_contrato}</td>
          <td>${emp.id_cargo}</td>
          <td>${emp.NIT_hotel}</td>
        `;
        tablaEmpleados.appendChild(fila);
      });
    } catch (error) {
      console.error("Error cargando empleados:", error);
    }
  }

  cargarEmpleados();
});
