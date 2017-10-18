$(function(){
	let color=['c','d','h','s'];
	let poke=[];
	let flag={};
	// 产生52张扑克牌
	while(poke.length<52){
		let hua=color[Math.floor(Math.random()*color.length)];
		let num=Math.floor(Math.random()*13+1);
		if(!flag[`${hua}_${num}`]){
			poke.push({hua,num});
			flag[`${hua}_${num}`]=true;
		}
	}
	// 扑克牌金字塔
	let index=0;
	for(let i=0;i<7;i++){
		for(let j=0;j<=i;j++){
			let left=300-50*i+100*j,
				top=50*i;
			$('<div>').addClass('poke box')
			.attr('id',`${i}_${j}`)
			.data("num",poke[index].num)
			.css('background-image',`url(img/${poke[index].num}${poke[index].hua}.jpg)`)
			.appendTo('.zhuozi').delay(index*10)
			.animate({left,top,opacity:1});
			index++;
		}
	}
	// 左下角堆积
	for(;index<poke.length;index++){		
		$('<div>').addClass("poke zuo")
		// .attr('class',`poke ${index}`)
		.attr('id',`${-2}_${-2}`)
		.data("num",poke[index].num)
			.css({backgroundImage:`url(img/${poke[index].num}${poke[index].hua}.jpg)`})
			.appendTo('.zhuozi').delay(index*10)
			.animate({left:0,top:460,opacity:1});
			
	}
	let zindex=0;
	// 右按钮换牌
	$('.right').on('click',function(){
		if(!$('.zuo').length){return}				
		$('.zuo').last().css('zIndex',zindex++).animate({left:600,top:460}).removeClass('zuo').addClass('you');
		
	})	
	// 左按钮换牌
	$('.left').on('click',function(){
		if(!$('.you').length){return}
		$('.you').last().css('zIndex',zindex++).animate({left:0,top:460}).removeClass('you').addClass('zuo');
	})
	// 点击呈现点击状态
	let first=null;
	$('.zhuozi').on('click','.poke',function(e){
		let element=$(e.target);
		// $(element).animate({top:'-=10'});
		let ids=element.attr('id').split('_');
		let ele1=`#${ids[0]*1+1}_${ids[1]*1}`;
		let ele2=`#${ids[0]*1+1}_${ids[1]*1+1}`;
		if($(ele1).length||$(ele2).length){
			return ;
		}		
		element.toggleClass('active');
		if(element.hasClass('active')){
			element.animate({top:'-=20'})
		}else{
			element.animate({top:'+=20'})
		}
		if(!first){
			first=$(e.target);
		}else{
			// 消牌
			if(first.data('num')+element.data('num')==14||element.data('num')==13){
				$('.active').animate({top:0,left:600,opacity:0},function(){
					$(this).remove();
				})
			}else{
				$('.active').animate({top:'+=20'},function(){
					$(this).removeClass('active');
				})
			}
			first=null;
		}
	})	
})
