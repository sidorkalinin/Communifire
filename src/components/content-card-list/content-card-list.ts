import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'content-card-list',
  templateUrl: 'content-card-list.html'
})
export class ContentCardListComponent implements OnChanges {
  @Input() activities;

  constructor() { }

  ngOnChanges() {

  }

  isArticle(activity) {
    return (activity.ActivityEntityType === 3);
  }

  isBlog(activity) {
    return (activity.ActivityEntityType === 4);
  }

  isWiki(activity) {
    return (activity.ActivityEntityType === 9);
  }

  isPhoto(activity) {
    return (activity.ActivityEntityType === 6)
  }

  isWall(activity) {
    return (activity.ActivityEntityType === 10)
  }

  isUser(activity) {
    return (activity.ActivityEntityType === 15)
  }

  isIdea(activity) {
    return (activity.ActivityEntityType === 44)
  }

  isEvent(activity) {
    return (activity.ActivityEntityType === 5)
  }

  isVideo(activity) {
    return (activity.ActivityEntityType === 7)
  }

  isCase(activity) {
    return (activity.ActivityEntityType === 19)
  }

  isForumTopic(activity) {
    return (activity.ActivityEntityType === 55)
  }

  isFile(activity) {
    return (activity.ActivityEntityType === 14)
  }

  isSpace(activity) {
    return (activity.ActivityEntityType === 13)
  }
}
