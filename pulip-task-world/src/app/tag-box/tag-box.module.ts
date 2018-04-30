import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { TagBoxComponent } from "./tag-box.component";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TagBoxComponent],
    exports: [TagBoxComponent]
})
export class TagBoxModule {
}