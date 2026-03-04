import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HitelesitoComponent } from './hitelesito.component';
import { LoginService } from '../login.service';
import { BejelentkezesService } from '../bejelentkezes.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('HitelesitoComponent', () => {
  let komponens: HitelesitoComponent;
  let fixture: ComponentFixture<HitelesitoComponent>;
  let hamis_loginService: jasmine.SpyObj<LoginService>;
  let hamis_bejelentkezesService: jasmine.SpyObj<BejelentkezesService>;
  let hamis_router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    //Hamis service-ek létrehozása
    hamis_loginService = jasmine.createSpyObj('LoginService', [
      'getFelhasznalonev',
      'getFiok',
      'addFiok'
    ]);
    hamis_bejelentkezesService = jasmine.createSpyObj('BejelentkezesService', [
      'changeId'
    ]);
    hamis_router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HitelesitoComponent],
      imports: [FormsModule],
      providers: [
        { provide: LoginService, useValue: hamis_loginService },
        { provide: BejelentkezesService, useValue: hamis_bejelentkezesService },
        { provide: Router, useValue: hamis_router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HitelesitoComponent);
    komponens = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  //===== UNIT TESZTEK =====

  //#1: Be() metódus
  it('Be metódus beállítja a bejelentkezés true-ra', () => {
    //Előkészítes
    komponens.bejelentkezes = false;

    //Végrehajtás
    komponens.Be();

    //Ellenőrzes
    expect(komponens.bejelentkezes).toBe(true);
  });

  //Unit Teszt #2: Ki() metódus
  it('Ki metódus beállítja a bejelentkezést false-ra', () => {
    //Előkészítes
    komponens.bejelentkezes = true;

    //Végrehajtás
    komponens.Ki();

    //Ellenőrzes
    expect(komponens.bejelentkezes).toBe(false);
  });

  //Unit Teszt #3: Mutat() metódus - jelszo lathatosag kapcsolasa
  it('Mutat metódus kapcsolja a jelszo láthatóságát', () => {
    //Előkészítes
    const jelszoInput = document.createElement('input');
    jelszoInput.id = 'teszt-jelszo';
    jelszoInput.setAttribute('type', 'password');
    const szemIkon = document.createElement('span');
    szemIkon.id = 'teszt-szem';
    szemIkon.classList.add('bi-eye-fill');
    
    document.body.appendChild(jelszoInput);
    document.body.appendChild(szemIkon);

    //Végrehajtás - első kapcsolás
    komponens.Mutat('teszt-jelszo', 'teszt-szem');

    //Ellenőrzes - jelszó látható
    expect(document.getElementById('teszt-jelszo').getAttribute('type')).toBe('text');

    //Végrehajtás - második kapcsolás
    komponens.Mutat('teszt-jelszo', 'teszt-szem');

    //Ellenőrzes - jelszó rejtett
    expect(document.getElementById('teszt-jelszo').getAttribute('type')).toBe('password');

    //Takarítás
    document.body.removeChild(jelszoInput);
    document.body.removeChild(szemIkon);
  });

  //===== INTEGRÁCIÓS TESZT =====

  //Integraciós Teszt: Sikeres bejelentkezés teljes folyamata
  it('sikeres bejelentkezés - service hívása, localStorage mentés, navigáció', async () => {
    //Előkészítes
    komponens.bejelentkezes = true;
    komponens.fiok = {
      felhasznalonev: 'tesztuser',
      email: '',
      jelszo: 'Teszt123!',
      jelszo_i: ''
    };

    //DOM elemek létrehozása (Kuldes() metódusnak kell)
    const felhasznalonevInput = document.createElement('input');
    felhasznalonevInput.id = 'felhasznalonev';
    const jelszoInput = document.createElement('input');
    jelszoInput.id = 'jelszo';
    
    document.body.appendChild(felhasznalonevInput);
    document.body.appendChild(jelszoInput);

    //Hamis service válasz
    const hamis_fiokValasz = { id: '999', felhasznalonev: 'tesztuser' };
    hamis_loginService.getFiok.and.returnValue(of(hamis_fiokValasz));

    //LocalStorage spy
    spyOn(localStorage, 'setItem');

    //Végrehajtás
    komponens.Kuldes();

    //Várakozás async műveletekre
    await fixture.whenStable();
    fixture.detectChanges();

    //Ellenőrzés - service meghívása
    expect(hamis_loginService.getFiok).toHaveBeenCalledWith(komponens.fiok);
    
    //Ellenőrzés - localStorage mentés
    expect(localStorage.setItem).toHaveBeenCalledWith('id', '999');
    
    //Ellenőrzés - bejelentkezés service értesítése
    expect(hamis_bejelentkezesService.changeId).toHaveBeenCalled();
    
    //Ellenőrzés - navigáció a főoldalra
    expect(hamis_router.navigate).toHaveBeenCalledWith(['/']);

    //Takarítás
    document.body.removeChild(felhasznalonevInput);
    document.body.removeChild(jelszoInput);
  });
});