import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { DropdownBoxComponent } from "./dropdown-box.component";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [DropdownBoxComponent],
    exports: [DropdownBoxComponent]
})
export class DropdownModule {
}