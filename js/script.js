'use strict'

$('.main_btn').on("click", function (e) {
    e.preventDefault();
});

$('a').on("click", function (e) {
    e.preventDefault();
});

$('.swipe_btn').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 500);
    return false;
});

$('a[href*="#"]').on('click', function (e) {
    $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top + 3
    }, 1200);
});

$(".header_card_link").on("click", function (e) {
    e.preventDefault();
    $(".basket_drop").fadeToggle();
});

$(document).on('scroll', function () {
    var scrollBtn = $(this).scrollTop();

    if (scrollBtn >= 120) {
        $(".header_card").addClass("fixed");
        $(".header").addClass("fixed");
        $(".header_card").addClass("fixed");
    } else {
        $(".header_card").removeClass("fixed");
        $(".header").removeClass("fixed");
        $(".header_card").removeClass("fixed");
    }

    if (scrollBtn >= 500) {
        $(".swipe_btn").fadeIn(400);
    } else {
        $(".swipe_btn").fadeOut(400);
    }
});

AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 100, // offset (in px) from the original trigger point
    delay: 3, // values from 0 to 3000, with step 50ms
    duration: 1500, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation

});

$(window).scroll(function () {
    var st = $(this).scrollTop();
    $(".about_content_dish").css({
        "transform": "translate(0%, - " +
            st / 80 + "%)"
    });
});

//var json = new XMLHttpRequest();
//json.open('GET', 'basket.json', true);
//json.send();
//json.onreadystatechange = function () {
//    if (json.readyState === 4 && json.status === 200) {
//        console.log("state = 4");
//
//        var basketCard = JSON.parse(json.responseText);
//
//}
//else {
//    console.log("status is not 4");
//}
//}

var amount = 0;
$(".price span").text(+amount.toFixed(2));

////////////////////////////////////////////


var basket_area = $(".basket_item_area");
var select_dishes_area = $("#select_dishes");
var countGoods = 0;
var cardItems = [];
var select_dishes_item = "";
basket_area.append("<p class = 'basket_empty'>Корзина пуста</p>");
$(".price span").text(+amount.toFixed(2));

var renderItemList = function (count) {
    basket_area.empty();
    select_dishes_area.empty();

    var select_dishes_item = "";
    var index = 0;
    if (cardItems.length > 5) {
        $(".basket_item_area").css({
            "height": "270px",
            "overflow": "scroll",
            "overflow-x": "hidden"
        });
    } else {
        $(".basket_item_area").css({
            "height": "auto",
            "overflow": "hidden",
            "overflow-x": "hidden"
        });
    }
    select_dishes_area.empty();
    for (var itemKey of cardItems) {
        var basket_item = $("<div/>", {
            class: "basket_item",
            id: itemKey.id
        });

        select_dishes_item += itemKey.title + " " + itemKey.count + "  ";

        var basket_item_title = "<h4 class = 'basket_item_title'>" + itemKey.title + "</h4>";

        var basket_item_price = "<p class='basket_item_price'><span class='basket_item_count'>" + itemKey.count + "</span> x <span class = 'basket_item_price4one'>" +
            (itemKey.priceOne).toFixed(2) + "</span></p>";
        var delete_btn = "<a href=' ' class = 'basket_item_delete' data-index = " + index + " id = '" + itemKey.id + "'><i class='fas fa-times-circle basket_item_remove'></i></a>";

        $(".price span").empty();
        $(".price span").text(+amount.toFixed(2));
        index++;

        select_dishes_area.append(select_dishes_item);
        select_dishes_area.attr("value", select_dishes_item);
        basket_item.append(basket_item_title);
        basket_item.append(basket_item_price);
        basket_item.append(delete_btn);
        basket_area.append(basket_item);
    }
};

