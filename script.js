let currentInput = '';
document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.converter select');
    selects.forEach(select => select.addEventListener('change', updateConversion));
})
function showConverter(type) {
    const converters = document.querySelectorAll('.converter');
    converters.forEach(conv => conv.classList.remove('active'));

    document.getElementById(type).classList.add('active');

    const buttons = document.querySelectorAll('.menu-bar button');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.menu-bar button[onclick="showConverter(\'' + type + '\')"]').classList.add('active');
    clearInput();
}

function appendNumber(number) {
    currentInput += number;
    document.querySelector('.converter.active input').value = currentInput;
    updateConversion();
}

function clearInput() {
    currentInput = '';
    document.querySelector('.converter.active input').value = '';
    updateConversion();
}

function updateConversion() {
    const activeConverter = document.querySelector('.converter.active');
    const inputValue = parseFloat(currentInput) || 0;
    const fromUnit = activeConverter.querySelector('select:nth-of-type(1)').value;
    const toUnit = activeConverter.querySelector('select:nth-of-type(2)').value;

    let result = '';
    if (currentInput) {
        if (activeConverter.id === 'area') {
            result = convertArea(inputValue, fromUnit, toUnit);
        } else if (activeConverter.id === 'length') {
            result = convertLength(inputValue, fromUnit, toUnit);
        } else if (activeConverter.id === 'temperature') {
            result = convertTemperature(inputValue, fromUnit, toUnit);
        } else if (activeConverter.id === 'volume') {
            result = convertVolume(inputValue, fromUnit, toUnit);
        } else if (activeConverter.id === 'mass') {
            result = convertMass(inputValue, fromUnit, toUnit);
        } else if (activeConverter.id === 'time') {
            result = convertTime(inputValue, fromUnit, toUnit);
        } else if (activeConverter.id === 'data') {
            result = convertData(inputValue, fromUnit, toUnit);
        } else if (activeConverter.id === 'speed') {
            result = convertSpeed(inputValue, fromUnit, toUnit);
        }
    }

    activeConverter.querySelector('div').innerText = result;
}

function convertArea(value, from, to) {
    const conversionRates = {
        sqft: { sqm: 0.092903, sqkm: 0.000000092903, sqmi: 0.00000003587, acres: 0.000022957, hectares: 0.0000092903, sqft: 1 },
        sqm: { sqft: 10.7639, sqkm: 0.000001, sqmi: 0.0000003861, acres: 0.000247105, hectares: 0.0001, sqm: 1 },
        sqkm: { sqft: 10763910.4, sqm: 1000000, sqmi: 0.386102, acres: 247.105, hectares: 100, sqkm: 1 },
        sqmi: { sqft: 27878400, sqm: 2589988.11, sqkm: 2.58999, acres: 640, hectares: 258.999, sqmi: 1 },
        acres: { sqft: 43560, sqm: 4046.86, sqkm: 0.00404686, sqmi: 0.0015625, hectares: 0.404686, acres: 1 },
        hectares: { sqft: 107639.104, sqm: 10000, sqkm: 0.01, sqmi: 0.00386102, acres: 2.47105, hectares: 1 }
    };

    const result = value * conversionRates[from][to];
    return `${result.toFixed(5)} ${to}`;
}

function convertLength(value, from, to) {
    const conversionRates = {
        inches: { feet: 0.0833333, yards: 0.0277778, miles: 0.0000157828, cm: 2.54, meters: 0.0254, km: 0.0000254, inches: 1 },
        feet: { inches: 12, yards: 0.333333, miles: 0.000189394, cm: 30.48, meters: 0.3048, km: 0.0003048, feet: 1 },
        yards: { inches: 36, feet: 3, miles: 0.000568182, cm: 91.44, meters: 0.9144, km: 0.0009144, yards: 1 },
        miles: { inches: 63360, feet: 5280, yards: 1760, cm: 160934, meters: 1609.34, km: 1.60934, miles: 1 },
        cm: { inches: 0.393701, feet: 0.0328084, yards: 0.0109361, miles: 0.0000062137, meters: 0.01, km: 0.00001, cm: 1 },
        meters: { inches: 39.3701, feet: 3.28084, yards: 1.09361, miles: 0.000621371, cm: 100, km: 0.001, meters: 1 },
        km: { inches: 39370.1, feet: 3280.84, yards: 1093.61, miles: 0.621371, cm: 100000, meters: 1000, km: 1 }
    };

    const result = value * conversionRates[from][to];
    return `${result.toFixed(5)} ${to}`;
}

function convertTemperature(value, from, to) {
    let result = value;
    if (from === 'celsius') {
        if (to === 'fahrenheit') {
            result = (value * 9/5) + 32;
        } else if (to === 'kelvin') {
            result = value + 273.15;
        }
    } else if (from === 'fahrenheit') {
        if (to === 'celsius') {
            result = (value - 32) * 5/9;
        } else if (to === 'kelvin') {
            result = ((value - 32) * 5/9) + 273.15;
        }
    } else if (from === 'kelvin') {
        if (to === 'celsius') {
            result = value - 273.15;
        } else if (to === 'fahrenheit') {
            result = ((value - 273.15) * 9/5) + 32;
        }
    }
    return `${result.toFixed(5)} ${to}`;
}

