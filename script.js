
"use strict";

// Початкові дані бібліотеки
const initialData = {

    books: [
        {
            title: "Кобзар",
            author: "Тарас Шевченко",
            year: 1840,
            genre: "Поезія",
            pages: 350,
            publisher: "Веселка"
        },
        {
            title: "Лісова пісня",
            author: "Леся Українка",
            year: 1911,
            genre: "Драма",
            pages: 160,
            publisher: "Фоліо"
        }
    ],

    readers: [
        {
            name: "Іваненко Іван",
            age: 20,
            phone: "0501112233",
            email: "ivan@gmail.com",
            ticket: 101,
            date: "01.09.2026"
        },
        {
            name: "Петренко Олена",
            age: 22,
            phone: "0672223344",
            email: "olena@gmail.com",
            ticket: 102,
            date: "05.09.2026"
        }
    ],

    workers: [
        {
            name: "Коваленко Марія",
            position: "Бібліотекар",
            age: 35,
            phone: "0951112233",
            experience: "10 років",
            salary: "18000 грн"
        },
        {
            name: "Сидоренко Петро",
            position: "Адміністратор",
            age: 40,
            phone: "0632223344",
            experience: "12 років",
            salary: "22000 грн"
        }
    ]

};

// Назви таблиць і стовпців
const tableConfig = {

    books: {
        title: "Книги",
        columns: {
            title: "Назва",
            author: "Автор",
            year: "Рік",
            genre: "Жанр",
            pages: "Кількість сторінок",
            publisher: "Видавництво"
        }
    },

    readers: {
        title: "Читачі",
        columns: {
            name: "ПІБ",
            age: "Вік",
            phone: "Телефон",
            email: "Email",
            ticket: "Номер квитка",
            date: "Дата реєстрації"
        }
    },

    workers: {
        title: "Працівники",
        columns: {
            name: "ПІБ",
            position: "Посада",
            age: "Вік",
            phone: "Телефон",
            experience: "Стаж",
            salary: "Зарплата"
        }
    }

};

// Ключ для localStorage
const STORAGE_KEY = "libraryData";

// Завантаження даних із браузера
function loadData() {

    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData !== null) {
            const parsedData = JSON.parse(savedData);

            if (
                parsedData &&
                Array.isArray(parsedData.books) &&
                Array.isArray(parsedData.readers) &&
                Array.isArray(parsedData.workers)
            ) {
                return parsedData;
            }
        }
    } catch (error) {
        console.error("Помилка читання даних:", error);
    }

    return structuredClone(initialData);
}

// Дані, з якими працює програма
let libraryData = loadData();

// Збереження даних у браузері
function saveData() {

    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(libraryData)
        );
    } catch (error) {
        console.error("Помилка збереження даних:", error);
    }

}

// Створення таблиці через JavaScript
function showTable(tableName) {

    const container = document.getElementById(
        "table-container"
    );

    const config = tableConfig[tableName];
    const data = libraryData[tableName];

    if (!config || !Array.isArray(data)) {
        return;
    }

    // Очищення попередньої таблиці
    container.replaceChildren();

    // Заголовок таблиці
    const heading = document.createElement("h2");
    heading.textContent = config.title;
    container.appendChild(heading);

    // Створення таблиці
    const table = document.createElement("table");

    // Створення заголовків стовпців
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const fields = Object.keys(config.columns);

    fields.forEach(function(field) {

        const th = document.createElement("th");

        th.textContent = config.columns[field];

        headerRow.appendChild(th);

    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Створення рядків із даними
    const tbody = document.createElement("tbody");

    data.forEach(function(item) {

        const row = document.createElement("tr");

        fields.forEach(function(field) {

            const cell = document.createElement("td");

            cell.textContent = item[field] ?? "";

            row.appendChild(cell);

        });

        tbody.appendChild(row);

    });

    table.appendChild(tbody);

    // Виведення таблиці на сторінку
    container.appendChild(table);

    // Підсвічування активної кнопки
    document.querySelectorAll("button[data-table]")
        .forEach(function(button) {

            button.classList.toggle(
                "active",
                button.dataset.table === tableName
            );

        });

}

// Підключення кнопок
document.querySelectorAll("button[data-table]")
    .forEach(function(button) {

        button.addEventListener("click", function() {

            showTable(button.dataset.table);

        });

    });

// Зберігаємо початкові дані, якщо сховище порожнє
if (localStorage.getItem(STORAGE_KEY) === null) {
    saveData();
}

// При відкритті сторінки показуємо книги
showTable("books");
