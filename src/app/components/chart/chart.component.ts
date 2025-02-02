import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

interface WorkoutData {
  name: string;
  workouts: { activity: string; minutes: number }[];
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  imports: [CommonModule],
})
export class ChartComponent implements OnInit, AfterViewInit {
  users: WorkoutData[] = [];
  selectedUser: WorkoutData | null = null;
  chart: Chart | null = null;

  ngOnInit() {
    const data = localStorage.getItem('workoutData');
    try {
      this.users = data ? JSON.parse(data) : [];
      console.log('usrs', this.users);
    } catch (error) {
      console.error('Error parsing workout data from localStorage:', error);
      this.users = [];
    }
  }

  ngAfterViewInit() {
    if (this.selectedUser) {
      this.updateChart();
    }
  }

  selectUser(user: WorkoutData) {
    this.selectedUser = user;
    setTimeout(() => {
      this.updateChart();
    }, 100);
  }

  updateChart() {
    if (this.selectedUser) {
      const workoutNames = this.selectedUser.workouts.map(
        (workout) => workout.activity
      );
      const workoutMinutes = this.selectedUser.workouts.map(
        (workout) => workout.minutes
      );

      const canvas = document.getElementById(
        'workoutChart'
      ) as HTMLCanvasElement;
      const ctx = canvas?.getContext('2d');
      if (!ctx) {
        console.error('Failed to get canvas context');
        return;
      }

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: workoutNames,
          datasets: [
            {
              label: 'Workout Minutes',
              data: workoutMinutes,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
}
