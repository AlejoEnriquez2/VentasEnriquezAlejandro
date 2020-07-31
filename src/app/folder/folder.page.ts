import { ProductoService } from './../shared/services/producto.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, 
    private ProductoService: ProductoService,
    private router: Router) { }

  productos : Observable<any[]>

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.listarProductos();
  }

  listarProductos(){
    this.productos = this.ProductoService.obtenerProductos()
  }

  mostrarProducto(id :any){
    this.router.navigate([`producto/${id}`])
  }

  trackByFn(index, obj) {
    return obj.uid;
  }
}
