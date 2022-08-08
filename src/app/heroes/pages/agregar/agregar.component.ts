import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroesServices: HeroesService, 
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if(this.router.url.includes('editar')) {

      this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesServices.getHeroeById(id))
      )
      .subscribe( (heroe: Heroe) => this.heroe = heroe)
    }
  }
  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    console.log(this.heroe);
    if(this.heroe.id) {
      this.heroesServices.actualizarHeroes(this.heroe).subscribe((resp => {
        console.log('Actualizada', resp);
        this.openSnackBar('Reguistro Actualizado') 
      }))

    } else {
      this.heroesServices.postHeroes(this.heroe).subscribe((resp => {
        console.log('Agregando', resp);  
        this.router.navigate(['/heroes/editar', resp.id])
        this.openSnackBar('Reguistro Creado') 

      }))

    }
    
  }
  eliminar() {
    const dialogRef = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.heroesServices.borrarHeroes(this.heroe.id!).subscribe(response => {
          this.router.navigate(['/heroes']) 
        })
      }
    });

  }
  openSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Ok!',{
      duration: 2500
    })
  }

}
