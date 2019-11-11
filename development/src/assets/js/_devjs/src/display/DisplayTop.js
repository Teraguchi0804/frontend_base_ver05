/**
 * fileOverview:
 * Project:
 * File: DisplayTop
 * Date:
 * Author: Teraguchi
 */


'use strict';

import checkClient from "../utils/ua/checkClient";

const EventEmitter = require('events').EventEmitter;
const EVENT = {
	MOVIE01COMP : 'movie01comp',
	MOVIE02COMP : 'movie02comp',
	MOVIE03COMP : 'movie03comp',
};

export default class DisplayTop {

	constructor() {

		this.isUA = true;
		this.checkClient = new checkClient();
		this.checkUA = this._checkUA.bind(this);
		this.onResize = this._onResize.bind(this);

		this.setup();
		this.setEvents();

	}

	setup() {

		this.checkUA();

		window.addEventListener('resize', this.onResize, false );

	}
	
	/**
	 * UAチェック
	 * @private
	 */
	_checkUA() {

		if(this.checkClient.isMobile() || this.checkClient.isTablet()) {
			// SP & Tab
			this.isUA = false;
		} else if(!this.checkClient.isMobile() || !this.checkClient.isTablet()) {
			// PC
			this.isUA = true;
		}

	}

	/**
	 * リサイズイベント
	 * @private
	 */
	_onResize() {

	}

	onLoad() {

		if(this.isUA) {


		} else if(!this.isUA){

		}

	}

	setEvents() {

		$(window).on('load', this.onLoad.bind(this));


	}

}