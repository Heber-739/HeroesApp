import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl(),
    publisher: new FormControl(Publisher),
    alter_ego: new FormControl(),
    first_appearance: new FormControl(),
    characters: new FormControl(),
    alt_image: new FormControl()})

    constructor(private heroesService:HeroesService,
      private activatedRoute:ActivatedRoute,
      private router:Router, private snackbar:MatSnackBar,
      private dialog: MatDialog){}

    ngOnInit(): void {
      if(!this.router.url.includes('edit')) return;
      this.activatedRoute.params.pipe(
        switchMap(({id})=> this.heroesService.getHeroById(id))
      ).subscribe({next: (hero)=> {
        if(!hero) return this.router.navigateByUrl('/');
        this.heroForm.reset(hero)
return;
      }})
    }

  public publishers=[
    {id:"DC Comics", desc: "DC - Comics"},
    {id:"Marvel Comics", desc: "Marvel - Comics"}
]

get currentHero():Hero{
const hero = this.heroForm.value as Hero;
return hero
}

onSubmit():void{
  if(this.heroForm.invalid) return;
  if(this.currentHero.id){
    this.heroesService.updateHero(this.currentHero)
    .subscribe(hero=>
      this.showSnackBar(`${hero.superhero} updated!`))
      return;
  }
  this.heroesService.addHero(this.currentHero)
  .subscribe(hero=>{
    this.showSnackBar(`${hero.superhero} created!`)
    this.router.navigate(['/heroes/edit', hero.id])
  })
}

onDeleteHero(){
  if(!this.currentHero.id) throw new Error("Hero is required");
  
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: this.heroForm.value,
  });

  dialogRef.afterClosed().pipe(
    filter((result:boolean) => result),
    switchMap(()=> this.heroesService.deleteHero(this.currentHero.id)),
    filter((wasDeleted:boolean)=>wasDeleted)
  )
  .subscribe({next:()=>this.router.navigate(['/heroes'])})


}

showSnackBar(message: string){
  this.snackbar.open(message,'done',{
    duration:2000
  })
}

}
