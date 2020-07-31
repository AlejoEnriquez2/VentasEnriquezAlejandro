import { Carrito } from './../model/carrito';
import { Producto } from './../model/producto';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private afs: AngularFirestore) { }

  carrito: Carrito = new Carrito;
  c: Observable<any>;

  obtenerProductos(): Observable<any[]>{
    return this.afs.collection("producto", 
    ref => ref.orderBy('nombre','asc')).valueChanges();
  }

  obtenerProducto(uid: string): Observable<any>{
    let itemDoc = this.afs.doc<any>(`producto/${uid}`);
    return itemDoc.valueChanges();
  }

  async obtenerProductoId(uid:string): Promise<Producto>{
    try{
      let aux:any = await this.afs.collection('producto',
      ref => ref.where('uid', '==', uid))
      .valueChanges().pipe(first()).toPromise().then(doc => {
        return doc;
      }).catch(error => {
        throw error;
      });
      if (aux.length == 0)
        return undefined;
      return aux[0];
    } catch(error) {
      console.error("Error", error);
      throw error;
    }
  }

  getCarrito(): Observable<any>{
    let itemDoc = this.afs.doc<any>(`carrito/${'cXczbBGbnV9c1T2iGNs6'}`);
    return itemDoc.valueChanges();
  }

  mergeCarrito(carrito: Carrito) {
    console.log('mergeCarrito')
    console.log(carrito)
    const refCarrito = this.afs.collection('carrito')
    const param = JSON.parse(JSON.stringify(carrito));
    refCarrito.doc(carrito.uid).set(param, {merge: true})
  }


  agregarProducto(producto: Observable<any>){    
    const refCarrito = this.afs.collection('carrito')
    const carrito = this.getCarrito().subscribe(datos =>{
      console.log(datos)
      datos.productos.push(producto)
      this.mergeCarrito(datos)
      console.log(datos)
    });
  }
}
