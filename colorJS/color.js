let colorPicker = document.getElementById("colorPicker");
let screen = document.getElementById("screen");
let rgbR = document.getElementById("rgbR");
let rgbG = document.getElementById("rgbG");
let rgbB = document.getElementById("rgbB");
let cmykC = document.getElementById("cmykC");
let cmykM = document.getElementById("cmykM");
let cmykY = document.getElementById("cmykY");
let cmykK = document.getElementById("cmykK");
let hlsH1 = document.getElementById("hlsH");
let hlsL1 = document.getElementById("hlsL");
let hlsS1 = document.getElementById("hlsS");
let rangeC = document.getElementById("rangeC");
let rangeM=document.getElementById("rangeM");
let rangeY = document.getElementById("rangeY");
let rangeK=document.getElementById("rangeK");
let rangeR = document.getElementById("rangeR");
let rangeG = document.getElementById("rangeG");
let rangeB=document.getElementById("rangeB");
let rangeH= document.getElementById("rangeH");
let rangeS = document.getElementById("rangeS");
let rangeL=document.getElementById("rangeL");
cmykC.addEventListener("input", updateCmyk);
cmykM.addEventListener("input", updateCmyk);
cmykY.addEventListener("input", updateCmyk);
cmykK.addEventListener("input", updateCmyk);
rangeC.addEventListener("input", updateRangeCmyk);
rangeM.addEventListener("input", updateRangeCmyk);
rangeY.addEventListener("input", updateRangeCmyk);
rangeK.addEventListener("input", updateRangeCmyk);
rgbR.addEventListener("input", updateRgb);
rgbG.addEventListener("input", updateRgb);
rgbB.addEventListener("input", updateRgb);
rangeR.addEventListener("input", updateRgbRange);
rangeB.addEventListener("input", updateRgbRange);
rangeG.addEventListener("input", updateRgbRange);
hlsH1.addEventListener("input", hslUpdate);
hlsL1.addEventListener("input", hslUpdate);
hlsS1.addEventListener("input", hslUpdate);
rangeH.addEventListener("input", hslRangeUpdate);
rangeS.addEventListener("input", hslRangeUpdate);
rangeL.addEventListener("input", hslRangeUpdate);
// Пипетка
colorPicker.addEventListener("input", function() {
    if (colorPicker.value !== "#ff0000") {
        screen.style.background = colorPicker.value;
        hexToRgb(colorPicker.value);
        updateRgb();
        updateCmyk();
        hslUpdate();
    }
});

function cmykToRgb(c, m, y, k) {
    c = parseFloat(c) / 100;
    m = parseFloat(m) / 100;
    y = parseFloat(y) / 100;
    k = parseFloat(k) / 100;

    let r = Math.round(255 * (1 - c) * (1 - k));
    let g = Math.round(255 * (1 - m) * (1 - k));
    let b = Math.round(255 * (1 - y) * (1 - k));

    return [r, g, b];
}
function updateCmyk() {
   
    const c = parseFloat(cmykC.value);
    const m = parseFloat(cmykM.value);
    const y = parseFloat(cmykY.value);
    const k = parseFloat(cmykK.value);

   
    if (isNaN(c) || isNaN(m) || isNaN(y) || isNaN(k) || c < 0 || c > 100 || m < 0 || m > 100 || y < 0 || y > 100 || k < 0 || k > 100) {
        return; 
    }
  
    
    const [r, g, b] = cmykToRgb(c, m, y, k);
    colorPicker.value = rgbToHex(r, g, b);
    screen.style.background = colorPicker.value;

    rgbR.value = r;
    rgbG.value = g;
    rgbB.value = b;
    
    rgbToCymk(r, g, b);
    rgbToHls(r, g, b);

    rangeC.value=c;
    rangeM.value=m;
    rangeY.value=y;
    rangeK.value=k;
    updateRgb();
    hslUpdate();
}

function updateRangeCmyk(){
    cmykC.value=rangeC.value;
    cmykM.value= rangeM.value;
    cmykY.value= rangeY.value;
    cmykK.value= rangeK.value;
    updateCmyk();
}

