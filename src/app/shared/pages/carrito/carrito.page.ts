import { Producto } from './../../model/producto';
import { ProductoService } from './../../services/producto.service';
import { Observable } from 'rxjs';
import { Carrito } from './../../model/carrito';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  carrito : Carrito = new Carrito;
  producto : Producto = new Producto;
  c : Observable<any>
  d : Observable<any>

  constructor(private ProductoService: ProductoService) { }

  ngOnInit() {
    this.listarProductos()
  }

  listarProductos(){
    this.c = this.ProductoService.obtenerProductos()
    this.c.subscribe(data=>{
      this.carrito.productos = data     
    })
    
  }

  trackByFn(index, obj) {
    return obj.uid;
  }
}
