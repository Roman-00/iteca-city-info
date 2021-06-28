window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	/*
		* Получаем елементы с html, и записываем их в переменные
	*/

	const tabsContainer = document.querySelector('.tabscontainer'),
		tabHeader = document.querySelector('.tabheader'),
		tabHeaderItems = document.querySelector('.tabheader__items'),
		tabsContentContainer = document.querySelector('.tabcontent__container');

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
			<div class="tabheader__item tabheader__item_active" data_id="${id}">${title}</div>
			<!-- /.tabheader__item -->
		`;

		tabHeaderItems.insertAdjacentHTML('beforeend', cityList);
	};

	/*
		* Создаем функцию "createCityInfo" которая нам будет генерировать контент для городов
	*/

	const createCityInfo = ({ title, visa, permission, list }) => {

		/*
			* Создаем переменные "textVisa" и "textPermission" и записываем текст в зависимости от условия
		*/

		let textVisa;
		let textPermission;

		if( visa === true) {
			textVisa = "Visa Required";
		} else {
			textVisa = "No Visa Required"
		}

		if( permission === true ) {
			textPermission = "Permission from MVK (ask Iteca)";
		} else {
			textPermission = "No Permission from MVK"
		}

		const cityInfo = `
			<div class="tabcontent">
				<h3 class="tabcontent__title">
					${title}
				</h3>

				<div class="tabcontent__info--block">
					<div class="tabcontent__info">
						${textVisa}
					</div>
					<!-- /.tabcontent__info--visa -->
					<div class="tabcontent__info">
						${textPermission}
					</div>
					<!-- /.tabcontent__info--mvc -->
				</div>
				<!-- /.tabcontent__info--block -->
				<ul class="tabcontent__info--list">
					${list.map(el => {
						console.log(el);
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

	/*
		* Создаем функцию которая изначально скрывает контент
	*/

	const hideTabContent = (tabs, tabsContent) => {
		tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	};

	const showTabContent = ( tabs, tabsContent, i = 0) => {

        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

    };

	const init = () => {

		/*
			* Получаем список городов с файла city.json
		*/

		getData('../city.json').then((data) => {
			console.log('data', data);
			data.forEach(createCityList);
			data.forEach(createCityInfo);

			const tabs = document.querySelectorAll('.tabheader__item'),
				tabsContent = document.querySelectorAll('.tabcontent');
			
			hideTabContent(tabs, tabsContent);
			showTabContent(tabs, tabsContent);
		});

	};

	init();

});