let tareas = [
    {
        id: 1,
        tarea: 'lavar el auto',
        realizada: true
    },
    {
        id: 2,
        tarea: 'cortar el cesped',
        realizada: false
    },
    {
        id: 3,
        tarea: 'limpiar el techo',
        realizada: true
    }
];

const listadoTareas = document.querySelector("#listadotareas");
const inputTarea = document.querySelector(".todo-input");
const btnAgregar = document.querySelector(".todo-button");

function renderizarTareas() {
    let plantilla = "";
    tareas.forEach(el => {
        plantilla += `
            <tr>
                <td>${el.id}</td>
                <td class="${el.realizada ? 'completed' : ''}">${el.tarea}</td>
                <td>
                    <input type="checkbox" 
                           ${el.realizada ? 'checked' : ''} 
                           onchange="cambiarEstado(${el.id})">
                </td>
                <td>
                    <button class="delete-btn" onclick="eliminarTarea(${el.id})">✕</button>
                </td>
            </tr>
        `;
    });
    listadoTareas.innerHTML = plantilla;
    actualizarContadores();
}

function agregarTarea() {
    const nuevaTarea = inputTarea.value.trim();
    if (nuevaTarea) {
        const newId = tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1;
        tareas.push({
            id: newId,
            tarea: nuevaTarea,
            realizada: false
        });
        inputTarea.value = '';
        renderizarTareas();
    }
}

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    renderizarTareas();
}

function cambiarEstado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.realizada = !tarea.realizada;
        renderizarTareas();
    }
}

function actualizarContadores() {
    const totalTareas = tareas.length;
    const tareasRealizadas = tareas.filter(t => t.realizada).length;
    
    if (!document.querySelector('.contadores')) {
        const contadoresDiv = document.createElement('div');
        contadoresDiv.className = 'contadores';
        contadoresDiv.innerHTML = `
            <p>Total de tareas: <span id="total">0</span></p>
            <p>Tareas realizadas: <span id="realizadas">0</span></p>
        `;
        document.querySelector('.todo-container').appendChild(contadoresDiv);
    }
    
    document.querySelector('#total').textContent = totalTareas;
    document.querySelector('#realizadas').textContent = tareasRealizadas;
}

btnAgregar.addEventListener('click', agregarTarea);
inputTarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

 renderizarTareas();