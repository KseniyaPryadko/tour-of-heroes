import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-heroes', 
    templateUrl: './heroes.component.html', 
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
    newControl = new FormControl('');
    heroes: Hero[];
    loaded = false;
  
    constructor(private heroService: HeroService, public dialog: MatDialog) { } 
  
    ngOnInit(): void { 
        this.getHeroes();
    }

    openDialog(hero: Hero): void {
        const dialogRef = this.dialog.open(HeroDeleteDialog, {
            width: '250px',
            data: hero
        });

        dialogRef.afterClosed().subscribe(heroToDelete => {
            if (heroToDelete) {
                this.delete(heroToDelete);
            }
        })
    }

    getHeroes(): void {
        this.heroService.getHeroes().subscribe(heroes => {
            this.heroes = heroes;
            this.loaded = true;
        });
    }

    add(name: string): void {
        name = name.trim();
        if (!name) return;
        this.loaded = false; 
        this.heroService.addHero({name} as Hero).subscribe(hero => {
            this.heroes.push(hero);
            this.loaded = true;
        });
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).subscribe();
    }

}

@Component({
    selector: 'hero.delete.dialog',
    templateUrl: 'hero.delete.dialog.html'
})
export class HeroDeleteDialog {
    
    constructor(
        public dialogRef: MatDialogRef<HeroDeleteDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Hero
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
