import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTrackerComponent } from './workout-tracker.component';

describe('WorkoutTrackerComponent', () => {
  let component: WorkoutTrackerComponent;
  let fixture: ComponentFixture<WorkoutTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


describe('WorkoutTrackerComponent', () => {
  let component: WorkoutTrackerComponent;
  let fixture: ComponentFixture<WorkoutTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutTrackerComponent],
      imports: [FormsModule, CommonModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of workouts', () => {
    expect(component.workouts).toEqual(PEOPLE);
  });

  it('should display the correct number of workouts', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('div').length).toBe(PEOPLE.length);
  });

  it('should display workout details correctly', () => {
    const compiled = fixture.nativeElement;
    const firstWorkout = PEOPLE[0];
    expect(compiled.querySelector('h3').textContent).toContain(firstWorkout.name);
    expect(compiled.querySelector('p').textContent).toContain(firstWorkout.workout);
    expect(compiled.querySelector('p').textContent).toContain(firstWorkout.minutes.toString());
  });
});