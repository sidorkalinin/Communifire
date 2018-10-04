import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { InfiniteScroll } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import { Device } from '@ionic-native/device';
import { PeopleProvider } from '../../providers/people';
import { AuthenticationProvider } from '../../providers/authentication';

interface LooseObject {
  [key: string]: any
};

@Component({
  selector: 'people-multi-select-modal',
  templateUrl: 'people-multi-select.html',
})

export class PeopleMultiSelectModalComponent implements OnInit{
  private page = 0;
  private cachePeople = [];
  peopleFilter: string = 'all-people';
  people = [];
  selectedPeople = [];
  spaceId: number;
  o_selectedPeople = [];

  friends = [];
  searchtext: string;

  isLoading: boolean = false;
  isLoadingMy: boolean = false;
  isLoadingSearch: boolean = false;

  label: any;
  label2: any;
  
  attendeesIdArray: LooseObject = {};
  isIphoneX: boolean = false;

  constructor(
    public viewCtrl: ViewController,
    private peopleProvider: PeopleProvider,
    private navParams: NavParams,
    public device: Device,
    private authenticationProvider: AuthenticationProvider
  ) {
    this.spaceId = this.navParams.get('spaceid');
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }

    this.o_selectedPeople = this.navParams.get('selectedItems');
    this.label = this.navParams.get('label');
    this.label2 = this.navParams.get('label2');
  }

  cancel(count?: number) {
    this.viewCtrl.dismiss();
  }

  add(count?: number){
    this.viewCtrl.dismiss({ items: this.selectedPeople });
  }

  ngOnInit() {
    this.doInfinite();
    this.myConnections();
  }

  /**
   * This will increment this.page number
   * and fetch the page
   * @param infiniteScroll (Optional) 
   */
  doInfinite(infiniteScroll?: InfiniteScroll) {
    if (!infiniteScroll) {
      this.isLoading = true;
    }
    this.page++;
    this.getPeople()
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoading = false;
        }
      })
      .subscribe(this.handlePeoples.bind(this))
  }

  /**
   * Search Peoples
   * This will create a copy of the peoples, so that we dont have to fetch users again, when search is cancelled
   * When search is cancelled, replace with cached copy of the users.
   * @param searchText Text to search
   */
  search(searchText) {
    this.isLoadingSearch = true;
    if (searchText) {
      this.getPeople(searchText)
        .subscribe((response: any) => {
          if (response.ResponseData) {
            this.cachePeople = [].concat(this.people);
            this.people = response.ResponseData;
            for(let i = 0; i < this.people.length; i++){
              if(this.o_selectedPeople == undefined) continue;
              for(let j = 0; j < this.o_selectedPeople.length; j++){
                console.log(this.o_selectedPeople[j]);
                if(this.people[i].UserID == this.o_selectedPeople[j]){
                  this.attendeesIdArray[this.people[i].UserID] = {selected: true};
                }
              }
            }
          }
          this.isLoadingSearch = false;
        })
    } else {
      this.people = [].concat(this.cachePeople);
      this.isLoadingSearch = false;
    }
  }

  /**
   * concat response to people's array
   * @param response API Response
   */
  private handlePeoples(response) {
    if (response.ResponseData){
      this.people = this.people.concat(response.ResponseData);
      for(let i = 0; i < this.people.length; i++){
        if(this.o_selectedPeople == undefined) continue;
        for(let j = 0; j < this.o_selectedPeople.length; j++){
          console.log(this.o_selectedPeople[j]);
          if(this.people[i].UserID == this.o_selectedPeople[j]){
            this.attendeesIdArray[this.people[i].UserID] = {selected: true};
          }
        }
      }
    }
  }

  /**
   * Fetch API for peoples
   * @param searchText provide searchText
   */
  private getPeople(searchText?: string) {
    if (this.spaceId == 0) {
      return this.peopleProvider.getPeople(searchText, this.page);
    } else {
      return this.peopleProvider.getSpaceMembers(this.spaceId, searchText, this.page);
    }
  }

  private setArray($event) {
    this.selectedPeople = $event;
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
