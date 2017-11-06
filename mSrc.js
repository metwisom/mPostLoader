'use strict';

var mSrc = {
	attribute_name: 'mSrc',
	interval: 30,
	init: function(){
		document.addEventListener('DOMContentLoaded', () => {
			mSrc.start();
			mSrc.createHook();
		});
	},
	start: function(){
		mSrc.targetNodes = document.querySelectorAll('img[' + mSrc.attribute_name + ']');
		mSrc.image = new Image();
		mSrc.image.onload = () => {
			mSrc.targetNodes[mSrc.index].setAttribute('src', mSrc.src)
			mSrc.targetNodes[mSrc.index].removeAttribute(mSrc.attribute_name)
			mSrc.index++;
			setTimeout(() => {mSrc.load()}, mSrc.interval)
		}
		mSrc.load();
	},
	createHook: function(){
		var BreakForMSrcStart = {};
		var target = document.getElementsByTagName('body')[0];
		var is_found = false;
		var observer = new MutationObserver(function(mutations){
			mutations.forEach(function(mutation){
				mutation.addedNodes.forEach(function(item){
					if(item.nodeName == 'IMG'){
						is_found = true;
						mSrc.start();
						return;
					}
				})
				if(is_found) {
					return;
				}
			});
		});
		var config = {childList: true};
		observer.observe(target, config);
	},
	load: function(){
		if(mSrc.targetNodes.length <= mSrc.index){
			return mSrc.clear();
		}
		mSrc.src = mSrc.targetNodes[mSrc.index].getAttribute(mSrc.attribute_name);
		mSrc.image.src = mSrc.src;
	},
	clear: function(){
		mSrc.src = null;
		mSrc.image = null;
		mSrc.index = 0;
		mSrc.targetNodes = null;
		return true;
	},
	index: 0,
	src: null,
	image: null,
	targetNodes: null
}

mSrc.init()
