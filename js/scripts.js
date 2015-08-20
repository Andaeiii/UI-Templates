// JavaScript Document

var root;

//editted logos...
var lgpart = 4;

var cl;	//canvasloader..
var speakerId;	//when speaker has been clicked...

var speakers = new Array();	//array of speakers...
var curimg;

var on = false;
var touch = false;
 
var hashes = new Array(
	{id:'#pdflink', txt:'Download PDF', url:'http://olakunlesoriyan.com/revamped/wp-content/uploads/2012/12/PKProfile.pdf'},
	{id:'#kunleweb', txt:'OLAKUNLE SORIYAN COMPANY', url:'http://olakunlesoriyan.com/revamped'},
	{id:'#medicaid', txt:'Medicaid Diagnostics', url:'http://www.medicaidradiology.com/'},
	{id:'#sahara', txt:'Sahara Group', url:'http://www.sahara-group.com/'},
	{id:'#iwei', txt:'Isa Wali Empowerment Initiative IWEI', url:'http://www.iwei-ng.org/'},
	{id:'#alkali', txt:'ALKALI HUSSAINI FOUNDATION', url:'http://www.alkalihussainifoundation.com/'},
	{id:'#wali', txt:'Wali-Uwais &amp; Co', url:'http://www.wali-uwais.com/'},
	{id:'#here1', txt:'here', url:'http://m.naijadailies.com/News/Share?nid=279587'},
	{id:'#here2', txt:'here', url:'http://nigeriacommunicationsweek.com.ng/e-business/easy-taxi-samsung-organises-exclusive-evening-with-banky-w'},
	{id:'#here3', txt:'here', url:'http://www.theoctopusnews.com/easy-taxi-partners-nysc/'},
	{id:'#taxi', txt:'Easy Taxi', url:'http://www.easytaxi.com/'},
	{id:'#channels', txt:'Channels Television', url:'http://www.channelstv.com'},
	{id:'#demolaweb', txt:'www.demolarewajudaily.com', url:'http://www.demolarewajudaily.com'},
	{id:'#demolatweet', txt:'@DemolaRewaju', url:'http://www.twitter.com/demolarewaju'}
);


function init(){	

	box = $('#body');
	
	root = true;
	
	
	$('.thmbs a').bind('mouseover', function(){
		//alert($(this).css('opacity'));
		//TweenMax.to(this, 0.5, {opacity:0.2, /*y:-10*/});
	});
	
	$('.thmbs a').bind('mouseout', function(){
		//alert($(this).attr('id'));
		//TweenMax.to(this, 0.5, {opacity:1, /*y:0*/});
	});
	
	//set the default curimg..... 
	curimg = 0;

	//dont show any profile... by default...
	shwx(1, 0)
	
	//then load the speakers XML file..
	loadXML();
	
	//create page libraries...
	makeFitBox();
	adjust();
	
	
	makeRollOvers('#partners .logos', true);
	
	//create loader... 
	cl = new CanvasLoader('ldr');
	cl.setColor('#eb0e33'); // default is '#000000'
	cl.setDiameter(73); // default is 40
	cl.setDensity(48); // default is 40
	cl.setRange(0.9); // default is 1.3
	cl.show();
	
	//hide teams...
	hideTeams();
	
	//mousefollower..
	//$(window).on('mousemove', moveBox);
	
	if(!is_touch_device()){
		//make scroller on the homepage...
		touch = false;
		makeScrollable($('#spkrbox'), $('#spkrdiv2'));
	}else{
		touch = true;
		enableTouchScrolls();
	}
	
	//alert(is_touch_device()); true on touch devices...

}



//detect touch devices..
function is_touch_device() {
  return 'ontouchstart' in window // works on most browsers 
	  || 'onmsgesturechange' in window; // works on ie10
};

function hideTeams(){
	for(k=0; k<=4; k++){
		$('#tmsg > #tm'+k).css('display','none');
	}
}

function chgTeam(v,obj){
	
	var obj = $('#bodycontent');
	$('#ldr').fadeIn('fast');
	
	TweenMax.to(obj, 0.5, {opacity:0, onComplete:function(){	 		
		//destroy scrollbars.......
		$(".scroller").mCustomScrollbar("destroy");	//initialize|create scrollbars......
		
		//show span..
		$('#xmails span').css('display','block');
		
		for(k=1; k<=4; k++){
			if(k == Number(v)){
				$('#tb'+k).css('opacity','1');
				$('#w'+k).css('opacity','1');
				$('#tm'+k).css('display','block');
				$('#m'+k).css('display','block');
			}else{			
				$('#tb'+k).css('opacity','0.3');
				$('#w'+k).css('opacity','0.3');
				$('#tm'+k).css('display','none');
				$('#m'+k).css('display','none');
			}
		}	
	
		$(".scroller").mCustomScrollbar({
			scrollButtons:{	enable:true	}
		});	
		
		
		TweenMax.to(obj, 0.5, {opacity:1}); 
		$('#ldr').fadeOut('fast');
		
	}}); 
	
}

