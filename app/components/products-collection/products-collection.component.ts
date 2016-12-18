import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/switchMap";
import { ActivatedRoute } from "@angular/router";

import { Product } from "../../models/product";
import { ProductFilter } from "../../models/product-filter";
import { ProductService } from "../../services/product.service";

@Component({
    templateUrl: "./app/components/products-collection/products-collection.component.html",
    styleUrls: ["./app/components/products-collection/products-collection.component.css"]
})
export class ProductsCollectionComponent implements OnDestroy, OnInit {
    
    private _products: Product[];
    private _filterStream$: Subject<ProductFilter> = new Subject;

    productoSeleccionado: Product;

    constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._filterStream$
            .switchMap((filter: ProductFilter) => this._productService.getProducts(filter))
            .subscribe((products: Product[]) => this._products = products);
        this.filterCollection(null);

    }

    ngOnDestroy(): void {
        this._filterStream$.unsubscribe();
    }

    filterCollection(filter: ProductFilter): void {
        this._filterStream$.next(filter);
    }

    verDetallesProducto(producto: Product): void {
       
       this.productoSeleccionado = producto;
    }
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Green Path                                                       |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Maneja el evento del componente ProductComponent que indica la   |
    | selección de un producto y navega a la dirección correspondiente.|
    | Recuerda que para hacer esto necesitas inyectar como dependencia |
    | el Router de la app. La ruta a navegar es '/products', pasando   |
    | como parámetro el identificador del producto.                    |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
}