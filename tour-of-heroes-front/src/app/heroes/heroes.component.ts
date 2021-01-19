import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-heroes', 
    templateUrl: './heroes.component.html', 
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, AfterViewInit {
  
    heroes: Hero[] = [];
    loaded = false;
    dataSource: MatTableDataSource<Hero> = new MatTableDataSource<Hero>(this.heroes);

    @ViewChild(MatSort) matSort: MatSort;

    constructor(private heroService: HeroService, public dialog: MatDialog) {} 
  
    ngOnInit(): void { 
        this.getHeroes();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.matSort;
    }

    getHeroes(): void {
        this.heroService.getHeroes().subscribe(heroes => {
            this.heroes.push(...heroes);
            this.loaded = true;
        });
    }

    openDeleteDialog(hero: Hero): void {
        const dialogRef = this.dialog.open(HeroDeleteDialog, {
            width: '300px',
            data: hero
        });

        dialogRef.afterClosed().subscribe(heroToDelete => {
            if (heroToDelete) {
                this.delete(heroToDelete);
            }
        })
    }

    openAddDialog(): void {
        const dialogRef = this.dialog.open(HeroAddDialog, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.add(result.name, result.age, result.class);
            }
        })
    }

    add(name: string, age: number, class_: string): void {
        name = name.trim();
        if (!name) return;
        this.loaded = false; 
        this.heroService.addHero({name: name, age: age, class: class_} as Hero).subscribe(hero => {
            this.heroes.push(hero);
            this.loaded = true;
        });
    }

    delete(hero: Hero): void {
        this.loaded = false;
        this.heroes.splice(this.heroes.indexOf(hero), 1);
        this.heroService.deleteHero(hero).subscribe(_ => this.loaded = true);
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
}

export interface AddData {
    name: string;
    age: number;
    class: string;
}

@Component({
    selector: 'hero.add.dialog',
    templateUrl: 'hero.add.dialog.html'
})
export class HeroAddDialog {

    newNameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    newAgeControl = new FormControl(1, [Validators.required]);
    newClassControl = new FormControl('', [Validators.required]);
    
    constructor(
        public dialogRef: MatDialogRef<HeroAddDialog>
    ) {}

    isInvalid(): boolean {
        return this.newAgeControl.invalid || this.newClassControl.invalid || this.newNameControl.invalid;
    }

    data(): AddData {
        return {name: this.newNameControl.value, age: this.newAgeControl.value, class: this.newClassControl.value};
    }
}
