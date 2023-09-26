const pacientes = [];
const mensajeDiv = document.getElementById('mensaje');
const agendarButton = document.getElementById('agendar');
const verButton = document.getElementById('ver');
const nombreInput = document.getElementById('nombre');
const motivoConsultaInput = document.getElementById('motivoConsulta');
const diaTurnoInput = document.getElementById('diaTurno');
const horaTurnoInput = document.getElementById('horaTurno');
const listaTurnosDiv = document.getElementById('listaTurnos');

function mostrarMensaje(mensaje) {
    mensajeDiv.textContent = mensaje;
}

function limpiarMensaje() {
    mensajeDiv.textContent = '';
}

function limpiarCampos() {
    nombreInput.value = '';
    motivoConsultaInput.value = '';
    diaTurnoInput.value = '1';
    horaTurnoInput.value = '1';
}

function AsignarTurno() {
    const Dia = parseInt(diaTurnoInput.value);
    const Hora = parseInt(horaTurnoInput.value);
    const nombre = nombreInput.value.trim();
    const motivoConsulta = motivoConsultaInput.value.trim();

    const DiasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const Horas = ["8:00", "9:00", "10:00"];

    if (nombre === '' || motivoConsulta === '') {
        mostrarMensaje("Por favor, complete todos los campos.");
        return;
    }

    if (Dia >= 1 && Dia <= 5 && Hora >= 1 && Hora <= 3) {
        const DiaSeleccionado = DiasSemana[Dia - 1];
        const HoraSeleccionada = Horas[Hora - 1];

        const paciente = {
            Nombre: nombre,
            MotivoConsulta: motivoConsulta,
            DiaTurno: DiaSeleccionado,
            HoraTurno: HoraSeleccionada,
        };

        pacientes.push(paciente);
        limpiarCampos();
        mostrarMensaje(`Turno agendado para el día ${DiaSeleccionado} a las ${HoraSeleccionada} a nombre de ${paciente.Nombre} por el siguiente motivo de consulta: ${paciente.MotivoConsulta}. ¡Te esperamos!`);
    } else {
        mostrarMensaje("Selección de turno inválida, intente nuevamente.");
    }
}

function VerTurnos() {
    const turnosList = document.getElementById('turnosList');
    turnosList.innerHTML = ''; 

    if (pacientes.length === 0) {
        mostrarMensaje("No hay turnos agendados.");
    } else {
        pacientes.forEach((paciente, index) => {
            const turnoItem = document.createElement('li');
            turnoItem.textContent = `Nombre: ${paciente.Nombre}, Día del turno: ${paciente.DiaTurno}, Hora del turno: ${paciente.HoraTurno}, Motivo de consulta: ${paciente.MotivoConsulta}`;

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => {
                EliminarTurno(index);
            });

            turnoItem.appendChild(botonEliminar);
            turnosList.appendChild(turnoItem);
        });

        listaTurnosDiv.style.display = 'block'; 
    }
}

function EliminarTurno(index) {
    pacientes.splice(index, 1);
    VerTurnos();
    mostrarMensaje("Turno eliminado.");
}

function iniciarGestorTurnos() {
    agendarButton.addEventListener('click', () => {
        limpiarMensaje();
        AsignarTurno();
    });

    verButton.addEventListener('click', () => {
        limpiarMensaje();
        VerTurnos();
    });

    cargarTurnosAlmacenados();
}

function cargarTurnosAlmacenados() {
    const turnosGuardados = localStorage.getItem('turnos');
    if (turnosGuardados) {
        pacientes.push(...JSON.parse(turnosGuardados));
        VerTurnos();
    }
}

function guardarTurnosEnAlmacenamiento() {
    localStorage.setItem('turnos', JSON.stringify(pacientes));
}

window.addEventListener('beforeunload', () => {
    guardarTurnosEnAlmacenamiento();
});

iniciarGestorTurnos();
