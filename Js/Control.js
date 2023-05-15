let arrQuote = [
    {
        author: 'William Shakespeare',
        quote: '"All the world’s a stage, and all the men and women merely players."',
        age: "40",
        imgsource: "./asets/img/Slider.png"
    },
    {
        author: 'Thomas A. Edison',
        quote: '"Many of life’s failures are people who did not realize how close they were to success when they gave up."',
        age: "41",
        imgsource: "./asets/img/Slider2.jpg"
    },
    {
        author: 'Babe Ruth',
        quote: '"Never let the fear of striking out keep you from playing the game."',
        age: "42",
        imgsource: "./asets/img/Slider3.jpg"
    },
    {
        author: 'Will Smith',
        quote: '"Money and success don’t change people; they merely amplify what is already there."',
        age: "43",
        imgsource: "./asets/img/Slider4.jpg"
    },
    {
        author: 'Steve Jobs',
        quote: '"Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking."',
        age: "44",
        imgsource: "./asets/img/Slider5.jpg"
    },
    {
        author: 'Seneca',
        quote: '"Not how long, but how well you have lived is the main thing',
        age: "45",
        imgsource: "./asets/img/Slider1.jpg"
    }
]
window.onload = () => {
    if (!localStorage.getItem("quotes")) {
      localStorage.setItem("quotes", JSON.stringify(arrQuote));
    }
    renderSlide(0);
    renderSlideList(0);
};
function renderSlide(slideIndex) {
    let quotes = JSON.parse(localStorage.getItem("quotes"));
    const slide = document.querySelector(".slider__slide");
    const slider__description = document.querySelector(".slider__description")
    let html = `<img src="${quotes[slideIndex].imgsource}" alt="" class="slider__slide-img">`;
    let quoteHtml = `
    <p class="slider__description-text">${quotes[slideIndex].quote}</p>
    <p class="slider__description-sign">${quotes[slideIndex].author}</p>
    <p class="slider__description-age">${quotes[slideIndex].age}</p>
    `;
    slide.innerHTML = html;
    slider__description.innerHTML = quoteHtml;
}
function renderSlideList(slideIndex) {
    const content_list = document.querySelector(".content-list");
    let quotes = JSON.parse(localStorage.getItem("quotes"));
    let listImg = quotes.map(
        (item,index) => `
        <li class="content-item" >
            <img src="${item.imgsource}" alt="" class="content-item-img ${slideIndex === index ? "active" : ""}" onclick='handleChangeSlide(${index})'>
            <div class="content-item-wrap">
                <i class="fa-solid fa-trash-can" onclick='handleDeleteSlide(${index})'></i>  
            </div>
        </li>` 
    );
    content_list.innerHTML = listImg.join("");

    const navigation = document.querySelector(".navigation-visibility")
    let ListDot = quotes.map(
        (item,index) => `<div class="slide-icon ${slideIndex === index ? "active-dot" : ""}" onclick='handleChangeSlide(${index})' ${index === slideIndex}></div>`
    );
    navigation.innerHTML = ListDot.join("");



    const arrow = document.querySelector(".slider__arrow")
    arrow.innerHTML = 
    `<i class="arrow1 fa-sharp fa-solid fa-chevron-left" onclick="handleChangeSlide(${slideIndex - 1 < 0 ? quotes.length - 1 : slideIndex - 1})"></i>
    <i class="arrow2 fa-sharp fa-solid fa-chevron-right" onclick="handleChangeSlide(${slideIndex + 1 > quotes.length - 1 ? 0 : slideIndex + 1})"></i>
    `;

}

function handleChangeSlide(slideIndex) {
    renderSlide(slideIndex);
    renderSlideList(slideIndex);
}
function handleDeleteSlide(index) {
    let quotes = JSON.parse(localStorage.getItem("quotes"));
    if (quotes.length == 1) return;
    quotes.splice(index,1);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    renderSlide(0);
    renderSlideList(0);
}


// Form validation
// Quote,Author,Age
const footer__quote = document.querySelector("#footer__quote");
const footer__author = document.querySelector('#footer__author');
const footer_age = document.querySelector("#footer__age")
// File
const img_input = document.querySelector("#img-input");
const display_img = document.querySelector('.display-img');
// Form
const submit_btn = document.querySelector('.footer-btn');
let saveSource;
// ListImg


function AddSlide() {
    let quotes = JSON.parse(localStorage.getItem("quotes"));
    if(quotes.length == 6) {
        console.log("done");
        quotes.splice(0,1);
        quotes = [
            ...quotes,
            {
                author: footer__author.value,
                quote: footer__quote.value,
                age: Number(footer_age.value),
                imgsource: saveSource,
            }
        ];
    } else {
        quotes = [
            ...quotes,
            {
                author: footer__author.value,
                quote: footer__quote.value,
                age: Number(footer_age.value),
                imgsource: saveSource,
            }
        ];
    }
    localStorage.setItem("quotes" , JSON.stringify(quotes));
    footer__author.value = "";
    footer__quote.value = "";
    footer_age.value = "";
    img_input.value = "";
    renderSlide(0);
    renderSlideList(0);
}
function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    let input_form = parent.querySelector('input')

    parent.classList.add('error');
    small.innerText = message
    input_form.style.border = '3px solid red'
}
function showSuccess(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    let input_form = parent.querySelector('input')
    
    parent.classList.remove('error');
    small.innerText = ''
    input_form.style.border = 'none'
}
function checkEmptyError(ListInput) {
    let isEmptyError = false
    ListInput.forEach(input => {
        input.value = input.value.trim();
        let res = input.value.split(" ");
        
        const l =  res.filter(e => e !='').length

        if(l < 3) {
            if(l == '') {
                showError(input,'Cannot be left blank')
                isEmptyError = true
            } 
            else {
                showError(input,'Quote must be more than 3 characters')
                isEmptyError = true
            }
        } else {
            showSuccess(input)
        }
    });
    return isEmptyError;
}
function checkAge(input) {
    let isAgeError = false;
    input.value = input.value.trim();
    let res = input.value.split(" ");

    const age = input.value;
    
    if(isNaN(age) || age == '') {
        showError(input,'age must be a number')   
        isAgeError = true;
    }
    else {
        if(age < 1 || age > 100) {
            showError(input,'age should be between 1 and 100')
            isAgeError = true;
        }
        else {
            showSuccess(input);
        }
    }
    return isAgeError;
}
function CheckImg(input) {
    if(input.src.length <= 23) {
        return true;
    } else {
        return false;
    }
}

img_input.addEventListener("change", function (e) {
    const files = e.target.files[0];
    saveSource = URL.createObjectURL(files);
    display_img.src = saveSource;
});

submit_btn.addEventListener('click', function(e) {
    e.preventDefault();
    let isEmptyError = checkEmptyError([footer__quote,footer__author]);
    let isAgeError = checkAge(footer_age);
    let isImgError = CheckImg(display_img);

    if(isEmptyError || isAgeError || isImgError) {
        return;
    } else {
        AddSlide();
    }
})
