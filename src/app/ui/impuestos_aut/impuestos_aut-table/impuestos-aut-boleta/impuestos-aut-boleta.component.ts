import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ImpuestosAut } from 'app/models/impuestos_aut/impuestos_aut';
import { Observable } from 'rxjs';


@Component({
  selector: 'impuestos_aut-boleta',
  templateUrl: './impuestos-aut-boleta.component.html',
  styleUrls: ['./impuestos-aut-boleta.component.scss']
})
export class ImpuestosAutBoletaComponent implements OnInit {
  @Input() impuesto_aut: ImpuestosAut;
  //@Output() impuesto_aut = new EventEmitter<ImpuestosAut>();

  constructor() {
    console.log('datos 1 ',this.impuesto_aut);
   }

  ngOnInit(): void {
     console.log('datos 2 ',this.impuesto_aut);
  }

  saludos(){

  }
}
