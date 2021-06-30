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

	const createCityInfo = ({ title, visa, permission, list }) => {

		const cityInfo = `
			<div class="tabcontent">
				<h3 class="tabcontent__title">
					${title}
				</h3>

				<div class="tabcontent__info--block">
					<div class="${visa ? 'tabcontent__info false' : "tabcontent__info true"}">
						${visa ? "No Visa Required" : "Visa Required"}
					</div>
					<!-- /.tabcontent__info--visa -->
					<div class="${permission ? 'tabcontent__info false' : "tabcontent__info true"}">
						${permission ? "No Permission from MVK" : "Permission from MVK (ask Iteca)"}
					</div>
					<!-- /.tabcontent__info--mvc -->
				</div>
				<!-- /.tabcontent__info--block -->
				<ul class="tabcontent__info--list">
					${list.map(el => {
						return `<li class="tabcontent__info--item">
											<a href="#">${el}</a>
										</li>`}
						
					).join('')}
				</ul>
			</div>
			<!-- /.tabcontent -->
		`;

		tabsContentContainer.insertAdjacentHTML('beforeend', cityInfo);
	};

	const init = () => {

		/*
			* Получаем список городов с файла city.json
		*/

		getData('https://onsite.iteca.kz/img/city/city.txt').then((data) => {
			data.forEach(createCityList);
			data.forEach(createCityInfo);

			const tabs = document.querySelectorAll('.tabheader__items .tabheader__item'),
				tabsContent = document.querySelectorAll('.tabcontent__container .tabcontent');

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
						if(el.innerText.search(value) == -1) {
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