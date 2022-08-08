import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<any[]> | undefined;
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;

  constructor(private heroesServices: HeroesService) { }
  ngOnInit() {

  }

  private _filter(value: string) {
  
  }

  buscar() {
    if(this.termino){
      this.heroesServices.getSugerencias(this.termino.trim()).subscribe(heroes => {
        console.log(heroes);
        
        this.heroes = heroes;
      })
    }
    
  }
  select(event: MatAutocompleteSelectedEvent) {
    console.log(event);
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    if(heroe.id) {
      this.heroesServices.getHeroeById(heroe.id).subscribe( heroe => {
        console.log(heroe);
        
        this.heroeSeleccionado = heroe;
      })
    }
  }

    

}
