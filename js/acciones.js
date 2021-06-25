window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("IdBoton").addEventListener("click", crearDonante);
    document.getElementById("IdBoton2").addEventListener("click", crearDonacion);
    document.getElementById("idResaltarFilas").addEventListener("click", pintar);
    document.getElementById("IdBoton3").addEventListener("click", DonacionPorModo);



}


let sistema = new Sistema();

// Funcion crearDonante() lee los campos y crea un objeto donante que luego agrega a la lista de donantes.
function crearDonante() {
    if (document.getElementById("frmIngresodeDatos").reportValidity()) {


        let nombre = document.getElementById("idNombre").value;
        let direcccion = document.getElementById("idDireccion").value;
        let telefono = document.getElementById("idTelefono").value;

        if (sistema.darDonantes() != null) {

            if (!existeDonante(nombre, sistema.darDonantes())) {
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
                document.getElementById("errorNombre").innerHTML = "";




            } else {
                document.getElementById("errorNombre").innerHTML = "Donante ya registrado";

            }


        }
    } else {
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
        let nombresDeDonantes = [];
        nombresDeDonantes.push(objdonante.nombre);




        sistema.agregarDonacion(donancion1);
        document.getElementById("idMonto").value = "";
        document.getElementById("idComentarios").value = "";
    }


    if (document.getElementById("IdMontodecreciente").checked) {
        CargarTabla(CargarTablaPorMonto());
        console.log("ordenar por monto checkeado");

    } else {

        console.log("el otro chekeado");
    }



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
    cantidadDeDonaciones(lista);
    promedioDedonaciones(lista);
    totalGeneral(lista);
    mayorDonacion();


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
        celda1.innerHTML = elem.donante.nombre + "(" + elem.donante.direccion + "," + elem.donante.telefono + ")";
        let celda2 = fila.insertCell();
        celda2.innerHTML = elem.monto;
        let celda3 = fila.insertCell();
        celda3.innerHTML = elem.modo;
        let celda4 = fila.insertCell();

        celda4.innerHTML = elem.comentarios;

    }
    resaltarMayores();

}


function CargarTablaPorMonto() {
    let tabla = document.getElementById("tabla");
    let donaciones = sistema.ordenarDonacionesporMontos();
    return donaciones;
}


// function CargarTablaPorNombres() {
//     let donaciones = sistema.datosdeprueba();
//     let nombres = [];
//     let objordenados=[];

//     for (let elem of donaciones) {
//         nombres.push(elem.donante.nombre);
//     }
//     resu=nombres.sort();
//     let resu2= [];
//     function returnObjDonante(nombre,listaDeDonantes) {
//         let donanteAux = null;
//         let esta = false;
//         for (let i = 0; i < listaDonantes.length && !esta; i++) {
//             console.log(listaDeDonantes[i]);
//             let name = listaDonantes[i].nombre;
//             if (name == nombre) {
//                 donanteAux = listaDonantes[i];
//             }
//         }
//         return donanteAux;
//     }


//     for (let nom of nombres){
//         objordenados.push(returnObjDonante(elem,donaciones))


//     }
//     return resu;
//}

function noResaltar() {

    valor = document.getElementById("idDemonto").value;
    var table = document.getElementById("tabla");
    var rows = table.getElementsByTagName("tr");

    for (var z = 1; z < rows.length; z++) {
        {
            rows[z].style.backgroundColor = "transparent";
        }
    }

}




function resaltar() {
    valor = document.getElementById("idDemonto").value;
    var table = document.getElementById("tabla");
    var rows = table.getElementsByTagName("tr");

    for (var z = 1; z < rows.length; z++) {
        {
            rows[z].style.backgroundColor = "transparent";
        }
    }

    for (var z = 1; z < rows.length; z++) {
        if (rows[z].cells[1].innerHTML == valor) {
            rows[z].style.backgroundColor = "yellow";
        }
    }

}

function resaltarMayores() {
    valor = document.getElementById("idDemonto").value;
    var table = document.getElementById("tabla");
    var rows = table.getElementsByTagName("tr");

    for (var z = 1; z < rows.length; z++) {
        {
            rows[z].style.backgroundColor = "transparent";
        }
    }

    for (var z = 1; z < rows.length; z++) {
        if (rows[z].cells[1].innerHTML >= 1000) {
            rows[z].cells[1].style.color = "red";
        }
    }

    for (var z = 1; z < rows.length; z++) {
        if (rows[z].cells[1].innerHTML < 1000) {
            rows[z].cells[1].style.color = "green";
        }
    }

}

function pintar() {
    let valor = document.getElementById("idResaltarFilas").checked;

    if (valor) {
        resaltar();

    } else {
        noResaltar();
    }

}

function cantidadDeDonaciones(lista) {
    let resu = lista.length;
    document.getElementById("CantidadDeDonaciones").innerHTML = ("Cantidad de Donaciones: " + resu);



}

function promedioDedonaciones(lista) {
    let promedio = 0;
    let aux = 0;
    for (let ele of lista) {
        aux = aux + ele.monto;

    }
    promedio = aux / lista.length;
    document.getElementById("promedioDonaciones").innerHTML = ("Promedio por donacion: " + promedio);
}


function totalGeneral(lista) {
    let total = 0;
    for (elem of lista) {
        total = total + elem.monto;
    }
    document.getElementById("totalGeneral").innerHTML = ("$" + total);
}


function mayorDonacion() {

    let lista = sistema.darDonaciones();
    let mayor = 0;
    for (let i = 0; i < lista.length; i++) {
        let elemento = lista[i];
        if (elemento.monto > mayor) {
            mayor = elemento.monto;

        }
    }
    document.getElementById("idMayorDonacion").innerHTML = ("$" + mayor);

}


function testexiste() {
    d1 = new Donante("jose", "pando", 123);
    donantes = [];
    donantes.push(d1);

    alert(existeDonante("pedro", donantes))

}

function existeDonante(nombre, lista) {
    nombresDonantes = [];
    resu = false;
    for (let elem of lista) {
        nombresDonantes.push(elem.nombre);

    }

    for (let elem of nombresDonantes) {

        if (String(elem.toLowerCase()) == String(nombre.toLowerCase())) {
            resu = true;
        }

    }
    return resu;
}


function DonacionPorModo() {
    let donaciones = sistema.darDonaciones();
    let modos = [
        { modo: "Efectivo", cantidad: 0 },
        { modo: "Transferencia", cantidad: 0 },
        { modo: "Canje", cantidad: 0 },
        { modo: "Mercadería", cantidad: 0 },
        { modo: "Cheque", cantidad: 0 },
        { modo: "Otros", cantidad: 0 },
    ]
    for (let elem of donaciones) {

        if (elem.modo == "Efectivo") { modos[0].cantidad = modos[0].cantidad + 1; }
        if (elem.modo == "Transferencia") { modos[1].cantidad = modos[1].cantidad + 1; }
        if (elem.modo == "Canje") { modos[2].cantidad = modos[2].cantidad + 1; }
        if (elem.modo == "Mercadería") { modos[3].cantidad = modos[3].cantidad + 1; }
        if (elem.modo == "Cheque") { modos[4].cantidad = modos[5].cantidad + 1; }
        if (elem.modo == "Otros") { modos[5].cantidad = modos[5].cantidad + 1; }
    }
    console.log(modos);
    return modos

}