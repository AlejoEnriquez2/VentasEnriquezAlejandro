import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from './../../services/producto.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  producto: Observable<any>
  carrito: Observable<any>

  constructor(private ProductoService: ProductoService,
    private route: ActivatedRoute, 
    public router: Router) { }

  ngOnInit() {
    const id =  this.route.snapshot.paramMap.get("id")
    this.producto = this.ProductoService.obtenerProducto(id)
  }

  agregarProducto(id: any){
    this.ProductoService.agregarProducto(this.producto);
  }
}
