import { Component, OnInit } from '@angular/core';
import { map, Observer } from 'rxjs';
import { Observable } from 'rxjs';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout"
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  countdown : number = 0
  cardsForHandset = []
  timer : any;
  // experiment to implement a countdown 
  hours : number
  minutes: number
  seconds : number
  temp!: number ;
  expirationCounter : string;

  isHandset : boolean = true
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(({matches}) => {
      if(matches){
        return true
      }
      return false
    }) 
  )

  startTimer(secsToStart : number){
    let start : number = secsToStart;
    let timer : any = setInterval(() =>{
      this.hours = Math.floor(start / 60 / 60)
        // remove the hours
        this.temp = start - this.hours * 60 * 60;
        this.minutes = Math.floor(this.temp / 60);
        // remove the minuets
        this.temp = this.temp - this.minutes * 60;
        // what left is the seconds
        this.seconds = this.temp;

        // add leading zeros for aesthetics
        var hour = this.hours < 10 ? "0" + this.hours : this.hours;
        var minute = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        var second = this.seconds < 10 ? "0" + this.seconds : this.seconds;

        this.expirationCounter = hour + ":" + minute + ":" + second;

        if (start <= 0) {
            // Time elapsed
            clearInterval(timer);
            this.expirationCounter = "Expired";
            // Make here changes in gui when time elapsed
            //....
        }
        start--;
    }, 1000)
  }

  constructor(private breakpointObserver: BreakpointObserver, public appSevice : AppService){
    
  }

  ngOnInit(){

    this.startTimer(18000)

    this.isHandsetObserver.subscribe(currentObserverValue => {
      //this.isHandset = currentObserverValue;
      this.loadCards()
    })

    this.appSevice.getTech().subscribe(
      response => {
        this.countdown = response.countdown
        //this.loadCards()
        console.log(response.countdown)
        
      }
    )

    this.timer = setInterval(() => {
      this.startCountdown()
    }, 1000)
  }

  ngOnDestroy(){
    if(this.timer){
      clearInterval(this.timer)
    }
  }



  loadCards(){
   
  }

  

  startCountdown(){
    setInterval(()=> {
      this.appSevice.getTech().subscribe(
        response => {
          this.countdown = response.countdown
        }
      )
    }, 1000)
  }
}
