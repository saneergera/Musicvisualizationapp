//common variable description

var Playingnumber = 0  ;
var shuffle=0;
var equal = 0;




function fancyTimeFormat(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

// time function end

function toggleSong() {
    var song = document.querySelector('audio');
    if (song.paused == true) {
        console.log('Playing');
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        song.play();
    } else {
        console.log('Pausing');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        song.pause();
    }
}

function updateCurrentTime() {
    var song = document.querySelector('audio');
    var currentTime = Math.floor(song.currentTime);
    currentTime = fancyTimeFormat(currentTime);
    var duration = Math.floor(song.duration);
    duration = fancyTimeFormat(duration)
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
}


$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
    if (name.length > 2) {
        var message = "Welcome, " + name;
        $('.main .user-name').text(message);
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
    } else {
        $('#name-input').addClass('error');
    }
});
$('.play-icon').on('click', function() {
    toggleSong();
});
$('body').on('keypress', function(event) {
    if (event.keyCode == 32 && event.target.tagName !='INPUT') {
        toggleSong();

    }
});

// var songList = ['Tamma Tamma',
//     'Humma Song','Nashe si chad gayi','The Breakup Song'
// ];
//
// var fileNames = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3'];
// var artistList = [' Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi','Badshah, Jubin Nautiyal, Shashaa Tirupati','Arijit Singh','Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi'];
// var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre','Ae Dil Hai Mushkil'];
// var durationList = ['2:56','3:15','2:34','2:29'];

var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
        'fileName': 'song1.mp3',
        'image': 'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
        'image': 'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image': 'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image': 'song4.jpg'
    }
]


//

function updateTimer(){
var song = document.querySelector('audio');
var ct =song.currentTime;
var td =song.duration;
var percentage = (ct/td)*100;
$(".progress-filled").css('width',percentage+"%");



}


$(".player-progress").click(function(event) {
    var $this = $(this);

    // to get part of width of progress bar clicked
    var widthclicked = event.pageX - $this.offset().left;
    var totalWidth = $this.width(); // can also be cached somewhere in the app if it doesn't change

    // do calculation of the seconds clicked
    var calc = (widthclicked / totalWidth) * 100 ; // get the percent of bar clicked and multiply in by the duration


var song = document.querySelector('audio');
song.currentTime = (song.duration*calc)/100;

updateTimer();



});







///////////





function changeCurrentSongDetails(songObj) //function creat kiya ek argument pass kiya hai song object
{
    $('.current-song-image').attr('src', 'img/' + songObj.image);
    $('.current-song-name').text(songObj.name);
    $('.current-song-album').text(songObj.album);
}

function addSongNameClickEvent(songObj, position) //we have made a machine jispe 2 buttons diye hai songName and position ke liye
{

    var songName = songObj.fileName;
    var id = '#song' + position; //#song ke saath position ko jod do and agar position 1 hai to output #song1 hogi jisse id mein store kar diya
    $(id).click(function() //agar #song1 hai to one vaale div pe event lage ga
        {
              Playingnumber= (position - 1)
            var audio = document.querySelector('audio');
            var currentSong = audio.src;
            if (currentSong.search(songName) != -1) {
                toggleSong();
            } else {
                audio.src = songName;
                toggleSong();
                changeCurrentSongDetails(songObj);
            }
        });
}


function changeSong() //we have made a machine jispe 2 buttons diye hai songName and position ke liye
{
var music =  songs[Playingnumber].fileName;
var song = document.querySelector("audio");
song.src = music;
toggleSong();
changeCurrentSongDetails(songs[Playingnumber])
}
window.onload = function() {



    changeCurrentSongDetails(songs[0]);

    for (var i = 0; i < songs.length; i++) //Var i zero se 3 tak chalana hai

    {
        var obj = songs[i]; //Diary ke andar se page utha ke humne obj variable mein store kar diya
        var name = '#song' + (i + 1);
        var song = $(name);
        song.find('.song-name').text(obj.name); //("song1 .songname")
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj, i + 1);
    }
    updateCurrentTime();
    setInterval(function() {
        updateCurrentTime();
    }, 1000);

    setInterval(function() {
        updateTimer();
    }, 1000);



    $("#songs").DataTable({
        paging: false
    });
}


