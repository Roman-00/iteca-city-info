window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	/*
		* Получаем елементы с html, и записываем их в переменные
	*/

	const tabHeader = document.querySelector('.tabheader'),
		tabHeaderItems = document.querySelector('.tabheader__items'),
		tabsContentContainer = document.querySelector('.tabcontent__container'),
		inputSearch = document.getElementById('inputSearch');

	/*
		* Создаем функцию getData которая получает данные с файла city.json
		! Ни в коем случае не менять параметры, и не удалять функцию
	*/

	const getData = async (url) => {

		const response = await fetch(url);

		if(!response.ok) {
			throw new Error(`Ошибка по адресу ${utl}, статус ошибки ${response.status} !`);
		}

		return await response.json();

	};

	/*
		* Сохдаем функцию "createCityList", которая нам сгенерирует список городов
	*/

	const createCityList = ({ id, title }) => {

		const cityList = `
			<div class="tabheader__item uk-button-primary tabheader__item_active" data_id="${id}">${title}</div>
			<!-- /.tabheader__item -->
		`;

		tabHeaderItems.insertAdjacentHTML('beforeend', cityList);
	};

	/*
		* Создаем функцию "createCityInfo" которая нам будет генерировать контент для городов
	*/

	const createCityInfo = ({ title, visa, permission, list, note }) => {

		const cityInfo = `
			<div class="tabcontent">
				<h3 class="tabcontent__title">
					${title}
				</h3>

				<div class="tabcontent__info--block">
					<div class="${visa ? 'tabcontent__info true' : "tabcontent__info false"}">
						${visa ? 'Visa Required' : "No Visa Required"}
					</div>
					<!-- /.tabcontent__info--visa -->
					<div class="${permission ? 'tabcontent__info true' : "tabcontent__info false"}">
						<a href="mailto:logistics@iteca.kz?subject=WE NEED PERMISSION FROM INTER-GOVERNMENTAL COMMISSION">
							${permission ? "Permission Required from Inter-Governmental Commission (IGC)" : "No Permission Required from Inter-Governmental Commission"}
						</a>
					</div>
					<!-- /.tabcontent__info--mvc -->
				</div>
				<!-- /.tabcontent__info--block -->
				<div class="${permission ? 'ask_done show' : 'ask_done hide'}">
					<a href="${permission ? 'mailto:logistics@iteca.kz' : '/'}" class="${permission ? 'ask__done--text' : 'ask__done--text'}">
						Ask Iteca Permission from IGC
					</a>
				</div>
				<ul class="tabcontent__info--list">
					${list.map(el => {
						return `<li class="tabcontent__info--item">
											<a target="_blank" class="${el.link ? 'tabcontent__info--item-link' : 'tabcontent__info--item-link no-link'}" href="${el.link}">${el.text}</a>
										</li>`}
						
					).join('')}
				</ul>
				<div class="${note ? 'note__block show' : 'note__block hide'}">
						<span class="note__block--title">${note ? 'PLEASE NOTE:' : ''}</span>
						<span class="note__block--text">${note ? 'During your stay, please have identification (copy of Passport), to enter public place' : ''}</span>
				<div>
			</div>
			<!-- /.tabcontent -->
		`;

		tabsContentContainer.insertAdjacentHTML('beforeend', cityInfo);
	};

	const init = () => {

		/*
			* Получаем список городов с файла city.json
		*/

		getData('https://onsite.iteca.kz/img/city/city-json-new.txt').then((data) => {
			data.forEach(createCityList);
			data.forEach(createCityInfo);

			const tabs = document.querySelectorAll('.tabheader__items .tabheader__item'),
				tabsContent = document.querySelectorAll('.tabcontent__container .tabcontent'),
				tabcontentInfoItem = document.querySelectorAll('.tabcontent__info--item-link');
				
			tabcontentInfoItem.forEach((el) => {
				let data = el.href.replace('https://foodexpo.kz/', '');
				el.setAttribute('href', data);
			});

			const hideTabContent = () => {
	
				tabsContent.forEach(item => {
					item.classList.add('hide');
					item.classList.remove('show');
				});
		
				tabs.forEach(item => {
					item.classList.remove('uk-button-primary', 'tabheader__item_active');
				});
			};

			const showTabContent = ( i = 0 ) => {

				tabsContent[i].classList.add('show');
				tabsContent[i].classList.remove('hide');
				tabs[i].classList.add('uk-button-primary', 'tabheader__item_active');

			};

			hideTabContent();
			showTabContent();

			tabHeader.addEventListener('click', (event) => {
			
				const target = event.target;

				if (target && target.classList.contains('tabheader__item')) {
					tabs.forEach((item, i) => {
						if (target == item) {
							hideTabContent();
							showTabContent(i);
						}
					});
				}

			});

			inputSearch.oninput = function () {
				let value = this.value.trim('');

				if(value != '') {
					tabs.forEach(el => {
						if(el.innerText.search(RegExp(value,"gi")) == -1) {
							el.classList.add('hide');
						}
					});
				} else {
					tabs.forEach(el => {
						el.classList.remove('hide');
					});
				}
			};
		});
	};

	init();

});