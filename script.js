const translations = {
    en: {
        title: "Advent Calendar",
        day: "Day",
        alert: "You can't open Day {day} yet! Wait until December {day}.",
        phrases: [
            "The journey of a thousand miles begins with a single step. Happy December!",
            "It's beginning to look a lot like Christmas!",
            "May your days be merry and bright.",
            "Christmas isn't a season. It's a feeling.",
            "Peace on Earth, good will to men.",
            "Jingle bells, jingle bells, jingle all the way!",
            "The best way to spread Christmas cheer is singing loud for all to hear.",
            "Let it snow, let it snow, let it snow!",
            "Christmas magic is silent. You don't hear it — you feel it.",
            "Believe in the magic of the season.",
            "Joy to the world!",
            "Halfway to Christmas Eve!",
            "Santa Claus is coming to town.",
            "Make it a December to remember.",
            "All I want for Christmas is you.",
            "Tis the season to be jolly.",
            "Have yourself a merry little Christmas.",
            "It’s the most wonderful time of the year.",
            "May your days be merry and bright.",
            "Christmas waves a magic wand over this world.",
            "Winter wonderland.",
            "Only 2 days until Christmas Eve!",
            "Christmas Eve Eve!",
            "Merry Christmas! Ho Ho Ho!"
        ]
    },
    de: {
        title: "Adventskalender",
        day: "Tag",
        alert: "Du kannst Tag {day} noch nicht öffnen! Warte bis zum {day}. Dezember.",
        phrases: [
            "Auch der längste Weg beginnt mit dem ersten Schritt. Frohen Dezember!",
            "Es weihnachtet sehr!",
            "Mögen deine Tage fröhlich und hell sein.",
            "Weihnachten ist keine Jahreszeit. Es ist ein Gefühl.",
            "Friede auf Erden und den Menschen ein Wohlgefallen.",
            "Kling Glöckchen, klingelingeling!",
            "Der beste Weg, Weihnachtsstimmung zu verbreiten, ist laut zu singen.",
            "Lass es schneien, lass es schneien, lass es schneien!",
            "Weihnachtszauber ist still. Du hörst ihn nicht – du fühlst ihn.",
            "Glaube an den Zauber der Weihnachtszeit.",
            "Freue dich, Welt!",
            "Halbzeit bis Heiligabend!",
            "Der Weihnachtsmann kommt bald.",
            "Mach diesen Dezember unvergesslich.",
            "Alles, was ich zu Weihnachten will, bist du.",
            "Dies ist die Zeit, fröhlich zu sein.",
            "Hab ein frohes kleines Weihnachtsfest.",
            "Es ist die wunderbarste Zeit des Jahres.",
            "Mögen deine Tage fröhlich und hell sein.",
            "Weihnachten schwingt einen Zauberstab über diese Welt.",
            "Winterwunderland.",
            "Nur noch 2 Tage bis Heiligabend!",
            "Ein Tag vor Heiligabend!",
            "Frohe Weihnachten! Ho Ho Ho!"
        ]
    }
};

const calendarData = [
    { day: 1, img: "images/day1.png" },
    { day: 2, img: "images/day2.png" },
    { day: 3, img: "images/day3.png" },
    { day: 4, img: "images/day4.png" },
    { day: 5, img: "images/day5.png" },
    { day: 6, img: "images/day6.png" },
    { day: 7, img: "images/day7.png" },
    { day: 8, img: "images/day8.png" },
    { day: 9, img: "images/day9.png" },
    { day: 10, img: "images/day10.png" },
    { day: 11, img: "images/day11.png" },
    { day: 12, img: "images/day12.png" },
    { day: 13, img: "images/day13.png" },
    { day: 14, img: "images/day14.png" },
    { day: 15, img: "images/day15.png" },
    { day: 16, img: "images/day16.png" },
    { day: 17, img: "images/day17.png" },
    { day: 18, img: "images/day18.png" },
    { day: 19, img: "images/day19.png" },
    { day: 20, img: "https://images.unsplash.com/photo-1516728778615-2d590ea1855e?auto=format&fit=crop&w=500&q=60" },
    { day: 21, img: "https://images.unsplash.com/photo-1457269449834-928af64c684d?auto=format&fit=crop&w=500&q=60" },
    { day: 22, img: "https://images.unsplash.com/photo-1511268011861-691ed9340556?auto=format&fit=crop&w=500&q=60" },
    { day: 23, img: "https://images.unsplash.com/photo-1575151537750-2422d575778c?auto=format&fit=crop&w=500&q=60" },
    { day: 24, img: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=500&q=60" }
];

const grid = document.getElementById('calendar-grid');
const modal = document.getElementById('modal');
const modalDay = document.getElementById('modal-day');
const modalImage = document.getElementById('modal-image');
const modalPhrase = document.getElementById('modal-phrase');
const closeButton = document.querySelector('.close-button');
const headerTitle = document.querySelector('header h1');
const langButton = document.getElementById('lang-toggle');
const shuffleButton = document.getElementById('shuffle-btn');

// Language Management
let currentLang = localStorage.getItem('language') || (navigator.language.startsWith('de') ? 'de' : 'en');
let t = translations[currentLang];

function updateLanguageUI() {
    t = translations[currentLang];

    // Update Text
    headerTitle.textContent = t.title;
    document.title = t.title;
    langButton.textContent = currentLang === 'en' ? 'DE' : 'EN'; // Show the OTHER language option

    // Update Modal if open
    if (modal.style.display === "block") {
        const dayNum = parseInt(modalDay.textContent.replace(/\D/g, ''));
        if (!isNaN(dayNum)) {
            modalDay.textContent = `${t.day} ${dayNum}`;
            modalPhrase.textContent = t.phrases[dayNum - 1];
        }
    }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateLanguageUI();
}

// Initial UI Set
updateLanguageUI();

// Event Listeners
langButton.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'de' : 'en';
    setLanguage(newLang);
});

