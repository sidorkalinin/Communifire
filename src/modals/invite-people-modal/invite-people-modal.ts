import { Component, OnInit } from '@angular/core';
import { ViewController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { InfiniteScroll } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import { ContentProvider } from "../../providers/content";
import { Device } from '@ionic-native/device';
import { PeopleProvider } from '../../providers/people';

@Component({
  selector: 'invite-people-modal',
  templateUrl: 'invite-people-modal.html'
})
export class InvitePeopleModalComponent implements OnInit {
  private page = 0;
  private cachePeople = [];
  peopleFilter: string = 'my-connection';
  people = [];
  selectedPeople = [];
  eventId: number;
  spaceId: number;

  isLoading: boolean = false;
  isLoadingSearch: boolean = false;
  attendeesIdArray = {};
  isIphoneX: boolean = false;

  constructor(
    public viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private peopleProvider: PeopleProvider,
    private navParams: NavParams,
    private contentProvider: ContentProvider,
    public device: Device
  ) {
    this.eventId = this.navParams.get('eventId');
    this.spaceId = this.navParams.get('spaceId');
    this.getEventAttendees();
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
  }

  cancel(count?: number) {
    this.viewCtrl.dismiss({ count: count });
  }

  presentConfirm() {
    let loader = this.loadingCtrl.create({
      content: "Inviting..."
    });
    loader.present();
    let count = 0;
    let string = "";
    for (let key of Object.keys(this.selectedPeople)) {
      // console.log(key, this.selectedPeople[key]);
      if (this.selectedPeople[key].selected == true && this.selectedPeople[key].invited == false) {
        string += key + ",";
        ++count;
      }
    }
    if (count == 0) {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Please select at least 1 user to invite',
        buttons: [
          {
            text: 'ok',
            role: 'cancel'
          },
        ]
      });
      alert.present();
      return 0;
    }
    this.contentProvider.invitePeopleToEvent(this.eventId, JSON.stringify(string.slice(0, -1))).subscribe(res => {
      if (!res.IsError) {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Success',
          message: 'You have invited ' + count + ' people',
          buttons: [
            {
              text: 'ok',
              role: 'cancel'
            },
          ]
        });
        alert.present();
        this.cancel(count);
      }
    })
  }
  ngOnInit() {
    this.doInfinite();
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

  private getEventAttendees() {
    this.contentProvider.getEventAttendees(this.eventId).subscribe(res => {
      res.forEach(item => {
        this.attendeesIdArray[item.UserID] = {
          selected: true,
          invited: true
        };
      });
    })
  }

  private setArray($event) {
    this.selectedPeople = $event;
  }

}
