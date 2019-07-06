export const debounce = function(func, wait, immediate) {
	let timeout
	return function() {
		let context = this; let args = arguments
		let later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		let callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}

export const formatDate = function(date) {
	let d = new Date(date)
	let month = '' + (d.getMonth() + 1)
	let day = '' + d.getDate()
	let year = d.getFullYear()

	if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day

	return [day, month, year].join('.')
}

export const formatDateTime = function(date) {
	let d = new Date(date)
	let hours = '' + d.getHours()
	let minutes = '' + d.getMinutes()
	let month = '' + (d.getMonth() + 1)
	let day = '' + d.getDate()
	let year = d.getFullYear()

	if (hours.length < 2) hours = '0' + hours
	if (minutes.length < 2) minutes = '0' + minutes
	if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day

	return [hours, minutes].join(':') + ' ' + [day, month, year].join('.')
}

export const uuidv4 = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = Math.random() * 16 | 0; let v = c === 'x' ? r : (r & 0x3 | 0x8)
		return v.toString(16)
	})
}

export const toCamelCase = function(str) {
	if (str === undefined || str === null) {
		return ''
	}
	return str.replace(/[A-Z]/g, ' $&').replace(/^./, str.toUpperCase())
}

export const capitalize = function(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1)
}

export const stripMarkup = function(text) {
	const htmlTagPattern = /<[^>]+>/g
	return text.replace(htmlTagPattern, '')
}