function convertVolume(value, from, to) {
    const conversionRates = {
        liters: { ml: 1000, gallons: 0.264172, quarts: 1.05669, pints: 2.11338, cups: 4.22675, ounces: 33.814, liters: 1 },
        ml: { liters: 0.001, gallons: 0.000264172, quarts: 0.00105669, pints: 0.00211338, cups: 0.00422675, ounces: 0.033814, ml: 1 },
        gallons: { liters: 3.78541, ml: 3785.41, quarts: 4, pints: 8, cups: 16, ounces: 128, gallons: 1 },
        quarts: { liters: 0.946353, ml: 946.353, gallons: 0.25, pints: 2, cups: 4, ounces: 32, quarts: 1 },
        pints: { liters: 0.473176, ml: 473.176, gallons: 0.125, quarts: 0.5, cups: 2, ounces: 16, pints: 1 },
        cups: { liters: 0.24, ml: 240, gallons: 0.0625, quarts: 0.25, pints: 0.5, ounces: 8, cups: 1 },
        ounces: { liters: 0.0295735, ml: 29.5735, gallons: 0.0078125, quarts: 0.03125, pints: 0.0625, cups: 0.125, ounces: 1 }
    };

    const result = value * conversionRates[from][to];
    return `${result.toFixed(5)} ${to}`;
}

function convertMass(value, from, to) {
    const conversionRates = {
        grams: { kg: 0.001, mg: 1000, ounces: 0.035274, pounds: 0.00220462, stones: 0.000157473, grams: 1 },
        kg: { grams: 1000, mg: 1000000, ounces: 35.274, pounds: 2.20462, stones: 0.157473, kg: 1 },
        mg: { grams: 0.001, kg: 0.000001, ounces: 0.000035274, pounds: 0.0000022046, stones: 0.00000015747, mg: 1 },
        ounces: { grams: 28.3495, kg: 0.0283495, mg: 28349.5, pounds: 0.0625, stones: 0.00446429, ounces: 1 },
        pounds: { grams: 453.592, kg: 0.453592, mg: 453592, ounces: 16, stones: 0.0714286, pounds: 1 },
        stones: { grams: 6350.29, kg: 6.35029, mg: 6350290, ounces: 224, pounds: 14, stones: 1 }
    };

    const result = value * conversionRates[from][to];
    return `${result.toFixed(5)} ${to}`;
}

function convertTime(value, from, to) {
    const conversionRates = {
        seconds: { minutes: 0.0166667, hours: 0.000277778, days: 0.0000115741, weeks: 0.00000165344, months: 0.00000038052, years: 0.0000000317098, seconds: 1 },
        minutes: { seconds: 60, hours: 0.0166667, days: 0.000694444, weeks: 0.0000992063, months: 0.0000228311, years: 0.0000019013, minutes: 1 },
        hours: { seconds: 3600, minutes: 60, days: 0.0416667, weeks: 0.00595238, months: 0.00136986, years: 0.000114155, hours: 1 },
        days: { seconds: 86400, minutes: 1440, hours: 24, weeks: 0.142857, months: 0.0328767, years: 0.00273973, days: 1 },
        weeks: { seconds: 604800, minutes: 10080, hours: 168, days: 7, months: 0.230137, years: 0.0191781, weeks: 1 },
        months: { seconds: 2628000, minutes: 43800, hours: 730, days: 30.4167, weeks: 4.34524, years: 0.0833333, months: 1 },
        years: { seconds: 31536000, minutes: 525600, hours: 8760, days: 365, weeks: 52.1429, months: 12, years: 1 }
    };

    const result = value * conversionRates[from][to];
    return `${result.toFixed(5)} ${to}`;
}

function convertData(value, from, to) {
    const conversionRates = {
        bits: { bytes: 0.125, kb: 0.000125, mb: 0.000000125, gb: 0.000000000125, tb: 0.000000000000125, bits: 1 },
        bytes: { bits: 8, kb: 0.001, mb: 0.000001, gb: 0.000000001, tb: 0.000000000001, bytes: 1 },
        kb: { bits: 8000, bytes: 1000, mb: 0.001, gb: 0.000001, tb: 0.000000001, kb: 1 },
        mb: { bits: 8000000, bytes: 1000000, kb: 1000, gb: 0.001, tb: 0.000001, mb: 1 },
        gb: { bits: 8000000000, bytes: 1000000000, kb: 1000000, mb: 1000, tb: 0.001, gb: 1 },
        tb: { bits: 8000000000000, bytes: 1000000000000, kb: 1000000000, mb: 1000000, gb: 1000, tb: 1 }
    };

    const result = value * conversionRates[from][to];
    return `${result.toFixed(5)} ${to}`;
}

function convertSpeed(value, from, to) {
    const conversionRates = {
        mps: { kph: 3.6, mph: 2.23694, fps: 3.28084, mps: 1 },
        kph: { mps: 0.277778, mph: 0.621371, fps: 0.911344, kph: 1 },
        mph: { mps: 0.44704, kph: 1.60934, fps: 1.46667, mph: 1 },
        fps: { mps: 0.3048, kph: 1.09728, mph: 0.681818, fps: 1 }
    };

    const result = value * conversionRates[from][to];
    return `${result.toFixed(5)} ${to}`;
}


