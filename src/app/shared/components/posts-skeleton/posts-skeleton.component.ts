import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-posts-skeleton',
  templateUrl: './posts-skeleton.component.html',
  styleUrls: ['./posts-skeleton.component.scss']
})
export class PostsSkeletonComponent {
  @Input()
  skeletonToDisplay: 'single' | 'multiple' = 'multiple';
}
