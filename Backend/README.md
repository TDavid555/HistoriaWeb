HistóriaWeb Backend

Indítás

1. Node.js telepítése

Ha még nincs telepítve, töltsd le innen: https://nodejs.org
Válaszd az LTS verziót.



2. XAMPP telepítése

A backend MySQL adatbázist használ. A legegyszerűbb módja a futtatásának a XAMPP.

Töltsd le innen: https://www.apachefriends.org
Telepítés után nyisd meg a XAMPP Control Panel-t, és indítsd el az Apache és MySQL szolgáltatásokat (Start gomb).

3. Adatbázis létrehozása

Nyisd meg a böngészőben: http://localhost/phpmyadmin

Hozz létre egy új adatbázist `historiaweb` névvel, majd importáld bele a projekthez tartozó historiaweb.sql fájlt.

4. Csomagok telepítése

Nyiss egy parancssort (CMD) a projekt mappájában, majd lépj be a Backend mappába:

    cd Backend

Ezután futtasd le:

    npm install

5. A szerver indítása

    npm start

A szerver a http://localhost:3000 címen fut.