$(".fa-step-forward").click(function(){

if(Playingnumber == songs.length-1){
console.log("one");
Playingnumber = 0;
changeSong();



}

else {
console.log("two");
console.log(Playingnumber);
  Playingnumber++;
changeSong();
}




})




$(".fa-step-backward").click(function(){

if(Playingnumber == 0){
console.log("one");
Playingnumber = (songs.length-1);
changeSong();




}

else {
console.log("two");
console.log(Playingnumber);
  Playingnumber--;
changeSong();
}




})

function shufflee(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}



$(".fa-random").click(function(){


$(this).toggleClass("active");


if(shuffle==0)
{
shuffle = 1;
shufflee(songs);
changeCurrentSongDetails(songs[0]);
song =document.querySelector("audio");
song.src = songs[0].fileName;
toggleSong();
Playingnumber=0;

    for (var i = 0; i < songs.length; i++) //Var i zero se 3 tak chalana hai

    {
        var obj = songs[i]; //Diary ke andar se page utha ke humne obj variable mein store kar diya
        var name = '#song' + (i + 1);
        var song = $(name);
        song.find('.song-name').text(obj.name); //("song1 .songname")
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj, i + 1);
    }
}

else {
  shuffle = 0;

   songs = [{
          'name': 'Badri Ki Dulhania (Title Track)',
          'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
          'album': 'Badrinath ki Dulhania',
          'duration': '2:56',
          'fileName': 'song1.mp3',
          'image': 'song1.jpg'
      },
      {
          'name': 'Humma Song',
          'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
          'album': 'Ok Jaanu',
          'duration': '3:15',
          'fileName': 'song2.mp3',
          'image': 'song2.jpg'
      },
      {
          'name': 'Nashe Si Chadh Gayi',
          'artist': 'Arijit Singh',
          'album': 'Befikre',
          'duration': '2:34',
          'fileName': 'song3.mp3',
          'image': 'song3.jpg'
      },
      {
          'name': 'The Breakup Song',
          'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
          'album': 'Ae Dil Hai Mushkil',
          'duration': '2:29',
          'fileName': 'song4.mp3',
          'image': 'song4.jpg'
      }
  ]

  changeCurrentSongDetails(songs[0]);
  song =document.querySelector("audio");
  song.src = songs[0].fileName;
toggleSong();
Playingnumber=0;
  for (var i = 0; i < songs.length; i++) //Var i zero se 3 tak chalana hai

  {
      var obj = songs[i]; //Diary ke andar se page utha ke humne obj variable mein store kar diya
      var name = '#song' + (i + 1);
      var song = $(name);
      song.find('.song-name').text(obj.name); //("song1 .songname")
      song.find('.song-artist').text(obj.artist);
      song.find('.song-album').text(obj.album);
      song.find('.song-length').text(obj.duration);
      addSongNameClickEvent(obj, i + 1);
  }


}






})


$(".fa-bar-chart").click(function(){

$(this).toggleClass("active");
if(equal==0)
{

equal=1;

$("svg").css("display","inline-block");
$(".content").css("display","none");
$(".contain").css("display","inline-block");
$(".contain").css("background","black");


}
else{
equal=0;
$("svg").css("display","none");
$(".content").css("display","inline-block");
$(".contain").css("display","none");




}







})


//   addSongNameClickEvent(fileNames[0],1);
// addSongNameClickEvent(fileNames[1],2);
// addSongNameClickEvent(fileNames[2],3);
// addSongNameClickEvent(fileNames[3],4);
