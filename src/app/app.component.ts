import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [``],
  standalone: true,
  imports: [RouterOutlet],
})
export default class AppComponent {
  title = 'sycamore';
}
