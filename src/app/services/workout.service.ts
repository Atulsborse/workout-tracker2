import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private storageKey = 'workoutData';

  getWorkouts() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveWorkouts(workouts: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(workouts));
  }
}
