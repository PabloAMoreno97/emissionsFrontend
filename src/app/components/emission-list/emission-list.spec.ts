import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmissionList } from './emission-list';
import { EmissionService } from '../../services/emission.service';

describe('EmissionList', () => {
  let component: EmissionList;
  let fixture: ComponentFixture<EmissionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionList, HttpClientTestingModule],
      providers: [EmissionService]
    }).compileComponents();

    fixture = TestBed.createComponent(EmissionList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
