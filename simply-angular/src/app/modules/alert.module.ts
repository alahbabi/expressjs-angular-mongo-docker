import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '@/components/alert';

@NgModule({
    imports: [CommonModule],
    declarations: [AlertComponent],
    exports: [AlertComponent]
})
export class AlertModule { }