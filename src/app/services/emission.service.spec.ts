import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmissionService } from './emission.service';
import { Emission } from '../models/emission.model';

describe('EmissionService', () => {
  let service: EmissionService;
  let httpMock: HttpTestingController;

  const mockEmissions: Emission[] = [
    { id: 1, year: 2024, emissions: 123.45, emission_type: 'CO2', country: 'Colombia', activity: 'Transport' },
    { id: 2, year: 2023, emissions: 100.1, emission_type: 'CO2', country: 'Peru', activity: 'Energy' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmissionService]
    });
    service = TestBed.inject(EmissionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should make a GET request to /api/emissions/ and return data', () => {
    service.getAll().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[0].country).toBe('Colombia');
    });

    const req = httpMock.expectOne('http://localhost:8000/api/emissions/');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmissions);
  });

  it('Shoould inlcude filters in the URL when a parameter is passed', () => {
    const filters = { country: 'Colombia', activity: 'Transport', emission_type: 'CO2' };

    service.getAll(undefined, filters).subscribe();

    const req = httpMock.expectOne(
      r => r.url === 'http://localhost:8000/api/emissions/' &&
           r.params.get('country') === 'Colombia' &&
           r.params.get('activity') === 'Transport' &&
           r.params.get('emission_type') === 'CO2'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockEmissions);
  });

  it('Should return the countries', () => {
    const mockCountries = [{ id: 1, name: 'Colombia' }, { id: 2, name: 'Peru' }];

    service.getCountries().subscribe((data) => {
      expect(data).toEqual(mockCountries);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/countries/');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('Should return the activities', () => {
    const mockActivities = [{ id: 1, name: 'Transport' }];

    service.getActivities().subscribe((data) => {
      expect(data).toEqual(mockActivities);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/activities/');
    expect(req.request.method).toBe('GET');
    req.flush(mockActivities);
  });

  it('Should return the emission types', () => {
    const mockTypes = [{ id: 1, name: 'CO2' }];

    service.getEmissionTypes().subscribe((data) => {
      expect(data).toEqual(mockTypes);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/emission_types/');
    expect(req.request.method).toBe('GET');
    req.flush(mockTypes);
  });
});
