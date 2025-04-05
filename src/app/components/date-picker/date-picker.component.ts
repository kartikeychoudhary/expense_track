import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  standalone:false
})
export class DatePickerComponent {

    @Input() dateTime:number;
    @Output() emitDateTime = new EventEmitter<number>();

    minute:number;
    hour:number;
    seconds:number;

    day:number;
    month:number;
    year:number;
    
    days = [];
    years = [];
    hours = [];
    mins = []
    
    MONTH_NAMES = [
        {key:0,value:'January', days:31},
        {key:1,value:'February', days:28},
        {key:2,value:'March', days:31},
        {key:3,value:'April', days:30},
        {key:4,value:'May', days:31},
        {key:5,value:'June', days:30},
        {key:6,value:'July', days:31},
        {key:7,value:'August', days:31},
        {key:8,value:'September', days:30},
        {key:9,value:'October', days:31},
        {key:10,value:'November', days:30},
        {key:11,value:'December', days:31},
    ]
    ngOnInit(): void {
        const date = this.dateTime ? new Date(this.dateTime): new Date();
        this.populateYears()
        this.day = date.getDate();
        this.month = date.getMonth(); // Months are 0-indexed
        this.year = date.getFullYear();
        this.hour = date.getHours();
        this.minute = date.getMinutes();
        this.onChangeYear();
        this.populateHours();
        this.populateMins();
        this.getSelectedDateInMillis();
    }

    setDaysAccToYear(){
        if(this.isLeapYear(this.year)){
            this.MONTH_NAMES[1].days = 29;
        }else{
            this.MONTH_NAMES[1].days = 28;
        }
    }

    isLeapYear(year) {
        // A year is a leap year if it is divisible by 4 but not by 100,
        // or if it is divisible by 400.
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    populateDays(maxDay){
        this.days = [];
        for (let index = 1; index <= maxDay; index++) {
            this.days.push(index)
        }
    }
    
    populateYears(){
        const currentYear = new Date().getFullYear();
        for (let index = 1970; index <= currentYear; index++) {
            this.years.push(index)
        }
    }

    populateHours(){
        for (let index = 0; index <= 24; index++) {
            this.hours.push(index)
        }
    }

    populateMins(){
        for (let index = 0; index <= 60; index++) {
            this.mins.push(index)
        }
    }


    onChangeMonth(){
        const maxDays = this.MONTH_NAMES[this.month].days;
        if(maxDays < this.day){
            this.day = maxDays;
        }
        this.populateDays(maxDays);
    }

    onChangeYear(){
        this.setDaysAccToYear();
        this.onChangeMonth();
    }

    getSelectedDateInMillis(){
        const millis = new Date(this.year, this.month, this.day, this.hour, this.minute, 0).getTime();
        this.emitDateTime.emit(millis);
    }
}