const STORAGE_TOKEN = 'YM60FTKVC9CBFE5XW9O1JLLZFXHVPE9YQDQ3YUUP';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let contactList = [
    {
        "firstname": "Anton",
        "name": "Mayer",
        "avatarColor": "orange",
        "phoneNumber": "491111111111",
        "email": "antom@gmail.com"
    },
    {
        "firstname": "Anja",
        "name": "Schulz",
        "avatarColor": "purple",
        "phoneNumber": "493333333333",
        "email": "schulz@hotmail.com"
    },
    {
        "firstname": "Benedikt",
        "name": "Ziegler",
        "avatarColor": "blue",
        "phoneNumber": "494444444444",
        "email": "benedikt@gmail.com"
    },
    {
        "firstname": "David",
        "name": "Berg",
        "avatarColor": "pink",
        "phoneNumber": "495555555555",
        "email": "davidberg@gmail.com"
    },
    {
        "firstname": "Eva",
        "name": "Fischer",
        "avatarColor": "yellow",
        "phoneNumber": "496666666666",
        "email": "eva@gmail.com"
    },
    {
        "firstname": "Emmanuel",
        "name": "Mauer",
        "avatarColor": "green",
        "phoneNumber": "497777777777",
        "email": "emmanuelma@gmail.com"
    },
    {
        "firstname": "Marcel",
        "name": "Bauer",
        "avatarColor": "darkpurple",
        "phoneNumber": "498888888888",
        "email": ""
    },
    {
        "firstname": "Tatjana",
        "name": "Wolf",
        "avatarColor": "red",
        "phoneNumber": "492222222222",
        "email": "wolf@gmail.de"
    },
]



async function setItem(key, value) {
    
    const payload = { key, value, token: STORAGE_TOKEN }; // Die Daten die hinzugefügt werden, speichern wir in ein JSON. Token: STORAGE_TOKEN, da dieser immer gleicht bleibt.

    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
    // fetch Befehl um auf diese URL zugreifen zu können. Method: 'POST' um Daten hinzuzufügen (Methode ändern).
    // JSON.stringify benutzen wir, da wir auf kein JSON Objekt zugreifen/senden können, um es als Text umzuwandeln.

}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
 // .then() = Antwort vom Server, Response als JSON wieder zu speiechern.
    return fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}