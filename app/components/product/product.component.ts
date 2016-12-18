import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Product } from "../../models/product";
import { ProductFilter } from "../../models/product-filter";

@Component({
    selector: "product",
    templateUrl: "./app/components/product/product.component.html",
    styleUrls: ["./app/components/product/product.component.css"]
})
export class ProductComponent {

    private _productFilter: ProductFilter = {};

    @Input() data: Product;

    @Output() productoSeleccionado: EventEmitter<Product> = new EventEmitter();

    @Output() onSearch: EventEmitter<ProductFilter> = new EventEmitter();

    detalleProducto(producto: Product): void {
        this.productoSeleccionado.emit(producto);
    }

    filtrarUser(producto: Product): void {
        this._productFilter.user = producto.seller.nick;
        this.onSearch.emit(this._productFilter);
    }
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Green Path                                                       |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Expón un atributo de salida con el decorador correspondiente. El |
    | tipo de dicho atributo debe permitir la emisión de eventos; la   |
    | idea es enviar al componente padre el producto sobre el cuál se  |
    | ha hecho clic. Y puesto que dicho clic se realiza en el template |
    | de este componente, necesitas, además, un manejador para el      |
    | mismo.                                                           |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
}
