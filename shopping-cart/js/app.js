//Todas las variables primero
const shoppingCart = document.querySelector('#carrito');
const coursesList = document.querySelector('#lista-cursos');
const shoppingCartContainer = document.querySelector('#lista-carrito tbody');
const clearShoppingCart = document.querySelector('#vaciar-carrito');
let shoppingArticles = [];

eventListeners();
function eventListeners() {
  coursesList.addEventListener('click', addCourse);
  shoppingCart.addEventListener('click', deleteCourse);
  clearShoppingCart.addEventListener('click', cleanShoppingCart);
}

function addCourse(event) {
  event.preventDefault();
  if(event.target.classList.contains('agregar-carrito')) {
    const course = event.target.parentElement.parentElement;
    readData(course);
  }
}

function readData(course) {
  const infoCourse = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.precio span').textContent,
    id: course.querySelector('a').getAttribute('data-id'),
    quantity: 1
  }
  //Tenemos que controlar que el elemento ya esté dentro de la array
  if(shoppingArticles.some(article => article.id === infoCourse.id)) {
    //Crear una nueva array con map
    const courses = shoppingArticles.map(article => {
      //Controlar que el artículo sea el que queremos modificar
      if(article.id === infoCourse.id) {
        article.quantity++;
        //Obligatorio retornar dentro de un map
        return article;
      } else {
        //Retornamos tal y como está, sin modificarlo
        return article;
      }
    });
    //Copia de cursos al array de artículos en el carrito
    shoppingArticles = [...courses];
  } else {
    shoppingArticles = [...shoppingArticles, infoCourse]
  }
  //Crear función que lea la array y lo muestren el dom
  showShoppingCart();
}

function showShoppingCart() {
  cleanShoppingCart();
  shoppingArticles.forEach(article => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${article.image}" />
      </td>
      <td>${article.title}</td>
      <td>${article.price}</td>
      <td>${article.quantity}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${article.id}">X</a>
      </td>
    `;
    shoppingCartContainer.append(row);
  })
}

function deleteCourse(event) {
  event.preventDefault();
  if(event.target.classList.contains('borrar-curso')) {
    const courseId = event.target.getAttribute('data-id');
    shoppingArticles = shoppingArticles.filter(article => article.id !== courseId);
    showShoppingCart();
  }
}

function cleanShoppingCart() {
  while(shoppingCartContainer.firstChild) {
    shoppingCartContainer.removeChild(shoppingCartContainer.firstChild);
  }
}