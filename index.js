function isCreditCardNumberValid(cardNumber,expireDate)  {

//inputtan gelen değeri arrayde tutuyoruz.Number dışında  "-" ve "boşluk" gelirse arraye yazdırmıyor
let convertToNumber = num => Number(num)
let numbers = Array.from(cardNumber.replace(/ /g, "").replaceAll("-", ""), convertToNumber)

//inputtan gelen değer 16 haneden az ise hata veriyor
if (numbers.length != 16) {
    console.log(false, "-->Kart Numarası 16 Haneli Olmalıdır!")
    return false
}

//Sadece number değerleri tutuyor. Number veri tipi dışında gelen tipleri kabul etmiyor
let hasLetter = numbers.some(isNaN)
if (hasLetter) {
    console.log(false, "-->Kart Numarası Sadece Sayı İçermelidir!")
    return false
}

//every ile arrayin içerisindeki indexleri dönerek tüm değerlerin
//aynı olup olmadığını kontrol ediyoruz ve bize true veya false dönüyor
const isDuplicateNumber = numbers.every((val, i, arr) => val === arr[0])

//Dönen değer true ise tüm rakamların aynı olduğunu anlıyoruz
if (isDuplicateNumber) {
    console.log(false, "-->Kart Numarasının Tüm Rakamları Aynı Olamaz!")
    return false
}

//Mod alma işlemi ile kart numarasının son hanesinin tek mi çift mi olduğunu kontrol ediyoruz
if (numbers[numbers.length - 1] % 2 == 1) {
    console.log(false, "-->Kart Numarasının Son Hanesi Çift Rakam Olmalıdır!")
    return false
}

//Reduce ile array elemanlarını toplamını alıyoruz ve if sorgusu ile 16 dan küçükse hata vermesini sağlıyoruz
const reducer = (previousValue, currentValue) => previousValue + currentValue;
if (numbers.reduce(reducer) < 16) {
    console.log(false, "-->Kart Numarası Geçersiz!")
    return false
}
console.log(true, "-->Geçerli Kart Numarası...");

//Kart numarası true dönerse son kullanma tarihi kontrolü yapıyor.
//Kullanıcıdan alınan ay ve yıl bilgisini split ile bölüyoruz ve günümüz
//tarihi karşılaştırarak son kullanma tarihinin geçerli olup olmadığını kontrol ediyoruz
let validMonth = expireDate.split("/")
const expireMonth = Number(validMonth[0]) + 1
const expireYear = Number(validMonth[1])
let date = new Date();

let expireFullDate = new Date(`20${expireYear} ${expireMonth}`);
if (expireFullDate > date) {
    console.log(true, "-->Kartın Son Kullanma Tarihi Geçerli");
} else {
    console.log(false, "-->Kartın Son Kullanma Tarihi Geçersiz");
}
}
//Fonksiyon 2 parametre alıyor.
//İlk parametre kredi kartı numarası Bonus1 Dahil 
//2. parametre bonus2 tarih kontrolü
//Kart Numarası ve Tarih String Girilmelidir (tarih aa/yy)
isCreditCardNumberValid("4444-4444-4444-6666", "02/22")

