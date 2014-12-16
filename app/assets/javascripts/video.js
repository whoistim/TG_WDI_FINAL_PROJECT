
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {//'player' refers to the div id above
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    // playerVars: { 'controls': 0 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.seekTo(100);
  // event.target.pauseVideo();
  event.target.setVolume(0);
  // console.log(event.target.getCurrentTime());
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(stopVideo, 6000);
    // done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

$( document ).ready(function() {

  $("#time").bind("click", function() {
    var totalTime = player.getDuration();
    var timeNow = player.getCurrentTime();
    $('#showtime').html(100*timeNow/totalTime+"%");
    $.ajax({
      url: "/markers",
      type: "POST",
      datatype: "json",
      data: {
        tag: this.name,
        video_time: timeNow,
        video_id: player.A.videoData.video_id,
        video_length: totalTime
      }


    }).done(function(){
      console.log("help");
    });


  });


});