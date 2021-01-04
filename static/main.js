var $messages = $('.messages-content'),
    d, h, m,
    i = 0;




$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal"> ' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

//Emoji
var clicked = false;


//This Function Use Intergrating With model
function connectWithModel(){
  var listEmojies = [
    '<div class="eml"><div class="em" id="&#x1F603;" onClick="_click(this.id)">&#x1F603;</div><div class="em" id="&#x1F603;" onClick="_click(this.id)">&#x1F603;</div><div class="em" id="&#x1F603;" onClick="_click(this.id)">&#x1F603;</div><div class="em" id="1F603" onClick="_click(this.id)" >&#x1F603;</div></div>'
  ]
  
  $.getJSON('/background_process_test',
            function(data) {
              alert(data['index']);
            });
  
  return listEmojies[0];
}


$('.message-emoji').click(function() {
    if (clicked) {
        $('.imoji-list').html('');
    } else {
      var listEmojies = [
        // angry
        '<div class="eml"><div class="em" id="&#x1F620;" onClick="_click(this.id)">&#x1F620;</div><div class="em" id="&#x1F624;" onClick="_click(this.id)">&#x1F624;</div><div class="em" id="&#x1F621;" onClick="_click(this.id)">&#x1F621;</div><div class="em" id="&#x1F92C;" onClick="_click(this.id)">&#x1F92C;</div><div class="em" id="&#x1F608" onClick="_click(this.id)" >&#x1F608;</div></div>',
        // happy
        '<div class="eml"><div class="em" id="&#x1F600;" onClick="_click(this.id)">&#x1F600;</div><div class="em" id="&#x1F642;" onClick="_click(this.id)">&#x1F642;</div><div class="em" id="&#x1F60A" onClick="_click(this.id)" >&#x1F60A;</div><div class="em" id="&#x1F602;" onClick="_click(this.id)">&#x1F602;</div><div class="em" id="&#x1F923;" onClick="_click(this.id)">&#x1F923;</div></div>',
        //nuetral
        '<div class="eml"><div class="em" id="&#x1F928;" onClick="_click(this.id)">&#x1F928;</div><div class="em" id="&#x1F610;" onClick="_click(this.id)">&#x1F610;</div><div class="em" id="&#x1F611" onClick="_click(this.id)" >&#x1F611;</div><div class="em" id="&#x1F636;" onClick="_click(this.id)">&#x1F636;</div><div class="em" id="&#x1F910;" onClick="_click(this.id)">&#x1F910;</div></div>',
        // sad
        '<div class="eml"><div class="em" id="&#x1F60C;" onClick="_click(this.id)">&#x1F60C;</div><div class="em" id="&#x1F614;" onClick="_click(this.id)">&#x1F614;</div><div class="em" id="&#x1F62A" onClick="_click(this.id)" >&#x1F62A;</div><div class="em" id="&#x1F62D;" onClick="_click(this.id)">&#x1F62D;</div><div class="em" id="&#x1F629;" onClick="_click(this.id)">&#x1F629;</div></div>',
        // Suprise
        '<div class="eml"><div class="em" id="&#x1F62E;" onClick="_click(this.id)">&#x1F62E;</div><div class="em" id="&#x1F62F;" onClick="_click(this.id)">&#x1F62F;</div><div class="em" id="&#x1F632" onClick="_click(this.id)" >&#x1F632;</div><div class="em" id="&#x1F631;" onClick="_click(this.id)">&#x1F631;</div><div class="em" id="&#x1F640;" onClick="_click(this.id)">&#x1F640;</div></div>',


      ]
      $('.imoji-list').html('<div class="loader" id="loader-4"><span></span><span></span><span></span><span></span><span></span></div>');
      
      $.getJSON('/get_expression',
            function(data) {
               $('.imoji-list').html(listEmojies[data['index']]);
            });
       

    }
    clicked = !clicked;
    
  });

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
  'Hi there, I and you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="https://www.dreisen.com/wp-content/uploads/2016/09/woman-1-thumbnail-1.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://www.dreisen.com/wp-content/uploads/2016/09/woman-1-thumbnail-1.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}


function _click(id){
  insertEmojiee(id);
  clicked = !clicked;
  $('.imoji-list').html('');


}


function insertEmojiee(id) {
  msg = $('.message-input').val();
  $('<div  style="font-size: 25px;" class="message  message-personal popEmoji">'+id+'</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

