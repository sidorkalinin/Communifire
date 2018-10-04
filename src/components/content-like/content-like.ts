import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'content-like',
  templateUrl: 'content-like.html'
})
export class ContentLikeComponent implements OnChanges {
  @Input() contentID;
  @Input() entityType;
  @Input() likesCount;
  likeDetails;

  constructor(
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    
  }
}
