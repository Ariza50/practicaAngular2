import { Component, Input, OnInit } from "@angular/core";

import { Product } from "../../models/product";

@Component({
    selector: "userLike",
    templateUrl: "./app/components/user-like/user-like.component.html"
})
export class UserLikeComponent implements  OnInit {
    
    @Input() producto: Product;

    ngOnInit(): void {
        
    }

    hacemosLike(): void {
        console.log("Hacemos Like!!");
        // Habia pensado en un localStorage
    }
}