function updateRgb () {
    const r = parseInt(rgbR.value, 10);
    const g = parseInt(rgbG.value, 10);
    const b = parseInt(rgbB.value, 10);

    if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        return; 
    }

    const hexColor = rgbToHex(r, g, b);
    colorPicker.value = hexColor;
    screen.style.background = hexColor;
    rangeR.value=rgbR.value;
    rangeG.value =rgbG.value;
    rangeB.value=rgbB.value;
    
    rgbToCymk(r, g, b);
    rgbToHls(r, g, b);
    updateCmyk();
    hslUpdate();
}

function updateRgbRange(){
    rgbR.value = rangeR.value;
    rgbG.value= rangeG.value;
    rgbB.value = rangeB.value;
    updateRgb();
}

function rgbToHex(r, g, b) {
    const toHex = (n) => {
        const hex = n.toString(16).padStart(2, '0');
        return hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    rgbR.value = r;
    rgbG.value = g;
    rgbB.value = b;

    rgbToCymk(r, g, b);
    rgbToHls(r, g, b);
}


function rgbToCymk(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let k = 1 - Math.max(r, g, b);
    let c = (1 - r - k) / (1 - k) || 0;
    let m = (1 - g - k) / (1 - k) || 0;
    let y = (1 - b - k) / (1 - k) || 0;
    c=Math.round(c * 100);
    m= Math.round(m * 100);
     y = Math.round(y * 100);
    k = Math.round(k * 100);
    cmykC.value = `${c}%`;
    cmykM.value = `${m}%`;
    cmykY.value = `${y}%`;
    cmykK.value = `${k}%`;

}
function rgbToHls(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let min = Math.min(r, g, b);
    let max = Math.max(r, g, b);
    let delta = max - min;

    let l = (max + min) / 2;

    let s;
    if (delta === 0) {
        s = 0; 
    } else {
        s = (delta === 0 ? 0 : (l <= 0.5 ? delta / (max + min) : delta / (2 - max - min)));
    }

    let h;
    if (delta === 0) {
        h = 0; 
    } else {
        if (max === r) {
            h = (g - b) / delta + (g < b ? 6 : 0);
        } else if (max === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }
        h /= 6;
    }
    
    h = Math.round(h * 360);

    l = Math.round(l * 100);
    s = Math.round(s * 100);

    hlsH1.value = h;
    hlsL1.value = l;
    hlsS1.value = s;
    rangeH.value=hlsH1.value;
    rangeL.value=hlsL1.value;
    rangeS.value=hlsS1.value;
}

function hslUpdate() {
    const h = parseInt(hlsH1.value, 10);
    const s = parseInt(hlsS1.value, 10);
    const l = parseInt(hlsL1.value, 10);

    if (isNaN(h) || isNaN(s) || isNaN(l) || h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
        return; 
    }
    
    
    const hNorm = h / 360;
    const sNorm = s / 100;
    const lNorm = l / 100;

    let r, g, b;

    if (sNorm === 0) {
        
        r = g = b = lNorm;
    } else {
        // Функция для расчета цвета из HSL
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
        const p = 2 * lNorm - q;

        r = hue2rgb(p, q, hNorm + 1 / 3);
        g = hue2rgb(p, q, hNorm);
        b = hue2rgb(p, q, hNorm - 1 / 3);
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    const hexColor = rgbToHex(r, g, b);
    colorPicker.value = hexColor;
    screen.style.background = hexColor;
    
    rgbR.value = r;
    rgbG.value = g;
    rgbB.value = b;

    rangeH.value = hlsH1.value;
    rangeS.value = hlsS1.value;
    rangeL.value = hlsL1.value;

    rgbToCymk(r, g, b);
    updateCmyk();
}

function hslRangeUpdate(){
    hlsH1.value = rangeH.value;
    hlsS1.value = rangeS.value;
    hlsL1.value = rangeL.value;
    hslUpdate();
}

