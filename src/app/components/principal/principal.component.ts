import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToDoService } from 'src/app/service/to-do.service';
import { contentThing, Thing } from '../../Interface/thing.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  public formulario:FormGroup
  constructor(private _service:ToDoService) { 
    this.showthings();
  }

  ngOnInit() {
    this.crearFormulario()
  }

  private crearFormulario(){
    this.formulario=new FormGroup({
      thing: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }

  public things:contentThing[];

public showthings(){
    this._service.getthings().subscribe(
        (data:Thing)=> this.things=data.Things
    )
}

  public obtenerthing(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    })
    
    console.log(this.formulario.value)
    this._service.postthing(this.formulario.value).subscribe(
      (data)=>{
          Toast.fire({
            icon: 'success',
            title: 'Saved correctly'
          })
          this.formulario.reset();
      console.log(data);
    })
  }

  public cambiarstatus(thing:contentThing){
    thing.complete =! thing.complete;
    this._service.putthing(thing).subscribe(
      (data)=>{},
      error=>{console.log(error.statusText)}
    );
  }

  public eliminartarea(thingId){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._service.deltething(thingId).subscribe(
          ()=>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          })
        
      }
    })
console.log(thingId);
  }
}
