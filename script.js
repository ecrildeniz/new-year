// Tüm katılımcılar
const participants = ["sude", "ecril", "zeynep", "elif"];

// Sonuçları saklayan obje
let matches = {};

// Tam çekiliş oluşturma (kimse kendine çıkmayacak, tekrar yok)
function generateSecretSanta() {
    let givers = [...participants];
    let receivers = [...participants];

    // Random karıştır
    receivers.sort(() => Math.random() - 0.5);

    while (true) {
        let valid = true;
        matches = {};

        for (let i = 0; i < givers.length; i++) {
            if (givers[i] === receivers[i]) {
                valid = false; // kendisine çıkmış → tekrar dene
                receivers.sort(() => Math.random() - 0.5);
                break;
            }
            matches[givers[i]] = receivers[i];
        }

        if (valid) break; // doğru eşleşme bulundu
    }
}

// Sayfa açılır açılmaz çekilişi yap
generateSecretSanta();


function startDraw() {
    const name = document.getElementById("userInput").value.trim().toLowerCase();
    const resultBox = document.getElementById("result");

    if (name === "") {
        resultBox.innerHTML = "💗 Lütfen adınızı girin.";
        return;
    }

    if (!participants.includes(name)) {
        resultBox.innerHTML = "😢 Bu isim listede yok.";
        return;
    }

    // Bu kullanıcıya önceden belirlenen kişi
    const assigned = matches[name];

    resultBox.innerHTML = `
        🎁 <strong>${name.toUpperCase()}</strong> bu yıl 
        <strong>${assigned.toUpperCase()}</strong>'e hediye alacak! 🎄💗
    `;
}
