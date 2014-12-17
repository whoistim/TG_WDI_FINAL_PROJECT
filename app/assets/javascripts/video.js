
var arrM = [];// array of marker locations

var addRow = function(j){
  arrM.push([j]);
  return true;
};




                  // bunch of YouTube stuff
                  // var tag = document.createElement('script');
                  // tag.src = "https://www.youtube.com/iframe_api";
                  // var firstScriptTag = document.getElementsByTagName('script')[0];
                  // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//// YOUTUBE STUFF //////////////
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

//// END OF YOUTUBE STUFF //////////////

$( document ).ready(function() {

  $.get("/markers", function(markers){
    console.log(markers);
    }
  );

  //THIS IS THE BUTTON RELATED STUFF//

  $(".btn").bind("click", function() {
    //SETS UP THE INFO FOR SETTING MARKERS
    var totalTime = player.getDuration();      //LENGTH OF THE VIDEO
    var timeNow = player.getCurrentTime();     //TIME THE BUTTON WAS CLICKED
    var markerPercent = 100*timeNow/totalTime; //MARKER LOCATION AS A % OF THE VIDEO
    var comment = $("#comment").val(); //THE COMMENT ENTERED WITH THE BUTTON CLICK
    $("#comment").val("");             //CLEARING THE COMMENT AFTER SUBMISSION

    //CHECK TO AVOID MARKERS GETTING PLACED OVER EACH OTHER
    var rightEdge = (markerPercent/100*640)+5;//15 = marker width
    var leftEdge = rightEdge - 5;
    var markerRow = 1; //to keep track of how much to vertically offset markers
    var checkClear = function(){
      var i = 0;
      var done = false;
      while(!done){
        if(!arrM[i]){
          addRow(rightEdge);
          markerRow = markerRow + i;
          done = true;
        }
        var row = arrM[i];
        var lastIndexOfRow = row.length-1;
        var lastInRow = row[lastIndexOfRow];

        if(lastInRow < leftEdge){
          arrM[i].push(rightEdge);
          // console.log(arrM[i]);
          markerRow = markerRow + i;
          done = true;
        }
        else{
          i++;
        }
      }
    };//CLOSES THE CLEARCHECK FUNCTION

  checkClear();  //RUNS THE MARKER COLLISION CHECK

    //places the marker on the timeline
    var offSet = "left: "+ markerPercent + "%; top: "+markerRow*16+"px";
    var mClass = this.name;
    var $span = $("<span>", {class: mClass, style: offSet});//CREATES A MARKER SPAN


//CREATES THE MESSAGE BOX FOR EACH MARKER
    $span.click(function(){

      comment = comment || mClass;
        $('.message-box').remove();

        var $mess = $('<div>').addClass('message-box')
    .html('<div><img class="imgClose" src="/assets/close_x.svg" /><h4 class="message">'+comment+'</h4></div>')
                             .css('left', $(this).position().left);
        $(this).after($mess);
        $mess.fadeIn('fast');

        $('#timeline').on('click', '.imgClose', function () {
        $(this).parent().fadeOut('fast', function () { $(this).parent().remove(); });
        });
    }); //CLOSES MESSAGE BOX FOR EACH MARKER

//THE MARKER GETTS PLACED ON THE TIMELINE DIV
    $("#timeline").prepend($span);

//MARKER GETS SENT TO THE DATABASE
    $.ajax({
      url: "/markers",
      type: "POST",
      datatype: "json",
      data: {
        tag: this.name,
        video_time: timeNow,
        video_id: player.A.videoData.video_id,
        video_length: totalTime,
        comment: comment
      }

    }).done(function(response){
    });//CLOSES THE AJAX CALL

  }); //CLOSES BINDING MARKER CREATION TO THE BUTTONS

}); //CLOSES DOCUMENT READY


