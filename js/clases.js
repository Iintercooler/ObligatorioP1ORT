class Donante {
    constructor(nombre, direccion, telefono) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    toString() {
        return this.nombre + " " + this.direccion + " " + this.telefono;
    }
}

class Donacion {
    constructor(donante, modo, monto, comentarios) {

        this.donante = donante;
        this.modo = modo;
        this.monto = monto;
        this.comentarios = comentarios;
    }
    toString() {
        return this.donante + " " + this.modo + " " + this.monto + " " + this.comentarios;

    }




}

class Sistema {
    constructor() {
        this.listaDonantes = [];
        this.listaDonaciones = [];
    }

    agregarDonante(donante) {
        this.listaDonantes.push(donante);
    }

    darDonantes() {
        return this.listaDonantes;
    }

    agregarDonacion(donacion) {
        this.listaDonaciones.push(donacion);
    }


    darDonaciones() {
        return this.listaDonaciones;
    }

    ordenarDonacionesporMontos() {
        return this.listaDonaciones.sort(function(prim, seg) {
            return seg.monto - prim.monto;
        });

    }

    datosdeprueba() {


        let a = new Donante("b", "Pando", 123);
        let b = new Donante("a", "Pando", 123);

        let c = new Donacion(a, "efectivo", 500, "sin comentarios");
        let d = new Donacion(b, "efectivo", 600, "sin comentarios");

        let donaciones = [];

        donaciones.push(c);
        donaciones.push(d);

        // function darporNombre(donaciones) {
        //     return donaciones.sort(function(prim, seg) {
        //         let diff = prim.nombre.localeCompare(seg.nombre);

        //         return diff;
        //     })
        // }

        // return darporNombre(donaciones);
        return donaciones;


    }

    DonacionPorModo() {
        let donaciones = this.darDonaciones();
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

}