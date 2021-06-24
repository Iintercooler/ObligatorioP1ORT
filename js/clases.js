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

    ordenarDonacionesporNombres() {


        let a = new Donante("jose", "Pando", 123);
        let b = new Donante("marcos", "Pando", 123);

        let c = new Donacion(a, "efectivo", 500, "sin comentarios");
        let d = new Donacion(b, "efectivo", 600, "sin comentarios");

        let donaciones = [];

        donaciones.push(c);
        donaciones.push(d);

        function darporNombre(donaciones) {
            return donaciones.sort(function(prim, seg) {
                let diff = prim.nombre.localeCompare(seg.nombre);

                return diff;
            })
        }

        return darporNombre(donaciones);



    }

}