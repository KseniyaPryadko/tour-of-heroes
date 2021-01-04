import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

    heroSearchControl = new FormControl('');
    heroes: Hero[];
    heroes$: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private heroService: HeroService) {}

    ngOnInit(): void {
        this.heroService.getHeroes().subscribe(heroes => {
            this.heroes = heroes;
            this.heroes$ = this.heroSearchControl.valueChanges.pipe(
                startWith(''),
                map((term: string) => this.heroes.filter(hero => hero.name.indexOf(term) >= 0))
            );
        });
    }

    search(): void {
        this.searchTerms.next(this.heroSearchControl.value);
    }

}
