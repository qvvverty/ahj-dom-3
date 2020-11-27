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

function createFilmElem(filmObj) {
  const filmTr = document.createElement('tr');
  const filmParams = document.querySelector('.films').tHead.firstElementChild.children;
  for (const param of filmParams) {
    const paramTd = document.createElement('td');
    switch (param.textContent) {
      case 'year':
        paramTd.textContent = `(${filmObj[param.textContent]})`;
        break;
      case 'imdb':
        paramTd.textContent = `imdb: ${Number(filmObj[param.textContent]).toFixed(2)}`;
        break;
      default:
        paramTd.textContent = filmObj[param.textContent];
    }
    filmTr.append(paramTd);
  }
  return filmTr;
}

function renderFilms(filmData) {
  const filmsTBody = document.querySelector('.films').tBodies[0];
  filmsTBody.innerHTML = '';
  for (const filmObj of filmData) {
    filmsTBody.append(createFilmElem(filmObj));
  }
}

function sortFilms(filmData, attribute, descending = false) {
  const headColumns = document.querySelector('.films thead tr').children;
  for (const column of headColumns) {
    column.innerText = column.innerText.replace(/\s.*/, '');
  }

  const filmsArr = filmData.slice();

  if (attribute === 'title') {
    filmsArr.sort((a, b) => {
      if (a[attribute] < b[attribute]) return -1;
      if (a[attribute] > b[attribute]) return 1;
      return 1;
    });
  }
  if (attribute === 'id' || attribute === 'year' || attribute === 'imdb') {
    filmsArr.sort((a, b) => {
      if (+a[attribute] < +b[attribute]) return -1;
      if (+a[attribute] === +b[attribute]) return 0;
      return 1;
    });
  }

  if (descending) {
    filmsArr.reverse();
  }

  renderFilms(filmsArr);

  const sortColumn = document.getElementById(`film-${attribute}`);
  if (descending) {
    sortColumn.innerText += ' \u2193';
  } else {
    sortColumn.innerText += ' \u2191';
  }
}

const sortAttributes = [
  [films, 'id'],
  [films, 'id', true],
  [films, 'title'],
  [films, 'title', true],
  [films, 'year'],
  [films, 'year', true],
  [films, 'imdb'],
  [films, 'imdb', true],
];

renderFilms(films);

let i = 0;
setInterval(() => {
  sortFilms(...sortAttributes[i]);
  i += 1;
  if (i >= sortAttributes.length) i = 0;
}, 2000);
