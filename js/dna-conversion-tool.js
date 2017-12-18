// var mysql = require('mysql2');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'SYSDBA',
//     database: 'masterkey'
// });

// export for others scripts to use
class GLString {
    constructor(glstring) {
        this.glstring = glstring;
    }

    doClear() {
        this.glstringArr = this.glstring.split("*");
        let i;
        for (i = 0; i < this.glstringArr.length; i++) {
            let tmpCode = this.glstringArr[i].split(":");
            if (tmpCode.length >= 2) {

                this.glstringArr[i] = tmpCode[0] + ":" + tmpCode[1];
            }
        }
        this.setArr = new Set(this.glstringArr);

        let result = "";
        this.setArr.forEach(function (item) {
            result = result + item + "/";
            console.log(result);
        });
        result = result.slice(1, result.length - 1)
        return result;
        //*15:01:01:01*15:01:01:02*15:01:05*15:01:07*15:01:08*15:01:09*15:01:10*15:01:11*15:01:12*15:20
    }

    doClear2() {
        this.glstringArr = this.glstring.split("*");
        let i;
        for (i = 0; i < this.glstringArr.length; i++) {
            let tmpCode = this.glstringArr[i].split(":");
            if (tmpCode.length >= 2) {
                this.glstringArr[i] = tmpCode[1];
            }
        }
        this.setArr = new Set(this.glstringArr);

        let result = "";
        this.setArr.forEach(function (item) {
            result = result + item + "/";
            console.log(result);
        });
        result = result.slice(1, result.length - 1)
        return result;
    }

    getFamily() {
        this.glstringArr = this.glstring.split("*");
        let countOfFamilies = {};
        let i;
        for (i = 0; i < this.glstringArr.length; i++) {
            let tmpCode = this.glstringArr[i].split(":");
            this.glstringArr[i] = tmpCode[0];
            if(this.glstringArr[i]!==""&&!GLString.isLetter(this.glstringArr[i]))
            {   if (countOfFamilies[this.glstringArr[i]] === undefined
                || countOfFamilies[this.glstringArr[i]] === null)
                countOfFamilies[this.glstringArr[i]] = 1;
            else
                countOfFamilies[this.glstringArr[i]]++;
        }
    }
        this.setArr = new Set(this.glstringArr);
        let result = 0;
        console.log(countOfFamilies);
        let min = 32768;
        let minFam = null;
      for(let i = 0; i < Object.keys(countOfFamilies).length; i++){
         if( Object.keys(countOfFamilies)[i]===null||
          Object.keys(countOfFamilies)[i]===undefined||
             Object.keys(countOfFamilies)[i]===" "||
       GLString.isLetter(Object.keys(countOfFamilies)[i]))
             delete Object.keys(countOfFamilies)[i]
      }
        if (Object.keys(countOfFamilies).length > 1) {
            for (let i = 0; i < Object.keys(countOfFamilies).length; i++) {
                if (countOfFamilies[Object.keys(countOfFamilies)[i]] < min) {
                    min = countOfFamilies[Object.keys(countOfFamilies)[i]];
                    minFam = Object.keys(countOfFamilies)[i];
                }
            }
            result = minFam;
        }
        else
            result = Object.keys(countOfFamilies)[0];
        console.log(result);
        return result;
    }
     static isLetter(str) {
        return str.length === 1 && str.match(/[a-zA-Z]/i);
    }
}

class NMDPCodeList {
    constructor(numertxt) {
        this.numer = numertxt
    }

    FindNMDPFromClearedString(clearedString) {
        let i = 0;
        console.log(clearedString);
        for (i = 0; i < this.numer.length; i++) {

            if (String(this.numer[i].str) === String(clearedString)) {
                console.log(String(this.numer[i].NMDPcode))
                return this.numer[i].NMDPcode;}

        }
//131:01/241:01/251:01/343:01/361:01/407:01/413:01
//131:01/241:01/251:01/343:01/361:01/407:01/413:01

    }
}

function loadF(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status === 200) {
        result = xmlhttp.responseText;
    }
    return result;
}

class Numeric {
    constructor(NMDPcode, str) {
        this.NMDPcode = NMDPcode;
        this.str = str;
    }

    toString() {
        return this.NMDPcode + " - " + this.str;
    }
}
