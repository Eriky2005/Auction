(()=>{"use strict";var e=document.querySelector(".header__search-input"),t=document.querySelector(".header__search-button");e.addEventListener("input",(function(){var t=document.querySelectorAll(".card"),o=e.value.toLowerCase();t.forEach((function(e){e.querySelector(".card__title").textContent.toLowerCase().includes(o)?e.style.display="block":e.style.display="none"}))})),t.addEventListener("click",(function(t){t.preventDefault(),e.focus()}));var o=document.querySelectorAll(".card__button");o.forEach((function(e){e.addEventListener("click",(function(){var t=e.closest(".card").dataset.id;e.classList.contains("in-cart")?(e.classList.add("processing"),e.textContent="🔄Обработка...",e.classList.remove("in-cart"),setTimeout((function(){e.classList.remove("processing"),e.classList.remove("button"),e.textContent="Купить",localStorage.removeItem(t)}),2e3)):(e.classList.add("processing"),e.textContent="🔄Обработка...",e.classList.remove("button"),setTimeout((function(){e.classList.remove("processing"),e.classList.add("in-cart"),e.textContent="✔️ В корзине",localStorage.setItem(t,"in-cart")}),2e3))}))})),o.forEach((function(e){var t=e.closest(".card").dataset.id;"in-cart"===localStorage.getItem(t)&&(e.classList.add("in-cart"),e.textContent="✔️ В корзине")}));var c=document.getElementById("popup"),n=document.querySelector(".popup__close"),r=document.querySelector(".popup__title"),i=document.querySelector(".popup__description"),a=document.querySelector(".popup__text-ordinary"),s=document.querySelector(".popup__text-strike"),l=document.getElementById("sliderImage"),d=document.querySelector(".prev"),u=document.querySelector(".next"),m={1:{title:"«Рождение Венеры» Сандро Боттичелли",description:"«Рождение Венеры» — это картина итальянского художника Сандро Боттичелли, которую он завершил приблизительно к 1485 году.",price:"1 000 000 $",oldPrice:"2 000 000 $",images:["image1","image11","image12"]},2:{title:"«Тайная вечеря» Леонардо да Винчи",description:"«Тайная вечеря» — это одна из самых известных картин Леонардо да Винчи.",price:"3 000 000 $",oldPrice:"",images:["image2","image21","image22"]},3:{title:"«Сотворение Адама» Микеланджело",description:"«Сотворение Адама» — это фреска, написанная Микеланджело.",price:"5 000 000 $",oldPrice:"6 000 000 $",images:["image3","image31","image32"]}},p=0,g=null;function v(e){var t=m[e];r.textContent=t.title,i.textContent=t.description,a.textContent=t.price,s.textContent=t.oldPrice,g=e,p=0,l.src=t.images[p],l.alt=t.title,c.classList.add("show"),localStorage.setItem("popupOpen",e)}document.querySelectorAll(".card__title, .card__image").forEach((function(e){e.addEventListener("click",(function(e){var t=e.target.closest(".card");t&&v(t.dataset.id)}))})),d.addEventListener("click",(function(){var e=m[g];p=p>0?p-1:e.images.length-1,l.src=e.images[p]})),u.addEventListener("click",(function(){var e=m[g];p=p<e.images.length-1?p+1:0,l.src=e.images[p]})),n.addEventListener("click",(function(){c.classList.remove("show"),localStorage.removeItem("popupOpen")})),c.addEventListener("click",(function(e){e.target===c&&(c.classList.remove("show"),localStorage.removeItem("popupOpen"))})),document.addEventListener("keydown",(function(e){"Escape"===e.key&&(c.classList.remove("show"),localStorage.removeItem("popupOpen"))})),window.addEventListener("load",(function(){var e=localStorage.getItem("popupOpen");e&&v(e)}))})();