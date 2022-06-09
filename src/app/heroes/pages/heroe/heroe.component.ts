import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { switchMap } from 'rxjs/operators'
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe

  constructor(private activatedRoute: ActivatedRoute, private services: HeroesService, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(  ({id})=> this.services.getHeroeById(id) )
    )
    .subscribe(
      (heroe) => this.heroe = heroe
    )
    
  }
  volver() {
    this.route.navigate(['/heroes/listado'])
  }

}
