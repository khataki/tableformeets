export let people = [
    { name: 'Иван Иванов', importance: 8, meetings: 0, preferences: { mood: 7, weather: 'Солнечно', event: 'Прогулка' }, alwaysMeet: { mood: false, weather: false, event: false }, relations: { dislikes: [], likes: [] } },
    { name: 'Петр Петров', importance: 5, meetings: 0, preferences: { mood: 6, weather: 'Дождливо', event: 'Поход в кино' }, alwaysMeet: { mood: false, weather: false, event: false }, relations: { dislikes: [], likes: [] } },
    { name: 'Сергей Сергеев', importance: 9, meetings: 0, preferences: { mood: 8, weather: 'Холодно', event: 'Посиделка в баре' }, alwaysMeet: { mood: false, weather: false, event: false }, relations: { dislikes: [], likes: [] } },
    { name: 'Анна Аннова', importance: 7, meetings: 0, preferences: { mood: 5, weather: 'Жарко', event: 'Прогулка' }, alwaysMeet: { mood: false, weather: false, event: false }, relations: { dislikes: [], likes: [] } }
];

export function addPerson(person) {
    people.push(person);
    localStorage.setItem('people', JSON.stringify(people));
    console.log(`Добавлен человек: ${JSON.stringify(person)}`);
}

export function updatePerson(index, updatedPerson) {
    people[index] = updatedPerson;
    localStorage.setItem('people', JSON.stringify(people));
    console.log(`Обновлен человек на индексе ${index}: ${JSON.stringify(updatedPerson)}`);
}

export function deletePerson(index) {
    const deletedPerson = people.splice(index, 1);
    localStorage.setItem('people', JSON.stringify(people));
    console.log(`Удален человек на индексе ${index}: ${JSON.stringify(deletedPerson)}`);
}

export function loadPeople() {
    const storedPeople = localStorage.getItem('people');
    if (storedPeople) {
        people = JSON.parse(storedPeople);
    }
}