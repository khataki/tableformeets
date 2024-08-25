import { updateTable, populateSelectOptions, createGroup } from './logic.js';
import { people, addPerson, updatePerson, deletePerson, loadPeople } from './data.js';
import { weatherOptions } from './weather.js';
import { eventOptions } from './events.js';
import { openModal, closeModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
    loadPeople(); // Загрузка людей из localStorage
    people.forEach(person => {
        const storedMeetings = localStorage.getItem(person.name);
        if (storedMeetings !== null) {
            person.meetings = parseInt(storedMeetings);
        }
    });

    populateSelectOptions(document.getElementById('weather'), weatherOptions);
    populateSelectOptions(document.getElementById('event'), eventOptions);

    updateTable(5, 'Солнечно', 'Прогулка'); // Параметры по умолчанию

    document.getElementById('parametersForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const mood = parseInt(document.getElementById('mood').value);
        const weather = document.getElementById('weather').value;
        const event = document.getElementById('event').value;
        updateTable(mood, weather, event);
    });

    document.getElementById('addPerson').addEventListener('click', () => {
        openModal({}, null, (index, person) => {
            addPerson(person);
            updateTable(5, 'Солнечно', 'Прогулка'); // Параметры по умолчанию
        });
    });

    document.getElementById('createGroup').addEventListener('click', () => {
        createGroup();
    });

    document.querySelector('#peopleTable tbody').addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            console.log(`Editing person at index: ${index}`);
            const person = people[index];
            openModal(person, index, (index, updatedPerson) => {
                updatePerson(index, updatedPerson);
                updateTable(5, 'Солнечно', 'Прогулка'); // Параметры по умолчанию
            });
        } else if (e.target.classList.contains('delete')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            console.log(`Deleting person at index: ${index}`);
            deletePerson(index);
            updateTable(5, 'Солнечно', 'Прогулка'); // Параметры по умолчанию
        }
    });

    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    const closeGroupBtn = document.querySelector('.close-group');
    if (closeGroupBtn) {
        closeGroupBtn.addEventListener('click', () => {
            document.getElementById('groupModal').style.display = 'none';
        });
    }
});