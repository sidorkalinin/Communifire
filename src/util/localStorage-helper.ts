import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageHelper {

    constructor() { }

    getCommunityUrl() {
        return localStorage.getItem('community_url');
    }
}// end class