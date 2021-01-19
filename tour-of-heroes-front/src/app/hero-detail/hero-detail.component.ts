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
    heroNameControl: FormControl;
    heroAgeControl: FormControl;
    heroClassControl: FormControl;
    classes: string[] = [ 'Junior', 'Middle', 'Senior' ];
    
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
            this.heroNameControl = new FormControl(this.hero.name, [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
            this.heroAgeControl = new FormControl(this.hero.age, [Validators.required]);
            this.heroClassControl = new FormControl(this.hero.class, [Validators.required]);
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        if (this.heroNameControl.invalid || this.heroAgeControl.invalid) {
            return;
        }
        var updHero = new Hero(this.hero._id, this.heroNameControl.value, this.heroAgeControl.value, this.heroClassControl.value);
        this.heroService.updateHero(updHero).subscribe(() => this.goBack());
    }

}
