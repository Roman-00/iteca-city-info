document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    /*
        * Получаем блоки на сайте, для создания, и вложения ифнормации
        ! Ни в коем случае не удалять и не изменять название переменных 
    */
    const tabsContainer = document.querySelector('.tabscontainer'),
        tabheaderItems = document.querySelector('.tabheader__items');

    /*
        * Создаем тестовый массив данных для создания функционала 
    */

    const tabsDataInfo = [
        {
            id: "Qatar",
            title: "Qatar",
            visa: true,
            permission: true,
            list: [
            "Apply to kazakhstan embassy with Permission from mvk", 
            "Pcr test 72 hours", 
            "Ashyq app download Before flight"
            ]
        },
        {
            id: "Almaty",
            title: "Almaty",
            visa: true,
            permission: false,
            list: [
            "Pcr test 72 hours", 
            "Ashyq app download Before flight"
            ]
        },
        {
            id: "Шимкент",
            title: "Шимкент",
            visa: false,
            permission: true,
            list: [ 
            "Ashyq app download Before flight"
            ]
        }
    ];

    /*
        * Создаем функцию которая генерирует нам список городов. 
    */
    const createCityList = ( { id, title } ) => {

        /*
            * Создаем переменную "cityList" и ложим в него верстку наших городов
            * С помощью "insertAdjacentHTML" пушим верстку в контейнер "tabheaderItems"
        */

        const cityList = `
            <div class="tabheader__item tabheader__item_active" data_id="${id}">${title}</div>
            <!-- /.tabheader__item -->
        `;

        tabheaderItems.insertAdjacentHTML('beforeend', cityList);

    };

    const createCityListInfo = ( { title, visa, permission, list } ) => {

        let textVisa;
        let textPermission;

        if( visa == true ) {
            textVisa = "Visa Required";
        } else {
            textVisa = "";
        }

        if (permission == true) {
            textPermission = "Permission from mvk (Ask Iteca)";
        } else {
            textPermission = "";
        }

        const cityInfo = `
            <div class="tabcontent">
                <h2 class="tabscontent__city--name">
                    ${title}
                </h2>
                <div class="tabscontent__city--info">
                    <div class="tabscontent__city--visa">
                        ${textVisa}
                    </div>
                    <div class="tabscontent__city--permission">
                        ${textPermission}
                    </div>
                </div>
                <ul class="tabscontent__city--list">
                    ${list.map(item => `
                        <li>${item}</li>
                    `)}
                </ul>
            </div>
            <!-- /.tabcontent -->
        `;

        tabsContainer.insertAdjacentHTML('beforeend', cityInfo);

    };

    tabsDataInfo.forEach(createCityList);
    tabsDataInfo.forEach(createCityListInfo);

    const tabHeader = document.querySelector('.tabheader'), 
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabs = document.querySelectorAll('.tabheader__item');

    
    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };
    
    const showTabContent = ( i = 0 ) => {

        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

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


    
});