import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css'
})
export class LineChart {
  @ViewChild('lineChart', {static: true}) chartRef!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    this.drawChart();
  }

  private drawChart(): void {
    const canvas = this.chartRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Sample data points
    const dataPoints = [
      {x: 0.1, y: 0.6},
      {x: 0.2, y: 0.4},
      {x: 0.3, y: 0.5},
      {x: 0.4, y: 0.3},
      {x: 0.5, y: 0.45},
      {x: 0.6, y: 0.25},
      {x: 0.7, y: 0.7},
      {x: 0.8, y: 0.35},
      {x: 0.9, y: 0.55}
    ];

    // Draw line
    ctx.strokeStyle = '#10b981'; // green-500
    ctx.lineWidth = 2;
    ctx.beginPath();

    dataPoints.forEach((point, index) => {
      const x = point.x * width;
      const y = (1 - point.y) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#10b981';
    dataPoints.forEach(point => {
      const x = point.x * width;
      const y = (1 - point.y) * height;

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
  }
}
