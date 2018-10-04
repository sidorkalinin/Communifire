import { Component, OnInit } from '@angular/core';
import { InfiniteScroll, IonicPage } from 'ionic-angular';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

import { AuthenticationProvider } from '../../providers/authentication';
import { PeopleProvider } from '../../providers/people';

@IonicPage({
  name: 'page-people'
})

@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})

export class PeoplePage implements OnInit {
  private page = 0;
  private cachePeople = [];
  private firstPage = [];
  peopleFilter: string = 'all-people';
  people = [];
  friends = [];
  isLoadingAll: boolean = false;
  isLoadingMy: boolean = false;
  isLoadingSearch: boolean = false;

  constructor (
    private peopleProvider: PeopleProvider,
    private authenticationProvider: AuthenticationProvider
  ) { }

  ngOnInit () {
    this.doInfinite();
    this.myConnections();
  }

  /**
   * This will increment this.page number
   * and fetch the page
   * @param infiniteScroll (Optional) 
   */
  doInfinite (infiniteScroll?: InfiniteScroll) {
    if (this.people.length > 0 && this.people.length < 15 && infiniteScroll) {
      infiniteScroll.enable(false);
    }
    if (!infiniteScroll) {
      this.isLoadingAll = true;
    }
    this.page++;
    this.getPeople()
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
        this.isLoadingAll = false;
      })
      .do((response: any) => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(res => {
        this.handlePeoples(res);
        if (infiniteScroll && res.ResponseData.length < 15){
          infiniteScroll.enable(false);
        }
        if(!infiniteScroll) {
          this.firstPage = res.ResponseData;
        }
        }, err => {
          if (infiniteScroll) {
            infiniteScroll.enable(false)
          }
        });
  }

  /**
   * Search Peoples
   * This will create a copy of the peoples, so that we dont have to fetch users again, when search is cancelled
   * When search is cancelled, replace with cached copy of the users.
   * @param searchText Text to search
   */
  search(searchText) {
    if (searchText) {
      this.isLoadingSearch = true;
      this.getPeople(searchText)
      .finally(() => this.isLoadingSearch = false)
        .subscribe((response: any) => {
          if (!this.cachePeople.length) {
            this.cachePeople = [].concat(this.people);
          }
          this.people = response.ResponseData;
        }, err => {
          this.people = [];
        })
    } else {
      this.people = [].concat(this.cachePeople);
    }
  }

  refreshPeople(){
    this.page = 1;
    this.people = this.firstPage;
  }

  /**
   * concat response to people's array
   * @param response API Response
   */
  private handlePeoples(response) {
    this.people = this.people.concat(response.ResponseData);
  }

  /**
   * Fetch API for peoples
   * @param searchText provide searchText
   */
  private getPeople(searchText?: string) {
    return this.peopleProvider.getPeople(searchText, this.page);
  }

  myConnections() {
    this.isLoadingMy = true;

    const subs = this.authenticationProvider.user$
      .filter(user => user !== null)
      .map(user => user.UserID)
      .switchMap(id => this.peopleProvider.getUserConnections(id))
      .do(() => this.isLoadingMy = false)
      .subscribe(response => {
        if (response.ResponseData) {
          this.friends = response.ResponseData;
        }
        subs.unsubscribe();
      });
  }
}
