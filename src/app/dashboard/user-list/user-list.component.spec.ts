import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { selectUsers } from '../../api/users/store/users.selector';
import { RoleEnum } from '../../api/users/interfaces/user.interface';
import { By } from '@angular/platform-browser';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let loader: HarnessLoader;

  let store: MockStore;
  let mockUsersSelector: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule],
      declarations: [UserListComponent],
      providers: [provideMockStore()],
    });

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(UserListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;

    mockUsersSelector = store.overrideSelector(selectUsers, [
      {
        id: 0,
        firstName: 'Max',
        lastName: 'Scharf',
        email: 'max@scharf.de',
        position: 'xyz',
        role: RoleEnum.MEMBER,
        isActive: true,
      },
      {
        id: 1,
        firstName: 'Jürgen',
        lastName: 'Dieter',
        email: 'juergen@dieter.de',
        position: 'xyz',
        role: RoleEnum.MEMBER,
        isActive: true,
      },
    ]);

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {
    });
  });

  afterEach(() => {
    TestBed.inject(MockStore)?.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user list from store', () => {
    expect(
      fixture.debugElement.queryAll(By.css('.user-list-row')).length,
    ).toBe(2);
  });

  it('should update UI when user list is modified', () => {

    mockUsersSelector.setResult([
      {
        id: 0,
        firstName: 'Max',
        lastName: 'Scharf',
        email: 'max@scharf.de',
        position: 'xyz',
        role: RoleEnum.MEMBER,
        isActive: true,
      },
      {
        id: 1,
        firstName: 'Jürgen',
        lastName: 'Dieter',
        email: 'juergen@dieter.de',
        position: 'xyz',
        role: RoleEnum.MEMBER,
        isActive: true,
      },
      {
        id: 2,
        firstName: 'hans',
        lastName: 'im glück',
        email: 'juergen@dieter.de',
        position: 'xyz',
        role: RoleEnum.MEMBER,
        isActive: true,
      },
    ]);

    store.refreshState();
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.user-list-row')).length,
    ).toBe(3);
  });

  it('should filter user list on search input', async () => {
    let matInput = await loader.getHarness(MatInputHarness);

    await matInput.setValue('Max')

    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.user-list-row')).length,
    ).toBe(1);
  });

  it('should display no result caption if search input has no matches', async () => {
    let matInput = await loader.getHarness(MatInputHarness);

    await matInput.setValue('xyz1234566456456')

    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.user-list-row')).length,
    ).toBe(0);
  });
});
