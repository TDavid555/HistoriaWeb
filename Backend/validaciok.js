class Validaciok{
    
    Helyes_id(id){
        if(typeof(id)=="string"){
            return Number.isInteger(parseFloat(id.replace(",",".")));
        }
        if(typeof(id)=="number"){
            return Number.isInteger(id);
        }
        return false;
    }

    Helyes_felhasznalonev(felhasznalonev){
        if(typeof(felhasznalonev)=="string"){
            return felhasznalonev.trim().length>0 && felhasznalonev.trim().length<21
        }
        return false;
    }

    Helyes_email(email){
        if(typeof(email)=="string"){
            let email_pattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return email_pattern.test(email);
        }
        return false;
    }

    Helyes_jelszo(jelszo){
        if(typeof(jelszo)=="string"){
            let jelszo_pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/;
            return jelszo_pattern.test(jelszo);
        }
        return false;
    }

    Helyes_tortenet_cim(cim){
        if(typeof(cim)=="string"){
            return cim.trim().length>0 && cim.trim().length<101
        }
        return false;
    }

    Helyes_tortenet(tortenet){
        if(typeof(tortenet)=="string"){
            return tortenet.trim().length>0 && tortenet.trim().length<4001
        }
        return false;
    }

    Helyes_datum(datum){
        if(typeof(datum)=="string"){
            return !isNaN(Date.parse(datum));
        }
        return false;
    }

    Helyes_kep_url(kep_url){
        if(typeof(kep_url)=="string"){
            let kep_url_pattern=/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
            return kep_url_pattern.test(kep_url) || kep_url.trim()=="";
        }
        return false;
    }

    Helyes_telepules(telepules){
        if(typeof(telepules)=="string"){
            return telepules.trim().length>0 && telepules.trim().length<21;
        }
        return false;
    }

    Helyes_megye(megye){
        if(typeof(megye)=="string"){
            return megye.trim().length>0 && megye.trim().length<23;
        }
        return false;
    }

    Helyes_hozzaszolas(hozzaszolas){
        if(typeof(hozzaszolas)=="string"){
            return hozzaszolas.trim().length>0 && hozzaszolas.trim().length<2001;
        }
        return false;
    }
}

module.exports={Validaciok};