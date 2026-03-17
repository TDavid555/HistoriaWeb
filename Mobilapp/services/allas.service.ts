import * as ScreenOrientation from 'expo-screen-orientation';
export default async function AllasBeallitas(allas:string) {
    switch(allas){
        case "álló":
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            break;
        case "fekvő":
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            break;
        case "mindkettő":
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
            break;
        default:
            throw "Hibás állás";
    }
}