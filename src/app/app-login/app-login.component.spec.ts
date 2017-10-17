import {HttpClient} from '@angular/common/http';
/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './app-login.component';
import { User } from '../user';
import { inject } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { InMemUserService } from '../inMemoryDatabase.service';

describe('Component: Login', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [Http, ConnectionBackend, RequestOptions, InMemUserService]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('excepts post request', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    http.post('../inMemoryDatabase.service.ts', 'andrzej').subscribe(
      data => expect(data).toBeTruthy(true));

      const req = httpMock.expectOne('/login');
      expect(req.request.method).toEqual('POST');
      req.flush(new User(1, 'Andrzej', 'Lotnisko', 'andrzej@wp.pl', '123'));
      httpMock.verify();
  }));
});