var idNot = 0;
var add = function (id, title, price) {
    var id = id;
    var title = title;
    var price = price;
    var priceOne = price;
    var count = 1;
    var idItems = [];

    idItems.push(id);

    var basketItem = {
        "id": id,
        "title": title,
        "price": price,
        "priceOne": price,
        "count": 1
    };
    for (var i = 0; i < cardItems.length; i++) {
        if (cardItems[i].id === id) {
            basketItem.count = cardItems[i].count;
            basketItem.price = cardItems[i].priceOne;
            basketItem.priceOne += basketItem.price;
            basketItem.count++;
            cardItems.splice(i, 1);
        }
    }
    countGoods++;
    amount += price;
    cardItems.push(basketItem);
    renderItemList();

    idNot = Math.floor(Math.random() * 5000);
    addNot(idNot, title);
    $("#added-" + idNot).fadeOut(2000);

    if (cardItems.length > 0) {
        $(".basket_empty").remove();
    }

};

var delete_product = function (index) {
    countGoods--;
    amount -= parseFloat(cardItems[index].priceOne);
    cardItems.splice(index, 1);
    refresh();
    if (cardItems.length == 0) {
        basket_area.append("<p class = 'basket_empty'>Корзина пуста</p>");
    }
};

var refresh = function () {
    basket_area.empty();
    $(".price span").empty(); //Очищаем содержимое контейнера
    $(".price span").text(+amount.toFixed(2));
    renderItemList();
};

var addNotarea = $("<ul/>", {
    class: "addNot_list"
});

var addNotItems = [];

var addNot = function (id, title) {
    var id = id;
    var title = title;

    var addNotItem = {
        "id": id,
        "title": title
    }

    var addNotarea_item = $("<li/>", {
        class: "addNot_list_item",
        id: "added-" + id
    });

    var addedProduct = $("<div/>", {
        class: "addedProduct"
    });

    var addedProductText = $("<p/>", {
        class: "addedProductText",
        id: "added-text-" + id,
        text: "Added: " + title
    });

    addNotItems.push(addNotItem);

    addedProduct.append(addedProductText);
    addNotarea_item.append(addedProduct);
    addNotarea.append(addNotarea_item);
    $("body").append(addNotarea);
};


///////////////////////////////////////


$(".rmenu_content_item_btn").on("click", function () {
    var product_id = parseInt($(this).attr('data-id'));
    var title;
    var price;

    for (var key of basketCard.basket) {
        if (parseInt(key.id) == product_id) {
            title = key.title;
            price = parseFloat(key.price);
        }
    }
    add(product_id, title, price);
});

$('.basket_item_area').on('click', '.basket_item_delete', function (e) {
    e.preventDefault();
    delete_product(+$(this).data("index"));
});


////////////////////////////////////////////////

$(".contact_content_form_input_table").on("click", function () {
    $(".choose_table").fadeToggle(700);
});

var contact_input_area = $(".contact_content_form_inputArea");

$('#contact_content_form_type').on("click", function () {
    $('#contact_content_form_type option').each(function () {
        if ($(this).prop('selected') == true) {
            console.log("selec0");
            if ($(this).text() == "Delivery") {
                $(".contact_content_form_item_table").remove();
                $(".contact_content_form_item_delivery").remove();
                var new_input = $("<div/>", {
                    class: "contact_content_form_item contact_content_form_item_delivery",
                    html: "<label for='contact_content_form_address'>Address</label><input type='tel' id='contact_content_form_address' class='contact_content_form_input contact_content_form_name' placeholder=' delivery address '>"
                });
            } else if ($(this).text() == "Table") {
                $(".contact_content_form_item_delivery").remove();
                $(".contact_content_form_item_table").remove();
                var new_input = $("<div/>", {
                    class: "contact_content_form_item contact_content_form_item_table",
                    html: "<label for='contact_content_form_table'>Table</label><select type='text' id='contact_content_form_table' class='contact_content_form_input contact_content_form_input_table'> <option>Table 1</option><option>Table 2</option><option>Table 3</option><option>Table 4</option><option>Table 5</option><option>Table 6</option> </select><img src='./img/restaurant-furniture.jpg' alt = 'PHOTO' id = 'res_table' class='choose_table'>"
                });
                $(".contact_content_form_input_table").on("click", function () {
                    $(".choose_table").fadeToggle(700);
                });
            } else if ($(this).text() == "Takeaway") {
                $(".contact_content_form_item_delivery").remove();
                $(".contact_content_form_item_table").remove();
            }
            contact_input_area.append(new_input);
        }
    });
});
