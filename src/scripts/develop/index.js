
function openMenu() {
    $('.header__burger').toggleClass("header__burger-open");
    $('.header__menu-block').toggleClass('show');
    $('body').toggleClass('hidden');
};
const validateForm = (form, func) => {
    form.on("submit", function (e) {
        e.preventDefault();
    });

    $.validator.addMethod("goodName", function (value, element) {
        return this.optional(element) || /^[\sаА-яЯіІєЄїЇґҐa-zA-Z0-9._-]{2,30}$/i.test(value);
    }, "Please enter correct");

    $.validator.addMethod("goodEmail", function (value, element) {
        return this.optional(element) || /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,62}$/i.test(value);
    }, "Please enter correct email");


    form.validate({
        rules: {
            name: {
                required: true,
                goodName: true
                // minlength:2,
                // maxLength: 25
            },
            lastname: {
                required: true,
                goodName: true
            },
            phone: {
                required: true,
                // goodPhone: true

            },
            email: {
                required: true,
                goodEmail: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            },
            passwordNew: {
                required: true,
                minlength: 8,
            },
            passwordNewRepeat: {
                required: true,
                minlength: 8,
                equalTo: "#passwordNew"
            }
        },
        messages: {
            name: {
                required: "This field is required",
                minlength: "First name can't be shorter than 2 characters",
                maxLength: "First name can't be longer than 25 characters "
            },
            lastname: {
                required: "This field is required",
                minlength: "Last name can't be shorter than 2 characters",
                maxLength: "Last name can't be longer than 25 characters "
            },
            phone: {
                required: "This field is required",
                phone: "Please enter correct phone number"
            },
            email: {
                required: "This field is required",
                email: "Please enter correct email"
            },
            password: {
                required: "This field is required",
                minlength: "Last name can't be shorter than 8 characters",
            },
            passwordNew: {
                required: "This field is required",
                minlength: "Last name can't be shorter than 8 characters",
            },
            passwordNewRepeat: {
                required: "This field is required",
                equalTo: "Passwords do not match"
            }

        },
        submitHandler: function () {
            func();
            form[0].reset();
        }
    });
};





// create ajax
function ajaxSend(date, url, funcSuccess,funcError) {
    $.ajax({
        url: url,
        data: date,
        method: 'POST',
        success: function (data) {
            funcSuccess(data);
        },
        error: function (error) {
            funcError(error)

        },
        complete: function () {}
    });

}

// send form
function sendForm(form, url, funcSuccess,funcError) {
    form = form.serialize();
    ajaxSend(form, url, funcSuccess,funcError);
}


function search() {
    let formSearch = $('.header__search');
    $(document).on('submit', formSearch, function () {
        sendForm(formSearch, '/wp-admin/admin-ajax.php');
    })

}

function accordion(){
    $(document).on('click', '.accordion__header', function (){
        let wrap =  $(this).closest('.accordion__item');
        if(wrap.hasClass('open')){
            wrap.removeClass('open')
        }else{
            wrap.addClass('open')
        }
    })
}
function wrapSlider(){
    let itemsTrend = $('.list__item:first-child .post__item')
    let itemsNewest = $('.list__item:last-child .post__item')
    $('.posts__slider-trend .swiper-wrapper').append(itemsTrend)
    $('.posts__slider-newest .swiper-wrapper').append(itemsNewest)
    const trend = new Swiper('.posts__slider-trend', {
        slidesPerView: 1,
        spaceBetween: 40,
        centeredSlides: false,
        loop: true,

        pagination: {
            el: '.trend__pagination',
            clickable: true,
        },


    });
}

function addClassAccordion(){
    $('.accordion__item').each(function (index){
        if (index == 0 ) {
            $(this).addClass('open');
        }
        console.log($(this))
        if (index % 2 !== 0) {
            $(this).addClass('reverse');
        }
    })

}

let page = 1;
function featuredShow() {
    $(document).on('click', '.featured__button', function () {
        page++;
        $(this).hide()
        let category = $(this).closest('.featured').data('category')

        console.log()


        let obj = {action:'show-related', page:page, category }
        ajaxSend(obj, '/wp-admin/admin-ajax.php', addNewRelated);
    });
};

function addNewRelated(res){
    $('.featured__block-related').append(res)
}


$(document).ready(function(){
    $('.header__burger').on('click', openMenu);
    search()
    accordion();
    featuredShow();
    // wrapSlider()

    let formFooter = $('.footer__form');
    validateForm(formFooter, function () {
        sendForm(formFooter, '/wp-admin/admin-ajax.php');

    });
    let formControl = $('.control__form-content');
    validateForm(formControl, function () {
        sendForm(formControl, '/wp-admin/admin-ajax.php');

    });
    addClassAccordion()
});

$(window).load(function(){

});

$(window).resize(function(){

});