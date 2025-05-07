function isPureNumberByRegex(str) {
    return /^\d+$/.test(str);
}


console.log(isPureNumberByRegex("1234567890我的"));
