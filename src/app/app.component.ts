import { Component } from '@angular/core';
import { WorkoutTrackerComponent } from './components/workout-tracker/workout-tracker.component';
import { RouterModule } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [WorkoutTrackerComponent, RouterModule, ChartComponent],
})
export class AppComponent {
  title = 'workout-tracker';
}
