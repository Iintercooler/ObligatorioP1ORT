window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("IdBoton").addEventListener("click", crearDonante);
    document.getElementById("IdBoton2").addEventListener("click", crearDonacion);
    document.getElementById("IdBoton3").addEventListener("click", CargarTablaPorNombres);

}


let sistema = new Sistema();
// Funcion crearDonante() lee los campos y crea un objeto donante que luego agrega a la lista de donantes.
function crearDonante() {
    if (document.getElementById("frmIngresodeDatos").reportValidity()) {


        let nombre = document.getElementById("idNombre").value;
        let direcccion = document.getElementById("idDireccion").value;
        let telefono = document.getElementById("idTelefono").value;

        let donante1 = new Donante(nombre, direcccion, telefono);
        sistema.agregarDonante(donante1); //Agrega el objeto donante al array de donantes



        //Agrega al select el objeto donante creado

        var sel = document.getElementById("idDonante");
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode(donante1.nombre));
        opt.value = donante1.nombre;
        sel.appendChild(opt);
        document.getElementById("idNombre").value = "";
        document.getElementById("idDireccion").value = "";
        document.getElementById("idTelefono").value = "";
    }
}



function crearDonacion() {
    if (document.getElementById("frmIngresodeDatos2").reportValidity()) {
        let nombre = document.getElementById("idDonante").value;
        let listaDeDonantes = sistema.darDonantes();


        function returnObjDonante(nombre, listaDonantes) {
            let donanteAux = null;
            let esta = false;
            for (let i = 0; i < listaDonantes.length && !esta; i++) {
                console.log(listaDeDonantes[i]);
                let name = listaDonantes[i].nombre;
                if (name == nombre) {
                    donanteAux = listaDonantes[i];
                }
            }
            return donanteAux;
        }

        let objdonante = returnObjDonante(nombre, listaDeDonantes);
        let modo = darModo();
        let monto = parseInt(document.getElementById("idMonto").value);
        let comentarios = document.getElementById("idComentarios").value;

        let donancion1 = new Donacion(objdonante, modo, monto, comentarios);
        // console.log(donancion1);

        sistema.agregarDonacion(donancion1);
        document.getElementById("idMonto").value = "";
        document.getElementById("idComentarios").value = "";
    }

    // CargarTabla(CargarTablaPorMonto());
    CargarTabla(CargarTablaPorNombres());

}

function darModo() {
    let modo = document.getElementById("IdModo").value;
    let resu;
    if (modo == 1) { resu = "Efectivo"; }
    if (modo == 2) { resu = "Transferencia"; }
    if (modo == 3) { resu = "Canje"; }
    if (modo == 4) { resu = "Mercadería"; }
    if (modo == 5) { resu = "Cheque"; }
    if (modo == 6) { resu = "Otros"; }

    return resu;
}


function CargarTabla(lista) {

    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    let fila2 = tabla.insertRow();
    let celdas1 = fila2.insertCell();
    celdas1.innerHTML = "Donante";
    let celdas2 = fila2.insertCell();
    celdas2.innerHTML = "Monto";
    let celdas3 = fila2.insertCell();
    celdas3.innerHTML = "Modo";
    let celdas4 = fila2.insertCell();
    celdas4.innerHTML = "Comentarios";


    //let ListaDonaciones = sistema.darDonaciones();
    for (let elem of lista) {

        let fila = tabla.insertRow();
        let celda1 = fila.insertCell();
        celda1.innerHTML = "(" + elem.donante.nombre + ")" + "(" + elem.donante.direccion + ")" + "(" + elem.donante.telefono + ")";
        let celda2 = fila.insertCell();
        celda2.innerHTML = elem.monto;
        let celda3 = fila.insertCell();
        celda3.innerHTML = elem.modo;
        let celda4 = fila.insertCell();

        celda4.innerHTML = elem.comentarios;

    }

}


function CargarTablaPorMonto() {
    let tabla = document.getElementById("tabla");
    let donaciones = sistema.ordenarDonacionesporMontos();
    return donaciones;
}


function CargarTablaPorNombres() {
    let tabla = document.getElementById("tabla");
    let donaciones = sistema.ordenarDonacionesporNombres();
    console.log(donaciones);
    return donaciones;
}