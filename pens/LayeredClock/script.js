window.addEventListener("DOMContentLoaded",() => {
	const c = new Clock7(".clock");
});

class Clock7 {
	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.timeUpdate();
	}
	get timeAsObject() {
		const date = new Date();
		let h = date.getHours();
		const m = date.getMinutes();
		const s = date.getSeconds();

		return { h, m, s };
	}
	get timeAsString() {
		const [h,m,s,ap] = this.timeDigitsGrouped;

		return `${h}:${m}:${s} ${ap}M`;
	}
	get timeDigitsGrouped() {
		// this accessible string uses the 12-hour clock
		let { h, m, s } = this.timeAsObject;
		const ap = h > 11 ? "P" : "A";
		// deal with midnight
		if (h === 0) h += 12;
		else if (h > 12) h -= 12;
		// prepend 0 to the minute and second if single digits
		if (m < 10) m = `0${m}`;
		if (s < 10) s = `0${s}`;

		return [h,m,s,ap];
	}
	timeUpdate() {
		// update the accessible timestamp in the `aria-label`
		this.el?.setAttribute("aria-label", this.timeAsString);
		// move the hands
		const time = this.timeAsObject;
		const minFraction = time.s / 60;
		const hrFraction = (time.m + minFraction) / 60;
		const twelveHrFraction = (time.h + hrFraction) / 12;

		this.el?.style.setProperty("--minAngle",`${360 * hrFraction}deg`);
		this.el?.style.setProperty("--hrAngle",`${360 * twelveHrFraction}deg`);
		// update the digits
		Array.from(document.querySelectorAll(`[data-unit]`)).forEach((unit,i) => {
			unit.innerText = this.timeDigitsGrouped[i];
		})
		// loop
		clearTimeout(this.timeUpdateLoop);
		this.timeUpdateLoop = setTimeout(this.timeUpdate.bind(this),1e3);
	}
}