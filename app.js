// Arreglo global que almacenará los números aleatorios generados.
let vector = [];

// --- ASIGNACIÓN DE EVENTOS A LOS BOTONES DE LA INTERFAZ ---
document.getElementById("btn-cargar-vector").addEventListener("click", cargarVector);
document.getElementById("btn-vaciar-vector").addEventListener("click", vaciarVector);
document.getElementById("btn-numero-mayor").addEventListener("click", valorMaximo);
document.getElementById("btn-numero-menor").addEventListener("click", valorMinimo);
document.getElementById("btn-sumar-valores").addEventListener("click", sumaTotal);
document.getElementById("btn-producto-vector").addEventListener("click", productoTotal);
document.getElementById("btn-calcular-moda").addEventListener("click", calcularModa);
document.getElementById("btn-calcular-media").addEventListener("click", calcularMedia);
document.getElementById("btn-calcular-mediana").addEventListener("click", calcularMediana);
document.getElementById("btn-ordenar-seleccion").addEventListener("click", ordenarSeleccion);
document.getElementById("btn-ordenar-burbuja").addEventListener("click", ordenarBurbuja);

// Evento 'input' para disparar la búsqueda en tiempo real mientras el usuario escribe.
document.getElementById("id-valor-busqueda").addEventListener("input", buscarValor);

/**
 * Genera números aleatorios entre 1 y 100 según la dimensión seleccionada.
 * Limpia e inserta celdas dinámicamente en la tabla HTML para reflejar los índices y valores.
 */
function cargarVector() {
    let dimension = parseInt(document.getElementById("select-dimension-arreglo").value);
    vector = []; // Reinicializa el vector

    const tabla = document.getElementById("id-table-vector-numerico");
    const filaIndices = tabla.tBodies[0].rows[0];
    const filaValores = tabla.tBodies[0].rows[1];

    // Limpia el contenido previo de la tabla
    filaIndices.innerHTML = "";
    filaValores.innerHTML = "";

    // Ciclo para poblar el array y construir las celdas de la tabla
    for (let i = 0; i < dimension; i++) {
        let valor = Math.floor(Math.random() * 100) + 1; // Rango [1 - 100]
        vector.push(valor);

        filaIndices.innerHTML += `<td>${i}</td>`;
        filaValores.innerHTML += `<td>${valor}</td>`;
    }

    document.getElementById("id-txt-respuesta").value = "Vector cargado correctamente";
}

/**
 * Borra todos los elementos del arreglo global y resetea las celdas visuales de la tabla.
 */
function vaciarVector() {
    vector = []; // Vacía el array

    const tabla = document.getElementById("id-table-vector-numerico");
    const filaIndices = tabla.tBodies[0].rows[0];
    const filaValores = tabla.tBodies[0].rows[1];

    filaIndices.innerHTML = "";
    filaValores.innerHTML = "";

    document.getElementById("id-txt-respuesta").value = "Vector vaciado";
}

/**
 * Algoritmo de Búsqueda Secuencial lineal.
 * Recorre el vector de principio a fin registrando cada índice donde coincida el valor buscado.
 */
function buscarValor() {
    if (vector.length === 0) return;

    let valorBuscado = parseInt(document.getElementById("id-valor-busqueda").value);
    if (isNaN(valorBuscado)) return;

    let posiciones = [];

    // Recorrido lineal para identificar coincidencias (Maneja valores duplicados)
    for (let i = 0; i < vector.length; i++) {
        if (vector[i] === valorBuscado) {
            posiciones.push(i);
        }
    }

    if (posiciones.length > 0) {
        document.getElementById("id-txt-respuesta").value =
            `Valor ${valorBuscado} encontrado en la(s) posición(es): ${posiciones.join(", ")}`;
    } else {
        document.getElementById("id-txt-respuesta").value = `Valor ${valorBuscado} no encontrado`;
    }
}

/**
 * Encuentra el valor mínimo del vector mediante la función Math.min y el operador spread.
 * Posteriormente, localiza todas las posiciones donde se encuentra dicho elemento mínimo.
 */
