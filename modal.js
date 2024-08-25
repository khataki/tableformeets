import { people } from './data.js';
import { weatherOptions } from './weather.js';
import { eventOptions } from './events.js';

export function openModal(person = {}, index = null, onSubmit) {
    const modalHtml = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <form id="personForm">
                <div class="form-group">
                    <label for="personName">Имя:</label>
                    <input type="text" id="personName" name="personName" required value="${person.name || ''}">
                </div>
                <div class="form-group">
                    <label for="personImportance">Важность (1-10):</label>
                    <input type="number" id="personImportance" name="personImportance" min="1" max="10" required value="${person.importance || ''}">
                </div>
                <div class="form-group">
                    <label for="personMood">Предпочитаемое Самочувствие (1-10):</label>
                    <input type="number" id="personMood" name="personMood" min="1" max="10" required value="${person.preferences?.mood || ''}">
                </div>
                <div class="form-group">
                    <label>Предпочитаемая Погода:</label>
                    <div id="personWeather" class="scroll-container">
                        ${generateCheckboxes('weather', weatherOptions, person.preferences?.weather)}
                    </div>
                </div>
                <div class="form-group">
                    <label>Предпочитаемое Мероприятие:</label>
                    <div id="personEvent" class="scroll-container">
                        ${generateCheckboxes('event', eventOptions, person.preferences?.event)}
                    </div>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" id="alwaysMeetMood" ${person.alwaysMeet?.mood ? 'checked' : ''}> Неважно настроение</label>
                    <label><input type="checkbox" id="alwaysMeetWeather" ${person.alwaysMeet?.weather ? 'checked' : ''}> Неважно погода</label>
                    <label><input type="checkbox" id="alwaysMeetEvent" ${person.alwaysMeet?.event ? 'checked' : ''}> Неважно мероприятие</label>
                </div>
                <div class="form-group">
                    <label for="dislikes">Недолюбливает:</label>
                    <select id="dislikes" name="dislikes" multiple>
                        ${getOptionsHtml(person.relations?.dislikes || [])}
                    </select>
                </div>
                <div class="form-group">
                    <label for="likes">Уважает:</label>
                    <select id="likes" name="likes" multiple>
                        ${getOptionsHtml(person.relations?.likes || [])}
                    </select>
                </div>
                <button type="submit">Сохранить</button>
            </form>
        </div>
    `;

    const modalContainer = document.getElementById('personModal');
    modalContainer.innerHTML = modalHtml;
    modalContainer.style.display = 'block';

    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    document.getElementById('personForm').onsubmit = function (e) {
        e.preventDefault();
        const name = document.getElementById('personName').value;
        const importance = parseInt(document.getElementById('personImportance').value);
        const mood = parseInt(document.getElementById('personMood').value);
        const weather = Array.from(document.querySelectorAll('#personWeather input:checked')).map(checkbox => checkbox.value);
        const event = Array.from(document.querySelectorAll('#personEvent input:checked')).map(checkbox => checkbox.value);
        const alwaysMeetMood = document.getElementById('alwaysMeetMood').checked;
        const alwaysMeetWeather = document.getElementById('alwaysMeetWeather').checked;
        const alwaysMeetEvent = document.getElementById('alwaysMeetEvent').checked;
        const dislikes = Array.from(document.querySelectorAll('#dislikes option:checked'), option => option.value);
        const likes = Array.from(document.querySelectorAll('#likes option:checked'), option => option.value);

        const person = { 
            name, 
            importance, 
            meetings: 0, 
            preferences: { mood, weather, event }, 
            alwaysMeet: { mood: alwaysMeetMood, weather: alwaysMeetWeather, event: alwaysMeetEvent }, 
            relations: { dislikes, likes } 
        };

        onSubmit(index, person);
        closeModal();
    };
}

export function closeModal() {
    document.getElementById('personModal').style.display = 'none';
    document.getElementById('personModal').innerHTML = '';
}

function getOptionsHtml(selectedOptions) {
    return people.map(person => `<option value="${person.name}" ${selectedOptions.includes(person.name) ? 'selected' : ''}>${person.name}</option>`).join('');
}

function generateCheckboxes(type, options, selectedValues = []) {
    return options.map(option => `
        <label>
            <input type="checkbox" value="${option}" ${selectedValues.includes(option) ? 'checked' : ''}>
            ${option}
        </label>
    `).join('');
}