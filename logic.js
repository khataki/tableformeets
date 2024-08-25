import { people } from './data.js';

export function populateSelectOptions(selectElement, options) {
    if (selectElement) {
        selectElement.innerHTML = '';
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    }
}

export function calculateMeetability(person, mood, weather, event) {
    const alwaysMeet = person.alwaysMeet || { mood: false, weather: false, event: false };
    const preferences = person.preferences || { mood: 0, weather: '', event: '' };

    const weatherScore = alwaysMeet.weather ? 0 : (preferences.weather.includes(weather) ? 0 : 5);
    const eventScore = alwaysMeet.event ? 0 : (preferences.event.includes(event) ? 0 : 5);
    const moodScore = alwaysMeet.mood ? 0 : Math.abs(preferences.mood - mood);
    const preferenceScore = (moodScore + weatherScore + eventScore) / 3;
    const score = person.importance * ((mood + 5) / 2) - preferenceScore;
    return score > 20;
}

export function updateTable(mood, weather, event) {
    const tbody = document.querySelector('#peopleTable tbody');
    tbody.innerHTML = '';

    people.forEach((person, index) => {
        const canMeet = calculateMeetability(person, mood, weather, event);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.importance}</td>
            <td>${person.meetings}</td>
            <td>${canMeet ? 'Да' : 'Нет'}</td>
            <td><input type="checkbox" data-index="${index}"></td>
            <td>
                <button class="edit" data-index="${index}">Редактировать</button>
                <button class="delete" data-index="${index}">Удалить</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    $('#peopleTable').DataTable();
}

export function createGroup() {
    const selectedPeople = [];
    document.querySelectorAll('#peopleTable tbody input[type="checkbox"]:checked').forEach(checkbox => {
        const index = parseInt(checkbox.getAttribute('data-index'));
        selectedPeople.push(people[index]);
    });

    const validGroup = validateGroup(selectedPeople);
    if (validGroup) {
        displayGroup(selectedPeople.map(person => person.name));
    } else {
        alert('Группа содержит конфликтные взаимоотношения. Пожалуйста, пересмотрите выбор.');
    }
}

function validateGroup(group) {
    for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
            const person1 = group[i];
            const person2 = group[j];
            if (person1.relations.dislikes.includes(person2.name) || person2.relations.dislikes.includes(person1.name)) {
                return false;
            }
        }
    }
    return true;
}