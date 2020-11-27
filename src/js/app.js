const films = JSON.parse(`
  [
    {
      "id": 26,
      "title": "Побег из Шоушенка",
      "imdb": 9.30,
      "year": 1994
    },
    {
      "id": 25,
      "title": "Крёстный отец",
      "imdb": 9.20,
      "year": 1972
    },
    {
      "id": 27,
      "title": "Крёстный отец 2",
      "imdb": 9.00,
      "year": 1974
    },
    {
      "id": 1047,
      "title": "Тёмный рыцарь",
      "imdb": 9.00,
      "year": 2008
    },
    {
      "id": 223,
      "title": "Криминальное чтиво",
      "imdb": 8.90,
      "year": 1994
    }
  ]
`);

function fillFilmElem(filmElem) {
  const filmParams = document.querySelector('.films').tHead.firstElementChild.children;
  for (const param of filmParams) {
    const paramTd = document.createElement('td');
    switch (param.textContent) {
      case 'year':
        paramTd.textContent = `(${filmElem.dataset[param.textContent]})`;
        break;
      case 'imdb':
        paramTd.textContent = `imdb: ${Number(filmElem.dataset[param.textContent]).toFixed(2)}`;
        break;
      default:
        paramTd.textContent = filmElem.dataset[param.textContent];
    }
    filmElem.append(paramTd);
  }
}

function renderFilms(filmData) {
  const filmTable = document.querySelector('.films').tBodies[0];
  for (const film of filmData) {
    const filmElem = document.createElement('tr');
    // eslint-disable-next-line guard-for-in
    for (const filmParam in film) {
      filmElem.dataset[filmParam] = film[filmParam];
    }
    fillFilmElem(filmElem);
    filmTable.append(filmElem);
  }
}

function sortFilms(attribute, descending = false) {
  const headColumns = document.querySelector('.films thead tr').children;
  for (const column of headColumns) {
    column.innerText = column.innerText.replace(/\s.*/, '');
  }

  const filmsCollection = document.querySelector('.films').tBodies[0].children;
  const filmsArr = Array.from(filmsCollection);

  if (attribute === 'title') {
    filmsArr.sort((a, b) => {
      if (a.dataset[attribute] < b.dataset[attribute]) return -1;
      if (a.dataset[attribute] > b.dataset[attribute]) return 1;
      return 1;
    });
  }
  if (attribute === 'id' || attribute === 'year' || attribute === 'imdb') {
    filmsArr.sort((a, b) => {
      if (+a.dataset[attribute] < +b.dataset[attribute]) return -1;
      if (+a.dataset[attribute] === +b.dataset[attribute]) return 0;
      return 1;
    });
  }

  if (descending) {
    filmsArr.reverse();
  }

  for (let i = 0; i < filmsArr.length; i += 1) {
    if (filmsArr[i] !== filmsCollection[i]) {
      filmsCollection[i].before(filmsArr[i]);
    }
  }

  const sortColumn = document.getElementById(`film-${attribute}`);
  if (descending) {
    sortColumn.innerText += ' \u2193';
  } else {
    sortColumn.innerText += ' \u2191';
  }
}

const sortAttributes = [
  ['id'],
  ['id', true],
  ['title'],
  ['title', true],
  ['year'],
  ['year', true],
  ['imdb'],
  ['imdb', true],
];

renderFilms(films);

let i = 0;
setInterval(() => {
  sortFilms(...sortAttributes[i]);
  i += 1;
  if (i >= sortAttributes.length) i = 0;
}, 2000);
