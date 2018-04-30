import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { MemberBoxComponent } from "./member-box.component";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [MemberBoxComponent],
    exports: [MemberBoxComponent]
})
export class MemberBoxModule {
}