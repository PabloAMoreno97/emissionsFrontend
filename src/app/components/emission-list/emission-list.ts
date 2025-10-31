import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EmissionService } from '../../services/emission.service';
import { Emission } from '../../models/emission.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NamedEntity } from '../../models/named-entity.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  grid: ApexGrid;
  tooltip?: ApexTooltip;
};

@Component({
  selector: 'app-emission-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './emission-list.html',
})
export class EmissionList implements OnInit {
  emissions: Emission[] = [];
  countries: NamedEntity[] = [];
  activities: NamedEntity[] = [];
  emissionTypes: NamedEntity[] = [];

  selectedCountry = '';
  selectedActivity = '';
  selectedEmissionType = '';
  isLoading = false;

  chartOptions: ChartOptions = {
    series: [],
    chart: { type: 'line', height: 350, toolbar: { show: true } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    title: { text: 'Historical Emissions', align: 'left' },
    xaxis: { categories: [] },
    legend: { position: 'top' },
    grid: { borderColor: '#f1f1f1' },
    tooltip: {
      y: {
        formatter: (val: number) => val.toFixed(2)
      }
    }
  };

  constructor(private emissionService: EmissionService) {}

  ngOnInit() {
    this.loadFilters();
    this.loadEmissions();
  }

  loadFilters() {
    this.emissionService.getCountries().subscribe(data => this.countries = data);
    this.emissionService.getActivities().subscribe(data => this.activities = data);
    this.emissionService.getEmissionTypes().subscribe(data => this.emissionTypes = data);
  }

  loadEmissions() {
    this.isLoading = true;

    this.emissionService.getAll(undefined, {
      country: this.selectedCountry,
      activity: this.selectedActivity,
      emission_type: this.selectedEmissionType
    }).subscribe({
      next: (data: Emission[]) => {
        this.emissions = data;
        this.updateChart();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading emissions:', err);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.loadEmissions();
  }

  updateChart() {
    const years = [...new Set(this.emissions.map(e => e.year))].sort();

    let series;
    if (this.selectedCountry) {
      series = [{
        name: this.selectedCountry,
        data: years.map(year => {
          const rec = this.emissions.find(e => e.year === year && e.country === this.selectedCountry);
          return rec ? +rec.emissions.toFixed(2) : 0;
        })
      }];
    } else {
      series = [{
        name: 'All Countries',
        data: years.map(year => {
          const sum = this.emissions
            .filter(e => e.year === year)
            .reduce((acc, e) => acc + e.emissions, 0);
          return +sum.toFixed(2);
        })
      }];
    }

    this.chartOptions = { ...this.chartOptions, series, xaxis: { categories: years } };
  }
}