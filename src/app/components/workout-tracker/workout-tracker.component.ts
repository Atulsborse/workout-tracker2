import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-workout-tracker',
  templateUrl: './workout-tracker.component.html',
  styleUrls: ['./workout-tracker.component.scss'],
  imports: [FormsModule, CommonModule], // Import FormsModule and Common Modules here
})
export class WorkoutTrackerComponent implements OnInit {
  name: string = '';
  type: string = 'Running';
  minutes: number | null = null;
  search: string = '';
  filter: string = 'All';
  workouts: any[] = [];
  selectedUser: any = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  workoutTypes = [
    'All',
    '🏃‍♂️Running',
    '🚴Cycling',
    '🏊Swimming',
    '🧘Yoga',
    '🤸Pilates',
    '🏋️‍♀️Weightlifting',
    '🥊Boxing',
    '💃Dancing',
  ];

  constructor(private workoutService: WorkoutService, private router: Router) {}

  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts();
  }

  addWorkout() {
    if (!this.name || !this.type || !this.minutes) return;

    let newWorkout = {
      name: this.name,
      workouts: [this.type],
      minutes: this.minutes,
    };
    this.workouts.push(newWorkout);
    this.workoutService.saveWorkouts(this.workouts);

    this.name = '';
    this.minutes = null;
  }

  filterWorkouts() {
    return this.workouts
      .filter((user) =>
        user.name.toLowerCase().includes(this.search.toLowerCase())
      )
      .filter(
        (user) => this.filter === 'All' || user.workouts.includes(this.filter)
      )
      .slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.router.navigate(['/chart']);
    setTimeout(() => this.renderChart(), 100);
  }

  renderChart() {
    if (!this.selectedUser) return;

    const canvas = document.getElementById('workoutChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.selectedUser.workouts,
        datasets: [
          {
            label: 'Minutes',
            data: this.selectedUser.workouts.map(
              () =>
                this.selectedUser.minutes / this.selectedUser.workouts.length
            ),
            backgroundColor: '#4CAF50',
          },
        ],
      },
      options: { responsive: true },
    });
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.workouts.length / this.itemsPerPage))
      this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}