function makeRollOvers(obj, bool){
	if(!bool){
		tv = {over:{opacity:1, y:-5}, out:{opacity:0.2, y:0}};
	}else{
		tv = {over:{opacity:1, y:-5}, out:{opacity:1, y:0}};
	}
	$(obj).bind('mouseover', function(){
		TweenMax.to(this, 0.5, tv.over);//{opacity:1, y:-5});
	});	
	$(obj).bind('mouseout', function(){
		TweenMax.to(this, 0.5, tv.out);
	});
}


function makeFitBox(){
	p = $('.fitbox');	
	//compute container's height...
	containerHeight = $(p).parent().height();
	containerWidth = $(p).parent().width();
	
	//set the height of the element...
	$(p).css('width','100%');
	$(p).css('height', containerHeight+'px');
	
}


function makeLogos(amount, div, url){
	cts = '';
	ig = '';
	for(y=1; y <= Number(amount); y++){
		if(y <= lgpart){
			ig = 'p' + Number(y) + '.jpg';
		}else{
			ig = 'px.jpg';
		}
		cts += '<a id="lg' + Number(y) + '" class="logos" href="http://' + url[eval(y-1)] +'" target="_blank" title="'+ url[eval(y-1)] +'"><img src="logos/'+ ig +'"/></a>';
	}
	cts += '<div id="clr"></div>';
	$('#'+String(div)).html(cts);
	
	/*//adjust the height of the logos....using the equal heights plugin..
	//$('#partners a').equalHeights();
	//$(".cols").equalHeights()
	
	$('#partners a').each(function(index, element){
		img = $(this).find('img');
		$(img).css('vertical-align', 'middle');
	})*/
	
	//alert($('#partners').height());
}


function adjust(){	
	//position the body vertically center...
	sp = $(window).height() - 650;
	//alert(sp + ' | ' + sp/2)
	$('#body').css('margin-top', sp/2 + 'px');

	nh = $(window).height();
	
	makeScrolls();	
}


function makeScrolls(){
	//make scroller on the homepage...
 	if(!is_touch_device()){
		makeScrollable($('#spkrbox'), $('#spkrdiv2'));
	}else{
		enableTouchScrolls();
	}
}

function colorChg(v){	
	$('#lynks a').each(function(index, element) { 		
	    if(Number(v)-1 == index){
			$(element).addClass('red');
			$(element).removeClass('white');
		}else{
			$(element).addClass('white');
			$(element).removeClass('red');
		}
		//alert( trim($(v).html()) + ' || ' + trim($(element).html()) );		
    });	
}

function mmenu(o,p){
	root = 'true';	//set root = true;
	shwx(o, p);		//load the shwx intx..
}

function shwx(v, cj){	
	//alert(root);	
	colorChg(v);	
		
	var obj = $('#bodycontent');
	$('#ldr').fadeIn('fast');
	
	TweenMax.to(obj, 0.5, {opacity:0, onComplete:function(){	
		//load first speaker if its the speaker tab...	
		
		//destroy scrollbars.......
		$(".scroller").mCustomScrollbar("destroy");	
		
		for(j=1;j<=7;j++){
			if(Number(v) == j){
				$('#t'+j).css('display','block');	
			}else{
				$('#t'+j).css('display','none');									
			}
		}
		
		//initialize|create scrollbars......
		$(".scroller").mCustomScrollbar({
			scrollButtons:{	enable:true	}
		});	
		
		if(Number(v) == 5){
			getSpeaker(Number(cj)); //load first speaker.. 
			root = true;
			on = true;
			
			//do scrollable..
		
		if(!is_touch_device()){
			makeScrollable($('#spkrbox2'), $('#spkrdiv'));
			makeScrollable($('#spkrbox2'), $('#spkrtp'));
		}else{
			enableTouchScrolls();
		}
			//dim images..
			//makes sure images are dimmed...
			dimImages();
	
		}else{	
			TweenMax.to(obj, 0.5, {opacity:1});
			$('#ldr').fadeOut('fast');
			on = false;
		}
		
		//hide all divs on tab4...
		if(Number(v) == 4){
			for(k=0; k<=4; k++){		
				$('#tb'+k).css('opacity','0.3');
				$('#w'+k).css('opacity','0.3');
			}
		}
			
		
		//hide all divs on tab4...
		if(Number(v) == 1){
			if(!is_touch_device()){
				makeScrollable($('#spkrbox'), $('#spkrdiv2'));
			}else{
				enableTouchScrolls();
			}
		}	
	
			
		if(Number(v) == 7){
			$("#regbtn").fadeOut('medium', function(){
				$("#prdiv").fadeIn('medium');
			});
		}else{
			$("#prdiv").fadeOut('medium', function(){
				$("#regbtn").fadeIn('medium');
			});
		}	

	}});
}