function valorMinimo() {
    if (vector.length === 0) {
        document.getElementById("id-txt-respuesta").value = "Vector vacío";
        return;
    }

    let minimo = Math.min(...vector);
    let posiciones = [];

    // Localización de índices del valor mínimo
    for (let i = 0; i < vector.length; i++) {
        if (vector[i] === minimo) {
            posiciones.push(i);
        }
    }

    document.getElementById("id-txt-respuesta").value =
        `Valor mínimo: ${minimo} | Posición(es): ${posiciones.join(", ")}`;
}

/**
 * Determina el valor máximo del vector usando Math.max.
 * Mapea el vector para reportar todas las posiciones indexadas que contienen este valor.
 */
function valorMaximo() {
    if (vector.length === 0) {
        document.getElementById("id-txt-respuesta").value = "Vector vacío";
        return;
    }

    let maximo = Math.max(...vector);
    let posiciones = [];

    // Localización de índices del valor máximo
    for (let i = 0; i < vector.length; i++) {
        if (vector[i] === maximo) {
            posiciones.push(i);
        }
    }

    document.getElementById("id-txt-respuesta").value =
        `Valor máximo: ${maximo} | Posición(es): ${posiciones.join(", ")}`;
}

/**
 * Algoritmo de Acumulación (Suma).
 * Recorre secuencialmente el vector sumando cada elemento en una variable acumuladora.
 */
function sumaTotal() {
    if (vector.length === 0) {
        document.getElementById("id-txt-respuesta").value = "Vector vacío";
        return;
    }

    let suma = 0;
    for (let i = 0; i < vector.length; i++) {
        suma += vector[i];
    }

    document.getElementById("id-txt-respuesta").value = `Suma total: ${suma}`;
}

/**
 * Algoritmo de Acumulación por Productoria.
 * Multiplica los elementos del vector consecutivamente iniciando la variable en 1.
 */
function productoTotal() {
    if (vector.length === 0) {
        document.getElementById("id-txt-respuesta").value = "Vector vacío";
        return;
    }

    let producto = 1;
    for (let i = 0; i < vector.length; i++) {
        producto *= vector[i];
    }

    document.getElementById("id-txt-respuesta").value = `Producto total: ${producto}`;
}

/**
 * Calcula el promedio aritmético elemental del vector.
 * Suma todos sus valores y divide el resultado total para el número total de elementos (longitud).
 */
function calcularMedia() {
    if (vector.length === 0) {
        document.getElementById("id-txt-respuesta").value = "Vector vacío";
        return;
    }

    let suma = 0;
    for (let i = 0; i < vector.length; i++) {
        suma += vector[i];
    }

    let media = suma / vector.length;
    document.getElementById("id-txt-respuesta").value = "Media: " + media.toFixed(2);
}

/**
 * Calcula la Mediana Estadística.
 * Clona el arreglo original para evitar efectos secundarios, lo ordena numéricamente y
 * extrae el centro. Si el número de elementos es par, promedia los dos centrales.
 */
function calcularMediana() {
    if (vector.length === 0) {
        document.getElementById("id-txt-respuesta").value = "Vector vacío";
        return;
    }
    
    // Clonación y ordenación numérica correcta en JavaScript mediante callback (a, b) => a - b
    let ordenado = [...vector].sort((a, b) => a - b);
    let n = ordenado.length;
    let mediana;

    if (n % 2 === 0) {
        // Caso par: Promedio de los dos elementos centrales
        mediana = (ordenado[n / 2 - 1] + ordenado[n / 2]) / 2;
    } else {
        // Caso impar: Elemento ubicado exactamente en la mitad de la lista ordenada
        mediana = ordenado[Math.floor(n / 2)];
    }

    document.getElementById("id-txt-respuesta").value = "Mediana: " + mediana;
}

/**
 * Calcula la Moda de los datos empleando un Mapa de Frecuencias (objeto clave-valor).
 * Cuenta las repeticiones de cada número e identifica cuál o cuáles tienen la frecuencia más alta.
 */
