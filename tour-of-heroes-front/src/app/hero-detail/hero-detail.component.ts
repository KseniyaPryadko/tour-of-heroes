import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

    hero: Hero;
    heroIdControl: FormControl;
    heroNameControl: FormControl;
  
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private heroService: HeroService
    ) {}

    ngOnInit(): void {
        this.getHero();
    }

    getHero(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.heroService.getHero(id).subscribe(hero => {
            this.hero = hero;
            this.heroIdControl = new FormControl(this.hero._id);
            this.heroNameControl = new FormControl(this.hero.name, Validators.required);
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        var updHero = new Hero(this.heroIdControl.value, this.heroNameControl.value);
        this.heroService.updateHero(updHero).subscribe(() => this.goBack());
    }

}
