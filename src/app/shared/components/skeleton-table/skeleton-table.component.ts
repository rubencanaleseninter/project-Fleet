import { Component, ChangeDetectionStrategy, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-skeleton-table',
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonTableComponent {}
