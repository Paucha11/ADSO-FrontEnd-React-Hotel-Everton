document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEmpleado");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const empleado = {
      RUT_empleado: form.RUT_empleado.value,
      id_cargo: form.id_cargo.value,
      NIT_hotel: form.NIT_hotel.value,
      nombre_empleado: form.nombre_empleado.value,
      telefono_empleado: form.telefono_empleado.value,
      direccion_empleado: form.direccion_empleado.value,
      correo_electronico: form.correo_electronico.value,
      fecha_nacimiento: form.fecha_nacimiento.value,
      EPS: form.EPS.value,
      salario: parseFloat(form.salario.value),
      tipo_contrato: form.tipo_contrato.value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/empleados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empleado),
      });

      if (response.ok) {
        alert("Empleado agregado correctamente");
        form.reset();
      } else {
        alert("Error al agregar empleado");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en la conexión con el servidor");
    }
  });
});
