const startButton = document.getElementById("startRace");
const horses = document.querySelectorAll(".horse");
const finishLine = document.querySelector(".finish-line");
let winnerDeclared = false;

//Butona bastığımız zaman yarış bitesiye kadar buton devde dışı kalır.
//Her bir at için de raceHorse fonksiyonu çağrılır.
startButton.addEventListener("click" , () => {
    startButton.disabled = true
    winnerDeclared = false;

    horses.forEach((horse, index ) => {
        raceHorse(horse, finishLine, index + 1);
    });
});

function raceHorse(horse, finishLine, horseNumber){
    const raceInterval = setInterval(() => {
        //getComputedStyle ile atın o anki konumuna ulaşıyoruz ve 10'luk tabana dönüştürüyoruz.
        const marginLeft = parseInt(getComputedStyle(horse).marginLeft, 10);
        //random ile rastgele sayı üretiyoruz. Atların daha hızlı olması için 20 ile çarptım.
        const randomMovement = Math.random() * 30;

        //Eğer çizgiyi geçen at yok ise koşula girer.
        if (!winnerDeclared) {
            if (marginLeft + randomMovement >= finishLine.offsetLeft) {
                declareWinner(horseNumber);
                winnerDeclared = true;
                startButton.disabled = false;
                clearInterval(raceInterval);
            } else {
                var newMargin = marginLeft + randomMovement;
                horse.style.marginLeft = newMargin + "px";
            }
            //Eğer çizgiyi geçen at var ise yarış durdurulur.
        } else {
            clearInterval(raceInterval);
        }
    }, 100);
}

//Çizgiyi geçen atın numarasını alert olarak gösteren fonksiyon.
function declareWinner(horseNumber){
    alert("At " + horseNumber + " kazandi!");
}