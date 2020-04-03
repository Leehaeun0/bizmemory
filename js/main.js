let cardList = [];
let favCardList = [];

const $newInfo = document.querySelector('.newInfo');
const $submitBtn = document.querySelector('.submitBtn');

const $cardList = document.querySelector('.cardList');
const $sortList = document.querySelector('.sortList');

const $favList = document.querySelector('.favList');
const $favTitle = document.querySelector('.favTitle');

const $newName = document.querySelector('.newName');
const $newEmail = document.querySelector('.newEmail');
const $newMobile = document.querySelector('.newMobile');

const $modal = document.querySelector('.modal');
const $warningMsg = document.querySelector('.warningMsg');
const $warningClose = document.querySelector('.warningClose');

const checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const checkMobile = /^\d{3}-\d{3,4}-\d{4}$/;
const checkName = /../;

const render = key => {
  let html = '';
  let favHtml = '';
  const isFav = [...cardList.filter(card => card.favorite), ...favCardList.filter(card => card.favorite)];
  const isNotFav = [...cardList.filter(card => !card.favorite), ...favCardList.filter(card => !card.favorite)];

  cardList = isNotFav;
  favCardList = isFav;

  const sortBy = key => {
    const sortById = cardList.sort((card1, card2) => (card1[key] < card2[key] ? 1 : (card1[key] > card2[key] ? -1 : 0)));
    const sortByElse = cardList.sort((card1, card2) => (card1[key] > card2[key] ? 1 : (card1[key] < card2[key] ? -1 : 0)));
    return key === 'id' ? sortById : sortByElse;
  };

  sortBy(key);

  cardList.forEach(card => {
    html += `<li id="${card.id}" class="namecard color${card.color}">
          <div class="namecardInfo">
            <span class="cardName">${card.name}</span>
            <span class="cardMobile">${card.mobile}</span>
            <span class="cardEmail">${card.email}</span>
          </div>
          <div class="namecardCompany">
            <span class="cardCompany">${card.company}</span>
            <span class="cardDivision">${card.division}</span>
            <span class="cardPosition">${card.position}</span>
          </div>
          <img class="favoriteBtn fas" src="./img/fav-icon.png">
          <img class="deleteBtn" src="./img/close-btn.png">
        </li>`;
  });

  favCardList.forEach(card => {
    favHtml += `<li id="${card.id}" class="namecard color${card.color}">
          <div class="namecardInfo">
            <span class="cardName">${card.name}</span>
            <span class="cardMobile">${card.mobile}</span>
            <span class="cardEmail">${card.email}</span>
          </div>
          <div class="namecardCompany">
            <span class="cardCompany">${card.company}</span>
            <span class="cardDivision">${card.division}</span>
            <span class="cardPosition">${card.position}</span>
          </div>
          <img class="favoriteBtn far" src="./img/fav-icon-on.png">
          <img class="deleteBtn" src="./img/close-btn.png">
        </li>`;
  });

  $favTitle.style.display = favCardList.length ? 'block' : 'none';

  $cardList.innerHTML = html;
  $favList.innerHTML = favHtml;
};

const getCardList = () => {
  cardList = [{
    id: 1,
    name: '이하은',
    company: '카카오뱅크',
    division: '앱 개발팀',
    position: '대리',
    email: 'daidy@naver.com',
    mobile: '010-5067-5111',
    color: 'namecard color1',
    favorite: true,
  },
  {
    id: 2,
    name: '김우정',
    company: '토스',
    division: '인재 개발팀',
    position: '선임',
    email: 'tj123y@naver.com',
    mobile: '010-2344-3453',
    color: 'namecard color2',
    favorite: false,
  }];

  favCardList = [{
    id: 3,
    name: '송승은',
    company: '라인',
    division: '경영지원팀',
    position: '과장',
    email: 'wj456@naver.com',
    mobile: '010-2535-4985',
    color: 'namecard color3',
    favorite: true,
  },
  {
    id: 4,
    name: '김태진',
    company: '에어비앤비',
    division: 'UX디자인팀',
    position: '책임',
    email: 'se7890@naver.com',
    mobile: '010-2355-2455',
    color: 'namecard color4',
    favorite: true,
  }];
  render();
};

const generateId = () => {
  return cardList.length ? Math.max(...cardList.map(card => card.id)) + 1 : 1;
};

window.onload = getCardList;


const generateColor = () => {
  const colorNumber = generateId();
  return colorNumber % 4;
};

$newName.onblur = e => {
  e.target.nextElementSibling.style.display = checkName.test(e.target.value) ? 'none' : 'block';
};

$newEmail.onblur = e => {
  e.target.nextElementSibling.style.display = checkEmail.test(e.target.value) ? 'none' : 'block';
};

$newMobile.onblur = e => {
  e.target.nextElementSibling.style.display = checkMobile.test(e.target.value) ? 'none' : 'block';
};

