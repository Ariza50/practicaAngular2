import { Component, EventEmitter, OnInit, OnDestroy, Output } from "@angular/core";
import { Subscription } from "rxjs/Rx";

import { Category } from "../../models/category";
import { CategoryService } from "../../services/category.service";
import { ProductFilter } from "../../models/product-filter";

@Component({
    selector: "product-filter",
    templateUrl: "./app/components/product-filter/product-filter.component.html",
    styleUrls: ["./app/components/product-filter/product-filter.component.css"]
})
export class ProductFilterComponent implements OnInit, OnDestroy {

    @Output() onSearch: EventEmitter<ProductFilter> = new EventEmitter();
    private _productFilter: ProductFilter = {};
    private _categories: Category[];
    private _categoriesSubscription: Subscription;

    ordenacionAlfa: string = "asc";
    ordenacionPVP: string = "asc";

    constructor(private _categoryService: CategoryService) { }

    ngOnInit(): void {
        this._categoriesSubscription = this._categoryService
                                           .getCategories()
                                           .subscribe((data: Category[]) => this._categories = data);
    }

    ngOnDestroy(): void {
        this._categoriesSubscription.unsubscribe();
    }

    notifyHost(): void {
        this.onSearch.emit(this._productFilter);
    }

    ordenAlfa(): void {
        this.ordenacionAlfa = this.ordenacionAlfa === "asc"
            ? "desc"
            : "asc";
        if (this.ordenacionAlfa == "asc") { this._productFilter.sort = "AlphaASC" }
        if (this.ordenacionAlfa == "desc") { this._productFilter.sort = "AlphaDESC" }
        this.notifyHost();
        //console.log("ordenacionAlfa " + this.ordenacionAlfa);
    }

    ordenPVP(): void {
        this.ordenacionPVP = this.ordenacionPVP === "asc"
            ? "desc"
            : "asc";
        if (this.ordenacionPVP == "asc") { this._productFilter.sort = "PVPASC" }
        if (this.ordenacionPVP == "desc") { this._productFilter.sort = "PVPDESC" }
        this.notifyHost();
    }
}
