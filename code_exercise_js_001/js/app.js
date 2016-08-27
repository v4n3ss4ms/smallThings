// Fake data. It should get from AJAX
var products = [{
    "id": "A101",
    "description": "Screwdriver",
    "category": "1",
    "price": "9.75"
  },
  {
    "id": "A102",
    "description": "Electric screwdriver",
    "category": "1",
    "price": "49.50"
  },
  {
    "id": "B101",
    "description": "Basic on-off switch",
    "category": "2",
    "price": "4.99"
  },
  {
    "id": "B102",
    "description": "Press button",
    "category": "2",
    "price": "4.99"
  },
  {
    "id": "B103",
    "description": "Switch with motion detector",
    "category": "2",
    "price": "12.95"
  }];
var customers = [{
    "id": "1",
    "name": "Coca Cola",
    "since": "2014-06-28",
    "revenue": "492.12"
  },
  {
    "id": "2",
    "name": "Teamleader",
    "since": "2015-01-15",
    "revenue": "1505.95"
  },
  {
    "id": "3",
    "name": "Jeroen De Wit",
    "since": "2016-02-11",
    "revenue": "0.00"
  }];
var compiledCustomersTemplate = _.template($('#customersTemplate').html()),
    compiledProductsTemplate = _.template($('#productsTemplate').html()),
    compiledBasketTemplate = _.template($('#basketTemplate').html()),
    $prodWrapper = $('.products_wrapper'),
    $prodListCont = $('.products_list'),
    total,
    basket = [],
    order = [];


var add_item = function (item) {
  var inBasket = itemInBasket(item.id);
  if (inBasket) {
    ++basket[inBasket].quantity;
  } else {
    first_item(item);
  }
};

var del_item = function (itemId) {
  var inBasket = itemInBasket(itemId);
  basket.splice(inBasket, 1);
};

var calculateTotal = function () {
  total = 0;
  for (var index in basket) {
    basket[index].total = Math.floor((basket[index].quantity * basket[index].price)*100)/100;
    total += basket[index].total;
  }
};

var itemInBasket = function (itemId) {
  for (var index in basket) {
    if (basket[index].id === itemId){
      return index;
    }
  }
  return false;
};

var first_item = function (item) {
  item.quantity = 1;
  basket.push(item);
};

var renderProductsList = function (isEmpty)  {
  isEmpty = isEmpty || false;
  if (isEmpty) {
    $('#basket').empty();
  } else {
    $('#basket').html(compiledBasketTemplate(basket));
  }
};


var buy_now = function (customerIndex) {
  var order = {};
  order['id']= customers[customerIndex].id;
  order['customer-id'] = customers[customerIndex].id;
  order['items'] = basket;
  order['total'] = total;
  $.ajax({
    method: 'POST',
    url: 'server.html',
    dataType   : 'json',
    contentType: 'application/json; charset=UTF-8',
    data: order
  })
  .done(function() {
    $('.modal_view').toggleClass('hidden');
    $('.order_ok').toggleClass('hidden');
  })
  .fail(function() {
    $('.modal_view').toggleClass('hidden');
    $('.order_ko').toggleClass('hidden');
  });
};


$('#customers').append(compiledCustomersTemplate(customers));
$('#products').append(compiledProductsTemplate(products));

$('.add_item').on('click', function () {
  var itemId = $('#productsList option:selected').attr('data-id'),
      item = products[itemId];
  basket.length > 0 ? add_item(item) : first_item(item);
  calculateTotal();
  renderProductsList();
});

$('#basket').on('click', '.del_item', function () {
  var itemId = $(this).attr('data-id'),
      isEmpty;
  del_item(itemId);
  isEmpty = basket.length > 0 ? false : true;
  calculateTotal();
  renderProductsList(isEmpty);
});

$('#basket').on('click', '.buy_now', function () {
  var customerId = $('#customersList option:selected').attr('data-index');
  if (customerId < 0) {
    $('.customer_list').addClass('error');
    $('.customer_error').removeClass('hidden');
    return;
  } else {
    $('.customer_list').removeClass('error');
    $('.customer_error').addClass('hidden');
    buy_now(customerId);
  }
});