shuffleButton.addEventListener('click', () => {
    localStorage.removeItem('calendarLayout');
    grid.innerHTML = '';
    initCalendar();
});

// Helper to check if date is reachable
function isDateReachable(day) {
    const today = new Date();
    if (today.getMonth() === 11) { // 11 is December
        return today.getDate() >= day;
    }
    return false;
}

// Load opened state from localStorage
const openedDoors = JSON.parse(localStorage.getItem('openedDoors')) || [];

// Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getLayout() {
    const storedLayout = localStorage.getItem('calendarLayout');
    if (storedLayout) {
        return JSON.parse(storedLayout);
    }

    // Generate new layout
    const layout = calendarData.map(item => ({
        day: item.day,
        rotation: Math.random() * 10 - 5,
        marginTop: Math.random() * 8, // Reduced from 15
        marginLeft: Math.random() * 8 // Reduced from 15
    }));

    shuffleArray(layout);
    localStorage.setItem('calendarLayout', JSON.stringify(layout));
    return layout;
}

function initCalendar() {
    const layout = getLayout();

    layout.forEach(layoutItem => {
        // Find content for this day
        const item = calendarData.find(d => d.day === layoutItem.day);

        const doorContainer = document.createElement('div');
        doorContainer.classList.add('door-container');

        // Apply stored styles
        doorContainer.style.transform = `rotate(${layoutItem.rotation}deg)`;
        doorContainer.style.margin = `${layoutItem.marginTop}px ${layoutItem.marginLeft}px`;

        // Check if already opened
        if (openedDoors.includes(item.day)) {
            doorContainer.classList.add('open');
        }

        const door = document.createElement('div');
        door.classList.add('door');
        door.textContent = item.day;

        const content = document.createElement('div');
        content.classList.add('door-content');
        // Small preview image behind the door
        const img = document.createElement('img');
        img.src = item.img;
        content.appendChild(img);

        doorContainer.appendChild(content);
        doorContainer.appendChild(door);

        // Click Event
        doorContainer.addEventListener('click', () => {
            if (doorContainer.classList.contains('open')) {
                // Close the door
                doorContainer.classList.remove('open');
                removeOpenedDoor(item.day);
                return;
            }

            if (isDateReachable(item.day)) {
                doorContainer.classList.add('open');
                saveOpenedDoor(item.day);
                setTimeout(() => openModal(item), 800); // Wait for animation
            } else {
                doorContainer.classList.add('shake');
                setTimeout(() => doorContainer.classList.remove('shake'), 500);
                alert(t.alert.replace(/{day}/g, item.day));
            }
        });

        grid.appendChild(doorContainer);
    });
}

function openModal(item) {
    modalDay.textContent = `${t.day} ${item.day}`;
    modalImage.src = item.img;
    // Get the phrase from the translations array (index is day - 1)
    modalPhrase.textContent = t.phrases[item.day - 1];
    modal.style.display = "block";
}

function saveOpenedDoor(day) {
    if (!openedDoors.includes(day)) {
        openedDoors.push(day);
        localStorage.setItem('openedDoors', JSON.stringify(openedDoors));
    }
}

function removeOpenedDoor(day) {
    const index = openedDoors.indexOf(day);
    if (index > -1) {
        openedDoors.splice(index, 1);
        localStorage.setItem('openedDoors', JSON.stringify(openedDoors));
    }
}

// Close Modal
closeButton.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Initialize
initCalendar();
