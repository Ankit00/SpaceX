import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  url = 'https://api.spacexdata.com/v3/launches?limit=100';
  years = [
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ];
  missileData = [];
  missileDataHolder = [];
  previouslySelectedButton = null;
  previouslySelectedButtonDom = null;
  landingOptions = ['True', 'False'];
  isLaunchSelected = null;
  isLandingSelected = null;
  isYearSelected = null;
  sameClickFlag = null;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(this.url)
      .toPromise()
      .then((data) => {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            this.missileData.push(data[key]);
            this.missileDataHolder.push(data[key]);
          }
        }
      });
  }

  onButtonClick(value): any {
    this.missileData = JSON.parse(JSON.stringify(this.missileDataHolder));
    //To remove the style of same category filter when another value is selected
    if (this.previouslySelectedButtonDom) {
      this.previouslySelectedButtonDom.removeAttribute('style');
      
    }
    //To remove the style of same value when selected twice
    if (this.previouslySelectedButton == value) {
      this.previouslySelectedButtonDom.removeAttribute('style');
      this.missileData = JSON.parse(JSON.stringify(this.missileDataHolder));
      this.sameClickFlag = true;
      return;
    }
    let currentButton = document.getElementById(value);
    currentButton.setAttribute('style', 'background-color: rgb(0, 205, 50);');
    this.previouslySelectedButtonDom = currentButton;
    this.previouslySelectedButton = value;
    if(value){}
  }

  getCurrentYear(year): any {
    this.isYearSelected = true;
    this.onButtonClick(year);
    if (this.sameClickFlag) {
      this.sameClickFlag = false;
      return;
    }
    this.missileData = this.missileData.filter((el) => el.launch_year == year);
  }

  isSuccessfulLaunch(value): any {
    this.isLaunchSelected = true;
    this.onButtonClick(value);
    if (this.sameClickFlag) {
      this.sameClickFlag = false;
      return;
    }
    let flag = null;
    if (value.indexOf('True') != -1) {
      flag = true;
    } else {
      flag = false;
    }
    this.missileData = this.missileData.filter(
      (el) => el.launch_success == flag
    );
  }

  isSuccessfulLanding(value): any {
    this.isLandingSelected = true;
    this.onButtonClick(value);
    if (this.sameClickFlag) {
      this.sameClickFlag = false;
      return;
    }
    let flag = null;
    if (value.indexOf('True') != -1) {
      flag = true;
    } else {
      flag = false;
    }
    this.missileData = this.missileData.filter(
      (el) => el.rocket.first_stage.cores[0].land_success == flag
    );
  }
}
