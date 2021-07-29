let questions = [
    {title: `ماهو اسم صغير الزرافة`,
    answer_1: `عجل`,
    answer_2: `خيلف`,
    answer_3: `جرو`,
    answer_4: `حمل`,
    right_answer: `خيلف`},

    {title: `ماهو لون رئة الانسان الطبيعي`,
    answer_1: `أحمر`,
    answer_2: `ابيض`,
    answer_3: `وردي`,
    answer_4: `بنفسجي`,
    right_answer: `وردي`},

    {title: `ماهو الحيوان صاحب اعلى ضغط دم`,
    answer_1: `الزرافة`,
    answer_2: `الفيل`,
    answer_3: `الاسد`,
    answer_4: `وحيد القرن`,
    right_answer: `الزرافة`},

    {title: `ماذا تسمى عملية تحول المادة من الحالة الصلبة الى الغازية بدون المرور بالحالة السائلة`,
    answer_1: `الانصهار`,
    answer_2: `التسامي`,
    answer_3: `التبخر`,
    answer_4: `التكثف`,
    right_answer: `التسامي`},

    {title: `اين تقع مدينة بكين`,
    answer_1: `الصين`,
    answer_2: `اليابان`,
    answer_3: `كوريا الشمالية`,
    answer_4: `الهند`,
    right_answer: `الصين`},
    
    {title: `ماهو لون كريات الدم البيضاء`,
    answer_1: `ليس لها لون`,
    answer_2: `أحمر`,
    answer_3: `أخضر`,
    answer_4: `أبيض`,
    right_answer: `ليس لها لون`}
]

// Start Game

const start = $('.home .btn')

start.click(function() {
    $('.home').slideUp(500);

    timer()
});

// Start Play

const quesTitle = $('.questions .ques .title')
const levels = $('.questions .money')
const closeLevels = $('.questions .money span')
const dolars = $('.questions .dolars span')
const levelsLi = $('.questions .money li')
const queschoeses = $('.questions .ques .choose .btn')
const lose = $('.questions .lose')
const loseBtn = $('.questions .lose .btn')
const gameCount = $('.questions .counter .txt')
const gameProg = $('.questions .counter .prog')
const losePoints = $('.questions .lose h2 span')
const home = $('.questions .house')
const half = $('.questions .half')
const users = $('.questions .users')
const friend = $('.questions .friend')

let random = Math.floor(Math.random() * questions.length)
let rightans = questions[random].right_answer
let levelsCount = 15
let count = 40
gameCount.text(count)

function timer() {
    timerCoun = setInterval(() => {
        if (gameCount.text() < 1) {
            lose.removeClass('unactive')
        } else {
            count--
            gameCount.text(count)
            gameProg.css({
                'width': '+=2.49%'
            })

            if (count == 0) {
                gameProg.css({
                    'width': '100%'
                })
            }
        }
    }, 1000);
}

half.click(function() {
    for (i = 0; i < queschoeses.length; i++) {
        if (queschoeses.eq(i).text() == rightans) {
            queschoeses.eq(i).siblings().fadeOut(5)
            queschoeses.eq(i).next().fadeIn(5)
        }
    }

    $(this).addClass('unactive')
})

users.click(function() {
    const userArea = $('.questions .user')
    const para = $('.questions .user p')
    const hideUserArea = $('.questions .user .btn')

    for (i = 0; i < queschoeses.length; i++) {
        para.eq(i).text(queschoeses.eq(i).text())

        if (para.eq(i).text() == rightans) {
            para.eq(i).prev().children().css({
                'height': '87%'
            })
        }
    }

    hideUserArea.click(function() {
        userArea.addClass('unactive')
    })

    userArea.removeClass('unactive')
    $(this).addClass('unactive')
})

friend.click(function() {
    const ansArea = $('.questions .call')
    const ansText = $('.questions .call .box h2 span')
    const hideAnsArea = $('.questions .call .btn')
    for (i = 0; i < queschoeses.length; i++) {
        if (queschoeses.eq(i).text() == rightans) {
            ansText.text(queschoeses.eq(i).text())
        }
    }

    hideAnsArea.click(function() {
        ansArea.fadeOut(5)
    })

    ansArea.fadeIn(5)
    $(this).addClass('unactive')
})

queschoeses.on('click', function() {
    $(this).addClass('active')
    random = Math.floor(Math.random() * questions.length)
    queschoeses.fadeIn(5)

    const activebtn = $('.questions .ques .choose .btn.active').text()

    if (activebtn == rightans) {
        $(this).addClass('right').removeClass('active')
        levelsCount--
        count = 40
        gameProg.css({
            'width': '0'
        })

        levels.removeClass('unactive')
        levelsLi.eq(levelsCount - 1).addClass('active').siblings().removeClass('active')

        if (levelsCount == 0) {
            levelsLi.eq(0).addClass('active').siblings().removeClass('active')
        }

        dolars.text(levelsLi.eq(levelsCount).text())
        losePoints.text(levelsLi.eq(levelsCount).text())

        rightans = questions[random].right_answer
    } else {
        lose.removeClass('unactive')
    }
});

function start_play() {
    quesTitle.text(questions[random].title)
    
    queschoeses.eq(0).text(questions[random].answer_1)
    queschoeses.eq(1).text(questions[random].answer_2)
    queschoeses.eq(2).text(questions[random].answer_3)
    queschoeses.eq(3).text(questions[random].answer_4)

    console.log(rightans)
}

closeLevels.click(function() {
    levels.addClass('unactive')
    queschoeses.removeClass('active')
    queschoeses.removeClass('right')
    start_play()

    if (levelsCount == 0) {
        const million = $('.questions .million')

        levelsLi.eq(0).addClass('active').siblings().removeClass('active')
        million.removeClass('unactive')
        clearInterval(timerCoun)
    }
});

loseBtn.click(function() {
    location.reload()
})

home.click(function() {
    location.reload()
})

start_play()