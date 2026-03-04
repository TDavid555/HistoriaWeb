HistóriaWeb Mobilapp

Indítás

1. Node.js telepítése

Töltsd le és telepítsd a Node.js-t innen: https://nodejs.org
Válaszd az LTS verziót.

2. Expo Go telepítése a telefonra

Töltsd le az Expo Go alkalmazást a telefonodra:

- Android: https://play.google.com/store/apps/details?id=host.exp.exponent
- iOS: https://apps.apple.com/app/expo-go/id982107779

3. Csomagok telepítése

Nyiss egy parancssort (CMD) a projekt mappájában, majd lépj be a Mobilapp mappába:

    cd Mobilapp

Ezután futtasd le:

    npm install

Ez letölti a szükséges fájlokat.

4. Az alkalmazás indítása

    npx expo start --tunnel

5. Megnyitás a telefonon

A parancs lefutása után egy QR-kód jelenik meg a parancssorban.
Olvasd be a QR-kódot az Expo Go alkalmazással (Android), vagy a telefon kamerájával (iOS).