function calcularModa() {
    if (vector.length === 0) {
        document.getElementById("id-txt-respuesta").value = "Vector vacío";
        return;
    }

    let frecuencia = {};
    let maxFrecuencia = 0;

    // Construcción del mapeo distribucional de frecuencias
    for (let i = 0; i < vector.length; i++) {
        let num = vector[i];
        frecuencia[num] = (frecuencia[num] || 0) + 1;

        if (frecuencia[num] > maxFrecuencia) {
            maxFrecuencia = frecuencia[num];
        }
    }

    let modas = [];
    // Filtrado de las claves que alcancen la frecuencia máxima calculada
    for (let clave in frecuencia) {
        if (frecuencia[clave] === maxFrecuencia) {
            modas.push(clave);
        }
    }

    // Si la frecuencia máxima es 1, significa que estadísticamente no existe moda
    if (maxFrecuencia === 1) {
        document.getElementById("id-txt-respuesta").value =
            "No hay moda (todos los valores aparecen una sola vez)";
    } else {
        document.getElementById("id-txt-respuesta").value =
            "Moda: " + modas.join(", ") + " | Frecuencia: " + maxFrecuencia;
    }
}

/**
 * Algoritmo de Ordenamiento por Selección (Selection Sort).
 * Divide el arreglo en una sección ordenada y otra desordenada. Busca iterativamente el elemento 
 * mínimo (o máximo) de la sección desordenada y lo intercambia con el elemento al inicio de esa sección.
 */
function ordenarSeleccion() {
    if (vector.length === 0) {
        document.getElementById("id-txt-respuesta").value = "Vector vacío";
        return;
    }

    let orden = document.getElementById("select-orden").value;
    let arr = [...vector]; // Copia para preservar el estado original del vector global

    for (let i = 0; i < arr.length; i++) {
        let idx = i; // Asume provisionalmente el índice actual como el extremo

        for (let j = i + 1; j < arr.length; j++) {
            if (orden === "asc") {
                if (arr[j] < arr[idx]) { idx = j; } // Guarda el menor encontrado
            } else {
                if (arr[j] > arr[idx]) { idx = j; } // Guarda el mayor encontrado
            }
        }

        // Intercambio de posiciones (Swap)
        let temp = arr[i];
        arr[i] = arr[idx];
        arr[idx] = temp;
    }

    actualizarTabla(arr);
    document.getElementById("id-txt-respuesta").value = "Vector ordenado por Selección (" + orden + ")";
}

/**
 * Algoritmo de Ordenamiento Burbuja (Bubble Sort).
 * Compara pares de elementos adyacentes consecutivamente y los intercambia si están en el 
 * orden incorrecto. El procedimiento se repite elevando el número mayor/menor al final en cada pasada.
 */
function ordenarBurbuja() {
    if (vector.length === 0) {
        document.getElementById("id-txt-respuesta").value = "Vector vacío";
        return;
    }

    let orden = document.getElementById("select-orden").value;
    let arr = [...vector]; // Copia protectora de los datos

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            // Evaluación condicional adaptativa según el orden configurado (Asc/Desc)
            if (
                (orden === "asc" && arr[j] > arr[j + 1]) ||
                (orden === "desc" && arr[j] < arr[j + 1])
            ) {
                // Swap de elementos adyacentes
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    actualizarTabla(arr);
    document.getElementById("id-txt-respuesta").value = "Vector ordenado por Burbuja (" + orden + ")";
}

/**
 * Función Auxiliar de Renderizado de Interfaz.
 * Actualiza únicamente la segunda fila de la tabla (valores) para reflejar los arreglos ordenados.
 */
function actualizarTabla(arr) {
    const tabla = document.getElementById("id-table-vector-numerico");
    const filaValores = tabla.tBodies[0].rows[1];
    filaValores.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        filaValores.innerHTML += `<td>${arr[i]}</td>`;
    }
}