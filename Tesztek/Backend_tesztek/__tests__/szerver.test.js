const{Validaciok}=require("../../validaciok");
const app = require("./szerver");

describe("Szerver tesztek",()=>{
    let validaciok;
    const PORT=3000;
    let szerver;
    beforeAll(()=>{
        validaciok=new Validaciok();
        szerver=app.listen(PORT);
    });

    //Unit tesztek
    
    describe("Validációs tesztek",()=>{
        test("Helyes_felhasznalonev függvény tesztelése üres string-el",()=>{
            const eredmeny=validaciok.Helyes_felhasznalonev("");
            expect(eredmeny).toBe(false);
        });

        test("Helyes_email függvény tesztelése érvénytelen formátummal",()=>{
            const eredmeny=validaciok.Helyes_email("teszt@cím");
            expect(eredmeny).toBe(false);
        });

        test("Helyes_jelszo függvény tesztelése nagybetű nélküli jelszóval",()=>{
            const eredmeny=validaciok.Helyes_jelszo("jelszo12@");
            expect(eredmeny).toBe(false);
        });
    });

    //Integrációs teszt

    describe("Kapcsolat tesztek",()=>{
        test("GET /api/fiokok/:id megfelelő adatokkal tér vissza",async()=>{
            const response=await fetch(`http://localhost:${PORT}/api/fiokok/1`);
            expect(response.status).toBe(200);
        });

        test("GET /api/fiokok/:id 404-et ad hibás ID-ra", async () => {
            const response = await fetch(`http://localhost:${PORT}/api/fiokok/99`);
            expect(response.status).toBe(404);
        });
    });
    afterAll(() => {
        szerver.close();
    });
});