$submitBtn.onclick = () => {

  let inputs = [...$newInfo.children].filter(child => child.nodeName === 'INPUT');
  let newValues = inputs.map(input => input.value.trim());

  if (newValues.filter(value => value.length === 0).length !== 0) {

    $modal.style.display = 'block';

    if (!newValues[0]) {
      $warningMsg.textContent = '이름을 입력해 주세요';
      return;
    } if (!newValues[1]) {
      $warningMsg.textContent = '회사를 입력해 주세요';
      return;
    } if (!newValues[2]) {
      $warningMsg.textContent = '부서를 입력해 주세요';
      return;
    } if (!newValues[3]) {
      $warningMsg.textContent = '직급을 입력해 주세요';
      return;
    } if (!newValues[4]) {
      $warningMsg.textContent = '이메일을 입력해 주세요';
      return;
    } if (!newValues[5]) {
      $warningMsg.textContent = '핸드폰 번호를 입력해 주세요';
      return;
    }
    return;
  }

  // if (newValues.filter(value => value.length === 0).length !== 0) {
  //   // alert('빈칸을 채워주세요!');
  //   // console.log(newValues[0]);
  //   $modal.style.display = 'block';

  //   let warningMsg = '';

  //   inputs.forEach((input, i, arr) => {

  //     // const warningMsgs = ['이름', '회사', '부서', '직급', '이메일', '핸드폰 번호'];
  //     const warningMsgs = ['핸드폰 번호', '이메일', '직급', '부서', '회사', '이름'];
  //     // if (!input.value) {
  //     //   if (warningMsgs[i] === input[i]) {
  //     //     warningMsg = `${warningMsgs[i]}`;
  //     //     // return;
  //     //   }
  //     // }
  //     if (!input.value) warningMsg = warningMsgs[i] === inputs[i] ? 1 : `${warningMsgs[i]}`;
  //     // if (!input.value) warningMsg = warningMsgs[i];
  //     // if (!input.value) {
  //     //   warningMsg = warningMsgs[i] === input[i] ? 1 : `${warningMsgs[i]}`;
  //     //   return;
  //     // }
  //   });
  //   $warningMsg.textContent = `${warningMsg}를 입력해 주세요`;
  //   // });

  //   return;
  // }


  if (!checkName.test(newValues[0]) || !checkEmail.test(newValues[4]) || !checkMobile.test(newValues[5])) return;
  const [name, company, division, position, email, mobile] = newValues;

  cardList = [...cardList, {
    id: generateId(),
    name,
    company,
    division,
    position,
    email,
    mobile,
    favorite: false,
    color: generateColor()
  }];

  render('id');

  inputs.forEach(input => {
    input.value = '';
  });
};

// close modal event

$warningClose.onclick = e => {
  e.target.parentNode.parentNode.style.display = 'none';
};

// Delete Button event

$cardList.onclick = e => {
  const {
    id
  } = e.target.parentNode;
  if (!e.target.matches('.cardList > .namecard > img.deleteBtn')) return;
  cardList = cardList.filter(card => card.id !== +id);
  render();
};

$favList.onclick = e => {
  const {
    id
  } = e.target.parentNode;
  if (!e.target.matches('.favList > .namecard > img.deleteBtn')) return;
  favCardList = favCardList.filter(card => card.id !== +id);
  render();
};

// favorite event

const toFavList = target => {
  if (!target.matches('.cardList > li > img.favoriteBtn')) return;

  let id = target.parentNode.id;

  cardList = cardList.map(card => (card.id === +id ? {
    ...card,
    favorite: !card.favorite
  } : card));

  render('id');
};

const fromFavList = target => {
  if (!target.matches('.favList > li > img.favoriteBtn')) return;

  let id = target.parentNode.id;

  favCardList = favCardList.map(card => (card.id === +id ? {
    ...card,
    favorite: !card.favorite
  } : card));

  render('id');
};

$cardList.addEventListener('click', ({
  target
}) => toFavList(target));

$favList.addEventListener('click', ({
  target
}) => fromFavList(target));


// Sort Button event
$sortList.onclick = e => {
  if (e.target.matches('.sortWrapper > .sortList > .sortName')) {
    cardList = cardList.sort((card1, card2) => (card1.name > card2.name ? 1 : card1.name < card2.name ? -1 : 0));
  }
  if (e.target.matches('.sortWrapper > .sortList > .sortCompany')) {
    cardList = cardList.sort((co1, co2) => ((co1.company > co2.company) ? 1 : co1.company < co2.company ? -1 : 0));
  }
  if (e.target.matches('.sortWrapper > .sortList > .sortRecent')) {
    cardList = cardList.sort((recent1, recent2) => ((recent1.id > recent2.id) ? 1 : recent1.id < recent2.id ? -1 : 0));
  }
  render();
};
