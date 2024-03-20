const STORAGE_TOKEN = 'YM60FTKVC9CBFE5XW9O1JLLZFXHVPE9YQDQ3YUUP';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    
    const payload = { key, value, token: STORAGE_TOKEN }; // Die Daten die hinzugefügt werden, speichern wir in ein JSON. Token: STORAGE_TOKEN, da dieser immer gleicht bleibt.

    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
    // fetch Befehl um auf diese URL zugreifen zu können. Method: 'POST' um Daten hinzuzufügen (Methode ändern).
    // JSON.stringify benutzen wir, da wir auf kein JSON Objekt zugreifen/senden können, um es als Text umzuwandeln.

}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
 // .then() = Antwort vom Server, Response als JSON wieder zu speichern.
    return fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

async function clearItem(key) {
    return setItem(key, [])
    .then(response => {
        console.log('Wert für Schlüssel "' + key + '" wurde geleert', response);
    })
    .catch(error => {
        console.error('Fehler beim Leeren des Werts für Schlüssel "' + key + '"', error);
    });
}