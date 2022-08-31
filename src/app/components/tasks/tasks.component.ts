import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskServices: TaskService) {}

  ngOnInit(): void {
    this.taskServices.getTask().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskServices.deleteTask(task).subscribe(() => {
      this.taskServices.getTask().subscribe((tasks) => (this.tasks = tasks));
    });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskServices.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskServices.addTask(task).subscribe(() => {
      this.taskServices.getTask().subscribe((tasks) => (this.tasks = tasks));
    });
  }
}
