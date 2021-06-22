window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("IdBoton").addEventListener("click", agregarDon);
    document.getElementById("IdBoton2").addEventListener("click", agregarDonac);
    document.getElementById("IdBoton2").addEventListener("click", CargarTabla);






}


let sistema = new Sistema();

function agregarDon() {
    if (document.getElementById("frmIngresodeDatos").reportValidity()) {
        let nombre = document.getElementById("idNombre").value;
        let direcccion = document.getElementById("idDireccion").value;
        let telefono = document.getElementById("idTelefono").value;


        let donante1 = new Donante(nombre, direcccion, telefono);
        sistema.agregarDonante(donante1);
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


function agregarDonac() {
    if (document.getElementById("frmIngresodeDatos2").reportValidity()) {
        let nombre = document.getElementById("idDonante").value
        let modo = document.getElementById("IdModo").name;
        let monto = document.getElementById("idMonto").value;
        let comentarios = document.getElementById("idComentarios").value;

        let donancion1 = new Donacion(nombre, modo, monto, comentarios);

        sistema.agregarDonacion(donancion1);
        document.getElementById("idMonto").value = "";
        document.getElementById("idComentarios").value = "";
    }
}



function CargarTabla() {


    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";
    let donaciones = sistema.darDonaciones();
    let fila2 = tabla.insertRow();
    let celdas1 = fila2.insertCell();
    celdas1.innerHTML = "Donante";
    let celdas2 = fila2.insertCell();
    celdas2.innerHTML = "Monto";
    let celdas3 = fila2.insertCell();
    celdas3.innerHTML = "Modo";
    let celdas4 = fila2.insertCell();
    celdas4.innerHTML = "Comentarios";

    for (let elem of donaciones) {

        let fila = tabla.insertRow();
        let celda1 = fila.insertCell();
        celda1.innerHTML = elem.donante;
        let celda2 = fila.insertCell();
        celda2.innerHTML = elem.monto;
        let celda3 = fila.insertCell();
        celda3.innerHTML = elem.modo;
        let celda4 = fila.insertCell();
        celda4.innerHTML = elem.comentarios;


    }


}