const slider = tns({
    container: '.carusel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: true,
    nav: false,
    controls: false,
    autoplayButtonOutput: false,
    // responsive: {
    //   340: {
    //     items: 1
    //   },
    //   576: {
    //     items: 1
    //   },
    //   992: {
    //     items: 1
    //   }
    // }
});

document.querySelector(".prev").addEventListener("click", function () {
    slider.goTo("prev");
});
document.querySelector(".next").addEventListener("click", function () {
    slider.goTo("next");
});
// tabs для фитнеса для бега для триатлона

$(function () {

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // toggle вперед назад
    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on("click", function (e) {
                e.preventDefault();
                $(".catalog-item__content").eq(i).toggleClass("catalog-item__content_active");
                console.log(this.parentNode);
                $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
            })
        })
    }
    toggleSlide(".catalog-item__link");
    toggleSlide(".catalog-item__back");

    // Modal

    $("[data-modal=consultation]").on("click", function () {
        $('.overlay, #consultation').fadeIn("slow");
    });
    $('.modal__close').on('click', function () {
        $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
    });


    $(".button_mini").each(function (i) {
        $(this).on('click', function () {
            $("#order .modal__descr").text($('.catalog-item__subtitle').eq(i).text());
            $(".overlay, #order").fadeIn("slow");
        });

    });

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: "Пожалуйста, заполните свое имя.",
                phone: {
                    required: "Нам нужен ваш номер телефона чтоб связаться с Вами",
                    phone: "Ваш телефон должен быть в формате +380"
                },
                email: {
                    required: "Нам нужен ваш емаил адрес чтоб связаться с Вами",
                    email: "Ваш емаил адрес должен быть в формате name@domain.com"
                }
            }
        })
    };

    $('input[name=phone]').mask("+38(999) 999-9999");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST", //тип отправка на сервер
            url: "mailer/smart.php",
            data: $(this).serialize() //эти данные преобразуем
        }).done(function () { //после завершения выполнить функцию
            $(this).find("input").val(""); // в этом ищем инпуты и значение обнуляем ""  

            $('form').trigger('reset'); //все формы должны очистится

        });
        return false;
    });

    // smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();

        }
    })
    $("a[href^='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    

});

new WOW().init();
