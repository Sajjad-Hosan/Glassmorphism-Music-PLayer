const mCircle = document.querySelector('.mCircle')
const audio = document.createElement('audio');
const Icon = document.querySelectorAll('.i');
const glist = document.querySelectorAll('.gList');
const MusicBtn = Icon[0];
const Back = Icon[1];
const Gear = Icon[2];
const Gxmark = Icon[3];
const PlstList = Icon[4];
const AddList = Icon[5];
const Volume = Icon[6];
const Prev = Icon[7];
const Play = Icon[8];
const Next = Icon[9];
const Repeat = Icon[10];
const shuffle = Icon[11];
const MiniMode = Icon[12];
const sIcon = document.querySelectorAll('.si');
const Image = sIcon[0];
const Mode = sIcon[1];

const Play2 = document.querySelector('.play');
const Next2 = document.querySelector('.next');
const Prev2 = document.querySelector('.prev');
const volInput = document.getElementById('volRange');
const processor = document.querySelector('.processor');

const setLi = glist[0];
let currSong = 0;
let isTog = false;
let isRandom = false;
let isRepeat = false;
let isSbox = true;
let isMode = true;
let playIndex = null;
let ion = true;

mCircle.addEventListener('click',() => {
    document.querySelector('.container').classList.add('aa');
    mCircle.classList.add('aa');
    document.querySelector('body').style.backgroundImage = `url('./img/pic 1.jpg')`;
    Back.addEventListener('click',() => {
    document.querySelector('.container').classList.remove('aa');
    mCircle.classList.remove('aa');
    document.querySelector('body').style.background = '#232323';
    window.location.reload();
    });
});
const Songs = [
    {
        'name' : 'MY Music 1',
        'img' : './img/mPic (1).jpg',
        'mp3' : './audio/audio (1).mp3',
    },
    {
        'name' : 'MY Music 2',
        'img' : './img/mPic (2).jpg',
        'mp3' : './audio/audio (2).mp3',
    },
    {
        'name' : 'MY Music 3',
        'img' : './img/mPic (3).jpg',
        'mp3' : './audio/audio (3).mp3',
    },
    {
        'name' : 'MY Music 4',
        'img' : './img/mPic (4).jpg',
        'mp3' : './audio/audio (4).mp3',
    },
    {
        'name' : 'MY Music 5',
        'img' : './img/mPic (5).jpg',
        'mp3' : './audio/audio (5).mp3',
    },
];
Songs.forEach((song,i) => {
        const li = document.createElement('li');    
        const lon = document.querySelector('.liP');
        li.addEventListener('click',() => {     
                playIndex = i;
                audio.src = Songs[playIndex].mp3;
                audio.play();
                document.querySelector('img').src = Songs[i].img;
                document.querySelector('.title').textContent = Songs[i].name;
                li.innerHTML = `
                <img src='${song.img}'/>
                <b class="Pname">${song.name}</b>
                <i class='fa fa-play'></i>
                `;
                playS();
        });

        li.innerHTML = `
        <img src='${song.img}'/>
        <b class="Pname">${song.name}</b>
        `;
        document.getElementById('list').append(li);
    }); //edite mode this method
    function loadSong(){
        if(isRepeat){
        repeatPLay();
        }else{
        document.querySelector('img').src = Songs[currSong].img;
        document.querySelector('.title').textContent = Songs[currSong].name;
        audio.src = Songs[currSong].mp3;
        audio.load();
        audio.addEventListener('ended',nextS);
        document.querySelector('.re').style.color = "#000";
    }
    };
    function IsPLay(){
        isTog ? pauseS() : playS();
    };
    function playS(){
        audio.play();
        isTog = true;
        Play.classList.remove('fa-play');
        Play.classList.add('fa-pause');
        Play2.classList.remove('fa-play');
        Play2.classList.add('fa-pause');
        document.getElementById('p1').textContent = 'pause';
    };
    function pauseS(){
        audio.pause();
        isTog = false;
        Play.classList.add('fa-play');
        Play.classList.remove('fa-pause');
        // this is for the mini ,player
        Play2.classList.add('fa-play');
        Play2.classList.remove('fa-pause');
        document.getElementById('p1').textContent = 'play';
    };
    function nextS(){
        if(currSong < Songs.length - 1 && isRandom == false){
            currSong += 1;
        }
        else if(currSong < Songs.length - 1 && isRandom === true){
            let AudioRandom = Number.parseInt(Math.random() * Songs.length);
            currSong = AudioRandom;
            playS();
        }
        else{
            currSong = 0;
        }
        console.log(currSong);
        loadSong(currSong);
        playS();
    };
    function prevS(){
        if(currSong < Songs.length){
            currSong -= 1;
        }else{
            currSong -= 1;
        }
        loadSong(currSong);
        playS();
    };
    function forTime(time){
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m < 10 ? '0' : ''}${m} : ${s < 10 ? '0' : ''}${s}`;
    };
    function Process(){
        const {currentTime : current,duration} = audio;
        const percentance = (current / duration) * 100;
        document.querySelector('.bar').style.width = `${percentance}%`;
    };
    MiniMode.addEventListener('click',miniModeClick);
function miniModeClick(){
    let BigMode = document.querySelector('.back');
    let isMode = true;
    if(isMode){
        document.querySelector('.container').classList.add('miniActive');
        isMode = false;
        document.querySelector('.containerPip').classList.add('miniActive');
        isMode = false;
    }
    BigMode.addEventListener('click',() => {
        document.querySelector('.container').classList.remove('miniActive');
        isMode = true;
        document.querySelector('.containerPip').classList.remove('miniActive');
        isMode = true;
    });
}
    PlstList.addEventListener('click',() => {
        const PLayBox = document.querySelector('.playList');
        PLayBox.classList.add('listActive');
    const Close = document.querySelector('.close');
    Close.addEventListener('click',() => {
            PLayBox.classList.remove('listActive');
        });
    });
    processor.addEventListener('click',(pro) => {
        let cPos = pro.clientX - processor.getBoundingClientRect().left;
        let per = (cPos / processor.clientWidth) * 100;
        document.querySelector('.bar').style.width = per + '%';
        let auDuration = audio.duration;
        let seekTime = (per / 100) * auDuration;
        audio.currentTime = seekTime;
        playS();
    });
    Volume.addEventListener('click',() => {
        const volBox = document.querySelector('.volBox');
        volBox.classList.toggle('activeV');
    });
    Gear.addEventListener('click',() => {
        const gearBox = document.querySelector('.gearBox');
        const x0 = document.querySelector('.x0');
            gearBox.classList.add('activeG');
            x0.style.visibility = 'hidden';
            x0.style.transform = `translateX(70px)`;
            
    Gxmark.addEventListener('click',() => {
        gearBox.classList.remove('activeG');
        x0.style.transform = `translateX(0px)`;
        x0.style.visibility = 'visible';
    });
    });
    volInput.addEventListener('input',(e) => {
        audio.volume = e.target.value / 100;
    });
    volInput.addEventListener('wheel',(e) => {
        e.preventDefault();
        volInput.value = parseInt(volInput.value) + (e.deltaY > 0 ? -1 : 1);
        volInput.value = Math.min(Math.max(volInput.value, volInput.min), volInput.max);
        audio.volume = volInput.value / 100; 
        volInput.dispatchEvent(new Event('input'));
    });
    Repeat.addEventListener('click',() => {
        isRepeat = !isRepeat;
        if(isRepeat) document.querySelector('.re').style.color = "crimson";
        else {
            document.querySelector('.re').style.color = "#000";
            currSong = currSong - 1;
        }
    });
function repeatPLay(){
    audio.currentTime = 0;
    audio.play();
};
    shuffle.addEventListener('click',() => {
       if(isRandom == false){
        isRandom = true;
        document.querySelector('.su').style.color = 'crimson';
       }else{
        isRandom = false;
        document.querySelector('.su').style.color = '#000';
    }
       console.log(isRandom);
    });
    setLi.addEventListener('click',() => {
const seBox = document.querySelector('.setBOx');
        seBox.style.visibility = 'visible';
        seBox.style.opacity = 1;
    document.querySelector('.Sxmark').addEventListener('click',() => {
        seBox.style.visibility = 'hidden';
        seBox.style.opacity = 0;
    });
    });

loadSong();
audio.addEventListener('timeupdate',Process);
Play.addEventListener('click',IsPLay);
Play2.addEventListener('click',IsPLay);
Next.addEventListener('click',nextS);
Next2.addEventListener('click',nextS);
Prev.addEventListener('click',prevS);
Prev2.addEventListener('click',prevS);

let backSel = document.querySelector('#backSel');
let backAuto = document.getElementById('a');
let miniMode = document.getElementById('b');
let speakerMode = document.getElementById('c');
const sideBtn = document.querySelector('.side');
const sBox = document.querySelector('.sBox');

    backSel.addEventListener('change',(e) => {
    bValue = e.target.value;
    if(bValue == 0){
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
            document.querySelector('.container').style.background = `rgba(0,0,0,.3)`;
            document.querySelector('.title').style.background = '#fff';
        sideBtn.style.color = '#fff';
            for(let x of Icon){
                x.style.color = '#fff';
            }
        }else{
            document.querySelector('.container').style.background = `rgba(200, 200, 200, .3)`;
            document.querySelector('.title').style.background = '#000';
            sideBtn.style.color = '#000';
            for(let x of Icon){
                x.style.color = '#000';
            }
        }
    }else if(bValue == 1){
        document.querySelector('.container').style.background = `rgba(0,0,0,.3)`;
        document.querySelector('.title').style.background = '#fff';
        for(let x of Icon){
            x.style.color = '#fff';
        sideBtn.style.color = '#fff';
        }
    }else if(bValue == 2){ 
        document.querySelector('.container').style.background = `rgba(200, 200, 200, .3)`;
        document.querySelector('.title').style.background = '#000';
        sideBtn.style.color = '#000';
        for(let x of Icon){
            x.style.color = '#000';
        }
    }else{
        console.log('The Code Has Some Problem');
    }
    });
function randomPicture(){
    if(backAuto.checked){         
        const accessKey = "eKMo1UHpoAz9gqEjrarrTHoNJiUlbfAH2EwExedkzRo";
        const api = "https://api.unsplash.com/photos/random";
    fetch(`${api}?client_id=${accessKey}`)
    .then(re => re.json())
    .then(data => {
        const imgUrl = data.urls.regular;
        document.querySelector('body').style.backgroundImage = `url(${imgUrl})`;
    })
    .catch(e => {
        console.log(e);
    });
}else{
    document.querySelector('body').style.backgroundImage = `url('./img/pic 1.jpg')`;
}
}
    backAuto.addEventListener('change',() => {
        randomPicture();
    });
    sideBtn.addEventListener('click',() => {
        if(isSbox){
            sBox.classList.add('sActive');
            isSbox = false;
        }else{
            sBox.classList.remove('sActive');
            isSbox = true;
        }
    });
    Image.addEventListener('click',() => {      
            const accessKey = "eKMo1UHpoAz9gqEjrarrTHoNJiUlbfAH2EwExedkzRo";
            const api = "https://api.unsplash.com/photos/random";
        fetch(`${api}?client_id=${accessKey}`)
        .then(re => re.json())
        .then(data => {
            const imgUrl = data.urls.regular;
            document.querySelector('body').style.backgroundImage = `url(${imgUrl})`;
        })
        .catch(e => {
            console.log(e);
        });
    });
    Mode.addEventListener('click',() => {
    if(isMode == true){
                document.querySelector('.container').style.background = `rgba(0,0,0,.3)`;
                document.querySelector('.title').style.background = '#fff';
                for(let x of Icon){
                    x.style.color = '#fff';
                sideBtn.style.color = '#fff';
                }
                isMode = false;
            }else if(isMode == false){ 
                document.querySelector('.container').style.background = `rgba(200, 200, 200, .3)`;
                document.querySelector('.title').style.background = '#000';
                sideBtn.style.color = '#000';
                for(let x of Icon){
                    x.style.color = '#000';
                }
                isMode = true;
            }else{
                console.log('The Code Has Some Problem');
            }
});
//many thing will add next time or upgrade mode