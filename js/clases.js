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

    returnObjDonante(nombreDonante) {
        let donanteAux = null;
        let esta = false;
        for (let i = 0; this.listaDonantes.length && !esta; i++) {
            alert(this.listaDonantes[0].nombre);
            if (this.listaDonantes[i].nombre === nombreDonante) {
                donanteAux = this.listaDonantes[i];
            }
        }
        return donanteAux;
    }



}