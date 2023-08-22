let codigo;
let rubro;
let codigoInterno;
let nombreProducto;
let precio;
let stock;
let prod;
const carrito = [];
let total = 0;


const rubros = ["Todos", "Caramelos", "Chocolates", "Electronica", "Gallettas", "Lacteos", "Merceria", "Regaleria", "Snacks"];

class Producto {
    constructor(codigo, rubro, codigoInterno, nombreProducto, stock, precio) {
        this.codigo = codigo;
        this.rubro = rubro;
        this.codigoInterno = codigoInterno;
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.stock = stock;
    }
}

const productos = [];

productos.push(new Producto(1, 2, 1, "Sugus", 10, 10));
productos.push(new Producto(2, 2, 2, "Palito de la selva", 10, 12));
productos.push(new Producto(3, 2, 3, "Billiken", 10, 56));
productos.push(new Producto(4, 3, 1, "Block", 10, 78));
productos.push(new Producto(5, 3, 2, "Milka", 10, 29));
productos.push(new Producto(6, 3, 3, "Toke", 10, 66));
productos.push(new Producto(7, 4, 1, "Cargador", 10, 88));
productos.push(new Producto(8, 4, 2, "Cable Usb", 10, 96));
productos.push(new Producto(9, 4, 3, "Memoria Micro SD 32gb", 10, 58));
productos.push(new Producto(10, 5, 1, "Divercion", 10, 96));
productos.push(new Producto(11, 5, 2, "Oreo", 10, 88));
productos.push(new Producto(12, 5, 3, "Don Satur", 10, 13));
productos.push(new Producto(13, 6, 1, "Leche entera", 10, 15));
productos.push(new Producto(14, 6, 2, "Leche descremada", 10, 79));
productos.push(new Producto(15, 6, 3, "Yogurt Ls Fut", 10, 85));
productos.push(new Producto(16, 7, 1, "Agujas Canastita", 10, 63));
productos.push(new Producto(17, 7, 2, "Elastico 2mts", 10, 49));
productos.push(new Producto(18, 7, 3, "Hilo de coser", 10, 78));
productos.push(new Producto(19, 8, 1, "Caja de bombones", 10, 63));
productos.push(new Producto(20, 8, 2, "Perfume mujercitas", 10, 73));
productos.push(new Producto(21, 8, 3, "Vino + Caja", 10, 15));
productos.push(new Producto(22, 9, 1, "Doritos", 10, 91));
productos.push(new Producto(23, 9, 2, "Lay's", 10, 85));
productos.push(new Producto(24, 9, 3, "Cheettos", 10, 35));


let selecion;
let filtro, alerta, alerta2;

function Largo(arr, alerta) {//Para comparar si la opcion igresada esta en el rago del tamaño de array()
    let larg = arr.length
    if ((alerta > larg) || (alerta < 1)) {
        return false;
    } else {
        return true;
    }
}

function MostarRubros(rubros) {// Para concatenar los rubros e imprimirlos en pantalla
    alerta = "Ingrese el rubro : ";
    rubros.forEach(el => {
        alerta = alerta + "\n" + (rubros.indexOf(el) + 1) + " - " + el;
    }
    );
    alerta = alerta + "\nFinalizar - Ingrese cualquier caracter que no este en la lista"
}
function MostrarProductos(productos, filtro) {// Para concatenar los productos(segun seleccion de Rubro: TODOS o Un rubro especifico) e imprimirlos en pantalla
    alerta2 = "Selecione los productos que quiere agregar al carrito : "
    if (filtro == 1) {//Todos los rubros
        for (let i = 0; i < productos.length; i++) {

            alerta2 = alerta2 + "\n" + productos[i].codigo + " - " + productos[i].nombreProducto;
        }
    } else {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].rubro == filtro) {//Rubro especfico
                alerta2 = alerta2 + "\n" + productos[i].codigoInterno + " - " + productos[i].nombreProducto;
            }
        }
    }
}

function Carrito() {// para almacenar los productos seleccionados. Se almacena en el array vacio "carrito"
    MostarRubros(rubros)
    filtro = prompt(alerta);
    while (Largo(rubros, filtro)) {//mientras se verifique  que seleccion este dentro del rango de rubros
        MostrarProductos(productos, filtro);
        let selec = true;// *1 selec asegura no guardar un "undefined" en carrito al ingresar una opcion invalida
        selecion = prompt(alerta2);
        if (filtro == 1) {// Todos los rubros
            
            if (Largo(productos, selecion)&&(Existencia(productos,selecion-1))) {
                prod = selecion;
                productos[selecion-1].stock = (productos[selecion-1].stock)-1;
            } else if (Largo(productos, selecion)&&(!(Existencia(productos,selecion-1)))){//No hay stock
                alert("No hay stock del producto selecionado");
                selec = false;//*1
            }else{//opcion invalida
                alert("Opcion invalida ")
                selec = false;//*1
            }
        } else {
            
            if ((selecion == 1) || (selecion == 2) || (selecion == 3)) {// Rubro especifico, 3 opciones por rubro
                for (let i = 0; i < productos.length; i++) {
                    if (((productos[i].rubro == filtro) && (productos[i].codigoInterno == selecion))&&(Existencia(productos,i))) {//1ro coincidencia de rubro, 2do cooincidencia de codigo interno, 3ro stock valido
                        prod = productos[i].codigo;
                        productos[i].stock =(productos[i].stock)-1;
                    }else if (((productos[i].rubro == filtro) && (productos[i].codigoInterno == selecion))&&(!(Existencia(productos,i)))) {// si coinciden las dos primeras, pero no la existencias es por que no hay stock
                        alert("No hay stock del producto selecionado");
                        selec = false;//*1  
                    }
                }
            
            } else {//si no coinciden ningunas de las anteriores se igreso una opcion invalida
                alert("Opcion invalida ")
                selec = false;// *1
            }
        }
        if (selec) {//*1
            carrito.push(productos[prod - 1]);
        }
        filtro = prompt(alerta);
    }
}


function MostrarCompra(arr) {
    Carrito()
    let listaCompra = "Su Carrito : \n";
    arr.forEach(pro => {
        total = (pro.precio) + total;
        listaCompra = listaCompra + pro.nombreProducto + "  $ " + pro.precio + "\n";
    });
    if (total == 0) {
        return listaCompra = "Su carrito esta vacio"
    } else {
        return listaCompra + "Total :  $ " + total;
    }
}

function Existencia(productos,prod){//Control de estock, si el estok es 0 negativo no permite vender
    if ((productos[prod].stock) < 1 ){
       
    return false
}else{
    return true
}
}
alert(MostrarCompra(carrito));