//show speaker on click on individual speaker...
function spkr(v){
	speakerId = Number(v);
	//root = 'false';
	shwx(5, speakerId); 	//switch to page and load speaker with id of v....
}

function doreg(){
	shwx(7, 0); 	//activate speaker btn and switchpage....	
}



function loadXML(){
	$.ajax({
		type: "GET",
		url: "event.xml",
		dataType: "xml",
		success: function(xml) {
			$(xml).find('speakers').each(function(){
				speakers.push({'firstname':$(this).find('fname').text(), 'lastname':$(this).find('lname').text(), 'bio':escape($(this).find('bio').text()), 'imgfile':$(this).attr('img')});
			});
			
			//insert names... //alert(speakers[5].bio);	//done...
			fixNames();
		}
	});
}

function fixNames(){	
	s = '';
	h = '';
	t = '';
	
	for(j=0; j<speakers.length; j++){
		t += '<a id="rb'+ eval(j+1) +'" class="rtbox" href="javascript:;" onclick="chgSpk('+ eval(Number(j)+1) +', this);">';
		t += '<span id="rfname" class="fname">' + speakers[Number(j)].firstname + '</span>';
		t += '<span id="rsname" class="sname">' + speakers[Number(j)].lastname + '</span>';
		t += '</a>';		
		
		s += '<a id="xa'+ eval(j+1) +'" href="javascript:;" onclick="chgSpk('+ eval(j+1) +', this);"><img src="thmbs/'+ speakers[Number(j)].imgfile +'.jpg"/></a>';
		
		h += '<a href="javascript:;" onclick="spkr('+ eval(j+1) +')"><img src="thmbs/'+ speakers[Number(j)].imgfile +'.jpg"/></a>';
	}	 
	                          
    s += '<div class="clr" id="clr"></div>';
	h += '<div class="clr" id="clr"></div>';
		
	
	wd = 106 * speakers.length;	
	
	//adjust widths...
	//fit the thmbs...
	$('#spkrdiv').css('width',wd).html(s);
	$('#spkrtp').css('width',wd).html(t);		//title of div...
	
	//for the homepage....
	$('#spkrdiv2').css('width',wd).html(h);	
	
	//make them rollovers...
	//makeRollOvers('#spkrdiv a', false);
	
	$('#spkrdiv a').bind('mouseover', function(){
		TweenMax.to(this, 0.5, {y:-7});
	});	
	
	$('#spkrdiv a').bind('mouseout', function(){
		TweenMax.to(this, 0.5, {y:0});
	});
	
}

function chgSpk(v,o){
	getSpeaker(v, o);
	root = 'false';
}

function getSpeaker(v, o){	
	curimg = Number(v);	
	var obj = $('#t5');
	
	$('#ldr').fadeIn('fast');	
	
	TweenMax.to(obj, 0.5, {opacity:0, onComplete:function(){	
			
		//destroy scrollbars.......
		$(".scroller").mCustomScrollbar("destroy");		
		
		$("#rmsg").css('opacity', 1);
		
		if(root == 'true'){
			$("#rmsg").hide(); 
		}else{
			$("#rmsg").show();
		}
		
		//show div content..		
		TweenMax.to(obj, 0.5, {opacity:1});
		$('#ldr').fadeOut('fast');
		
		if(on){
			TweenMax.to($('#bodycontent'), 0.5, {opacity:1});
			on = false;	//switch it off...
		}
		
		//get objIndex.... 
		//change contents from array value...		
		//alert(v);
		if(Number(v) > 0){	
		
			$("#rmsg").html(unescape(speakers[Number(v)-1].bio));				
			//update scrollbar info....					
			
		}else{
			$("#rmsg").html('');
		}
		
		dimImages(v);
		//alert(v);
				
	}});
	
}

