import { Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { AppComponent } from './app.component';
import { WorkoutTrackerComponent } from './components/workout-tracker/workout-tracker.component';

export const routes: Routes = [
  { path: '', component: WorkoutTrackerComponent },
  { path: 'chart', component: ChartComponent },
];
