const calendarData = [
    { day: 1, phrase: "The journey of a thousand miles begins with a single step. Happy December!", img: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=500&q=60" },
    { day: 2, phrase: "It's beginning to look a lot like Christmas!", img: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=500&q=60" },
    { day: 3, phrase: "May your days be merry and bright.", img: "https://images.unsplash.com/photo-1482517967863-00e15c9b4499?auto=format&fit=crop&w=500&q=60" },
    { day: 4, phrase: "Christmas isn't a season. It's a feeling.", img: "https://images.unsplash.com/photo-1576606539605-279246d98584?auto=format&fit=crop&w=500&q=60" },
    { day: 5, phrase: "Peace on Earth, good will to men.", img: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=500&q=60" },
    { day: 6, phrase: "Jingle bells, jingle bells, jingle all the way!", img: "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=500&q=60" },
    { day: 7, phrase: "The best way to spread Christmas cheer is singing loud for all to hear.", img: "https://images.unsplash.com/photo-1511268011861-691ed9340556?auto=format&fit=crop&w=500&q=60" },
    { day: 8, phrase: "Let it snow, let it snow, let it snow!", img: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?auto=format&fit=crop&w=500&q=60" },
    { day: 9, phrase: "Christmas magic is silent. You don't hear it — you feel it.", img: "https://images.unsplash.com/photo-1575372587728-5418f487946b?auto=format&fit=crop&w=500&q=60" },
    { day: 10, phrase: "Believe in the magic of the season.", img: "https://images.unsplash.com/photo-1512474932049-782abb8be239?auto=format&fit=crop&w=500&q=60" },
    { day: 11, phrase: "Joy to the world!", img: "https://images.unsplash.com/photo-1514064019862-23e2a332a6a6?auto=format&fit=crop&w=500&q=60" },
    { day: 12, phrase: "Halfway to Christmas Eve!", img: "https://images.unsplash.com/photo-1576919228236-a097c32a58be?auto=format&fit=crop&w=500&q=60" },
    { day: 13, phrase: "Santa Claus is coming to town.", img: "https://images.unsplash.com/photo-1543094259-236bd0801ac1?auto=format&fit=crop&w=500&q=60" },
    { day: 14, phrase: "Make it a December to remember.", img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=500&q=60" },
    { day: 15, phrase: "All I want for Christmas is you.", img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=500&q=60" },
    { day: 16, phrase: "Tis the season to be jolly.", img: "https://images.unsplash.com/photo-1480632563560-30f561973b25?auto=format&fit=crop&w=500&q=60" },
    { day: 17, phrase: "Have yourself a merry little Christmas.", img: "https://images.unsplash.com/photo-1577046848358-4623c085f0ea?auto=format&fit=crop&w=500&q=60" },
    { day: 18, phrase: "It’s the most wonderful time of the year.", img: "https://images.unsplash.com/photo-1512474932049-782abb8be239?auto=format&fit=crop&w=500&q=60" },
    { day: 19, phrase: "May your days be merry and bright.", img: "https://images.unsplash.com/photo-1545622783-b3e021430fee?auto=format&fit=crop&w=500&q=60" },
    { day: 20, phrase: "Christmas waves a magic wand over this world.", img: "https://images.unsplash.com/photo-1516728778615-2d590ea1855e?auto=format&fit=crop&w=500&q=60" },
    { day: 21, phrase: "Winter wonderland.", img: "https://images.unsplash.com/photo-1457269449834-928af64c684d?auto=format&fit=crop&w=500&q=60" },
    { day: 22, phrase: "Only 2 days until Christmas Eve!", img: "https://images.unsplash.com/photo-1511268011861-691ed9340556?auto=format&fit=crop&w=500&q=60" },
    { day: 23, phrase: "Christmas Eve Eve!", img: "https://images.unsplash.com/photo-1575151537750-2422d575778c?auto=format&fit=crop&w=500&q=60" },
    { day: 24, phrase: "Merry Christmas! Ho Ho Ho!", img: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=500&q=60" }
];

const grid = document.getElementById('calendar-grid');
const modal = document.getElementById('modal');
const modalDay = document.getElementById('modal-day');
const modalImage = document.getElementById('modal-image');
const modalPhrase = document.getElementById('modal-phrase');
const closeButton = document.querySelector('.close-button');

// Helper to check if date is reachable
function isDateReachable(day) {
    return true; // Allow opening all windows for testing

    /* Original Logic preserved for reference:
    const today = new Date();
    if (today.getMonth() === 11) { // 11 is December
        return today.getDate() >= day;
    }
    return false; 
    */
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

// Shuffle the data once
shuffleArray(calendarData);

function initCalendar() {
    calendarData.forEach(item => {
        const doorContainer = document.createElement('div');
        doorContainer.classList.add('door-container');

        // Add random rotation for natural look
        const randomRotation = Math.random() * 10 - 5; // -5 to 5 deg
        doorContainer.style.transform = `rotate(${randomRotation}deg)`;

        // Add random margins for scattered look
        const randomMarginTop = Math.random() * 20;
        const randomMarginLeft = Math.random() * 20;
        doorContainer.style.margin = `${randomMarginTop}px ${randomMarginLeft}px`;

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
                openModal(item);
                return;
            }

            if (isDateReachable(item.day)) {
                doorContainer.classList.add('open');
                saveOpenedDoor(item.day);
                setTimeout(() => openModal(item), 800); // Wait for animation
            } else {
                doorContainer.classList.add('shake');
                setTimeout(() => doorContainer.classList.remove('shake'), 500);
                alert(`You can't open Day ${item.day} yet! Wait until December ${item.day}.`);
            }
        });

        grid.appendChild(doorContainer);
    });
}

function openModal(item) {
    modalDay.textContent = `Day ${item.day}`;
    modalImage.src = item.img;
    modalPhrase.textContent = item.phrase;
    modal.style.display = "block";
}

function saveOpenedDoor(day) {
    if (!openedDoors.includes(day)) {
        openedDoors.push(day);
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
