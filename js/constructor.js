 const constructPizza = () => {
	constructor.classList.add('active');

	//---------------Objects-----------------
	const ingredientsList = [{
		id: "classic",
		name: "Классический соус",
		price: "50",
	  },
	  {
		id: "georgian",
		name: "Грузинский соус",
		price: "55",
	  },
	  {
		id: "cheeseSous",
		name: "Сырный соус",
		price: "60",
	  },
	  {
		id: "mocarela",
		name: "Моцарелла",
		price: "15",
	  },
	  {
		id: "parmesan",
		name: "Пармезан",
		price: "15",
	  },
	  {
		id: "cheese",
		name: "Сыр",
		price: "15",
	  },
	  {
		id: "meat",
		name: "Ветчина",
		price: "20",
	  },
	  {
		id: "tomato",
		name: "Помидоры",
		price: "10",
	  },
	  {
		id: "mushrooms",
		name: "Грибы",
		price: "20",
	  }
	];

	const pizzaSize = [{
		id: "min",
		name: "Маленькая",
		price: "50"
	  },
	  {
		id: "mid",
		name: "Средняя",
		price: "60"
	  },
	  {
		id: "max",
		name: "Большая",
		price: "70"
	  }
	]
  
	const validationPattern = {
	  namePattern: /[А-Я][а-я]+\s[А-Я][а-я]+/,
	  emailPattern: /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/,
	  phonePattern: /\+38\(0\d{2}\)\d{3}-\d{2}-\d{2}/,
	  messageName: 'Имя и фамилия в формате Иванов Иван',
	  emailMessage: 'Почта в формате example@xxx.xx',
	  phoneMessage: 'Телефон в формате +38(0ХХ)ХХХ-ХХ-ХХ',
	  successMessage: 'Спасибо за заказ. Ожидайте звонка оператора'
	}
  
  
	const order = [{
		totalPrice: 60
	  },
	  {
		name: '',
		email: '',
		phone: ''
	  },
	  {
		name:'Средняя',
		price: '60'
	  }
	];
  
  
  
	//---------------Variables -----------------
	let name,
		email,
		phone,
		pattern;
  
	const ingredients = document.querySelectorAll('#ingredients img'),
		form = document.querySelector('.pizza__size form'),
		orderForm = document.querySelector('.order__block form'),
		pizza = document.querySelector('#pizza'),
		output = document.querySelector('output'),
		message = document.querySelector('#message'),
		table = document.querySelector('#order'),
		sendOrder = document.querySelector('#sendOrder'),
		cont = document.querySelector('#continue'),
		sizeName = document.querySelector("#sizeName"),
		sizePrice =  document.querySelector("#sizePrice");

	//Default -------
	
	output.innerHTML += order[0].totalPrice;
  
	sizeName.innerHTML = order[2].name;
	sizePrice.innerHTML = order[2].price + " грн";
  
  
	//Drag&Drop------
  
	const dragStart = function (e) {
  
	  setTimeout(() => {
		this.classList.add("hide");
		e.dataTransfer.setData("text", this.id);
		e.dataTransfer.effectAllowed = "copyMove";
  
	  }, 0);
  
	};
  
	const dragEnd = function (e) {
	  this.classList.remove("hide");
  
	};
  
	const dragOver = function (e) {
	  if (e.preventDefault) e.preventDefault();
	  return false;
	};
  
	const dragEnter = function () {
	  setTimeout(() => {
		this.style.position = "relative"
		this.classList.add("enter");
	  }, 0)
	};
  
	const dragLeave = function () {
	  this.classList.remove("enter");
	};
  
	const dragDrop = function (e) {
	  debugger
  
	  if (e.preventDefault) e.preventDefault();
	  if (e.stopPropagation) e.stopPropagation();
  
	  let id = e.dataTransfer.getData("text");
	  const img = document.createElement("img");
	  img.src = id;
	  this.appendChild(img);
	  img.setAttribute('draggable', false);
	  this.classList.remove("enter");
  
	  img.style.position = "absolute";
	  img.style.left = 0;
	  img.style.top = 0;
  
  
	  img.id = id
	  addToCart(img.id);
  
	  return false;
  
	};
  
	const addToCart = (ing) => {
	  let ingredientName,
	  	price;
  
	  for (let i = 0; i < ingredientsList.length; i++) {
		let matchId = new RegExp(ingredientsList[i].id);
  
		if (matchId.test(ing)) {
		
		  ingredientName = ingredientsList[i].name;
		  price = ingredientsList[i].price;
  
		  table.innerHTML += `<span>${ingredientName}: ${price} грн</span>`;
		  break;
		}
	  }
	  createOrder(ingredientName, price);
	}
  
  
	const createOrder = (ing, price) => {
	  debugger;
		let newItem = {};
		newItem.name = ing;
		newItem.price = price;
		order.push(newItem)
		
		let currentPrice = parseInt(newItem.price);
		order[0].totalPrice += currentPrice;
		 output.innerHTML = order[0].totalPrice;
	}
  
	const chooseSize = (e) => {
	  debugger;
	  let ingredientName;
	  let price;
	  for (let i = 0; i < pizzaSize.length; i++) {
  
		if (e.target.id == pizzaSize[i].id) {
  
		  ingredientName = pizzaSize[i].name;
		  price = pizzaSize[i].price;
  
		  document.querySelector("#sizeName").innerHTML = ingredientName;
		  document.querySelector("#sizePrice").innerHTML = price + " грн";
		  break;
		}
	  }
  
	  addSize(ingredientName, price);
	}
  
  
	const addSize = (ingredientName, price) => {
	  debugger; 
	  order[2].name = ingredientName;
	  order[2].price = price;
	  let currentPrice = +price;
	  order[0].totalPrice = currentPrice;
	  output.innerHTML = order[0].totalPrice;
	}
  
  
  
	//----------------OrderForm------------------------
  
	const sendToLS = (e) => {
	  debugger;
  
	  //проверить и если true отправить
	  e.preventDefault();
	  localStorage.setItem(order, JSON.stringify(order));
	  let data = JSON.parse(localStorage.getItem(order));
	  console.log(data)
	  message.innerHTML = validationPattern.successMessage;
	}
  
	const goToCForm = () => {
	  document.querySelector('.order__form.order').classList.remove('active');
	  document.querySelector('.order__form.contact').classList.add('active');
	}
  
  
	const validateForm = (e) => {
	  debugger
  
	  if (e.target.id === 'name') {
		pattern = new RegExp(validationPattern.namePattern);
		name = pattern.test(e.target.value);
		if (!name) {
		  message.innerHTML = validationPattern.messageName
		} else {
		  message.innerHTML = '';
		  order[1].name = e.target.value;
		}
	  } else if (e.target.id === 'email') {
  
		pattern = new RegExp(validationPattern.emailPattern);
		email = pattern.test(e.target.value);
		if (!email) {
		  message.innerHTML = validationPattern.emailMessage
		} else {
		  message.innerHTML = '';
		  order[1].email = e.target.value;
		}
	  } else if (e.target.id === 'tel') {
		pattern = new RegExp(validationPattern.phonePattern);
		phone = pattern.test(e.target.value);
		if (!phone) {
		  message.innerHTML = validationPattern.phoneMessage;
		} else {
		  message.innerHTML = '';
		  order[1].phone = e.target.value;
		}
	  }
  
	  if (name && email && phone && order[0].totalPrice !== 0) {
		sendOrder.removeAttribute('disabled');
	  }
  
	}
  
	//-------------EventListeners-------------------------
  
	//Forms 
	orderForm.addEventListener('input', validateForm)
	form.addEventListener('change', chooseSize);
	sendOrder.addEventListener('click', sendToLS, false);
	cont.addEventListener('click', goToCForm, false);

  
  
	//DragAndDrop
	pizza.addEventListener('dragover', dragOver, false);
	pizza.addEventListener('dragenter', dragEnter, false);
	pizza.addEventListener('dragleave', dragLeave, false);
	pizza.addEventListener('drop', dragDrop, false);
  
	for (let i = 0; i < ingredients.length; i++) {
	  ingredients[i].addEventListener("dragstart", dragStart, false);
	  ingredients[i].addEventListener("dragend", dragEnd, false);
	}
  }


  export default 