function dimImages(gt){	
	for(j=1; j<= Number(speakers.length); j++){
		if(j == gt){
			if(root == 'true'){
				$('#xa'+j).css('opacity', 0.4);	
				$('#rb'+j).css('opacity', 0.4);	
			}else{
				$('#xa'+j).css('opacity', 1);	
				$('#rb'+j).css('opacity', 1);	
			}			
		}else{
			$('#xa'+j).css('opacity', 0.4);		
			$('#rb'+j).css('opacity', 0.4);				
		}
	}
	
	hideall();
	hashTags();
}


function hashTags(){
	
   //alert(hashes.length);
    htxt = String($('#rmsg').text());

	for(j=0;j<hashes.length;j++){		
		rt = hashes[j].id;		
		var rxp = new RegExp(rt, "gi");
		
		var b1 = new RegExp('#br', "gi");
		var b2 = new RegExp('#li', "gi");
		var b3 = new RegExp('#lx', "gi");
		var b4 = new RegExp('#ul', "gi");
		var b5 = new RegExp('#ux', "gi");
		
		//alert(rxp.toString());	becomes ::: /#pdflink/gi 
		htxt = htxt.replace(rxp, ' <a class="a-inline" href="'+ hashes[j].url +'" target="_blank">'+ hashes[j].txt +'</a>') ;	

		//replace all breaks..
		htxt = htxt.replace(b1, '<br/>'); 
		htxt = htxt.replace(b2, '<li>'); 
		htxt = htxt.replace(b3, '</li>'); 
		htxt = htxt.replace(b4, '<ul>'); 
		htxt = htxt.replace(b5, '</ul>'); 
		
	}
	
	//alert();
	$('#rmsg').html(htxt);
	
	//alert(htxt);
	$(".scroller").mCustomScrollbar({
		scrollButtons:{	enable:true	}
	});	
		
 
}

function hideall(){
	root = 'false';
	//alert(root);
}

flds = String('tname;tmail;tpro;tnum').split(';');

function send(){
	t = '';
	for(j=0;j<flds.length;j++){
		t += flds[j]+'='+$('#'+flds[j]).val();
		if(j < flds.length-1){
			t += '&';
		}
	}		

	///alert(t);
	
	$('#ldr').fadeIn('fast');	
	$('#xform').fadeTo('medium', 0.1, function(){
		
		$.ajax({			
			type:'post',			
			data:t,			
			url:'email.php',			
			success:function(msg){	
				//alert(msg);
				if(msg == "success"){
					alert('TEDxAdmin :: Registration sent successfully.....');
				}else{
					alert('...error sending message, try again later');
				}
				
				$('#ldr').fadeOut('fast')
				$('#xform').fadeTo('medium', 1);
				clr();
			}
			
		});
		
	});
}

function clr(){
	for(j=0;j<flds.length;j++){
		$('#'+flds[j]).val('');
	}	
}

/*function moveBox(e){
	bx = $('#boxx');
	sp = $('#spkrdiv');	
	sp2 = $('#spkrdiv2');

		//$(bx).fadeTo('medium', 0.4);
	//TweenMax.to(bx, 0.7, {css:{left:e.pageX, top:e.pageY}});
	
	xstr = $('#spkrbox').offset().left;
	xend = xstr + 960;
	xmid = xstr + 480;
	
	diff = 1600 - 960;
	range = xstr + diff;
	
	x1 = Number(xstr) - 900;
	
	t = e.pageX + xstr;
	
	if(e.pageX < ){
		TweenMax.to([sp2,sp], 0.7, {css:{left:x1}});
	}else if(e.pageX < xmid){
		TweenMax.to([sp,sp2], 0.7, {css:{left:0}});
	}

}*/


	function makeScrollable($outer, $inner){
		var extra = 800;
		//Get menu width
		var divWidth = $outer.width();
		//Remove scrollbars
		$outer.css({
			overflow: 'hidden'
		});
		//Find last image in container
		var lastElem = $inner.find('a:last');
		$outer.scrollLeft(0);
		//When user move mouse over menu
		$outer.unbind('mousemove').bind('mousemove',function(e){
			var containerWidth = lastElem[0].offsetLeft + lastElem.outerWidth() + 2*extra;
			var lft = (e.pageX - $outer.offset().left) * (containerWidth-divWidth) / divWidth - extra;
			//$outer.scrollLeft(left);
			TweenMax.killTweensOf($outer) 
			TweenMax.to($outer, 1, {scrollLeft:lft})
		});
	}

	/*	
		makeScrollable($('#spkrbox2'), $('#spkrdiv'));
		makeScrollable($('#spkrbox2'), $('#spkrtp'));		
		makeScrollable($('#spkrbox'), $('#spkrdiv2'));
	*/

	function enableTouchScrolls(){
		$('#spkrbox2').addClass('forcescroll');;
		$('#spkrbox').addClass('forcescroll');;
	}