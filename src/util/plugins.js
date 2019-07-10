import { Event } from './constant'
import { debounce } from 'throttle-debounce'

// let storageKey = 'cardLibrary'
let localStorage = {
	load: function() {
		// let json = window.localStorage.getItem(storageKey) || JSON.stringify('')
		return JSON.parse('{"data": []}')
	},
	save: function(content) {
		// window.localStorage.setItem(storageKey, JSON.stringify(content))
	}
}

export const autosaverPlugin = function(store) {
	store.commit('cardLibrary/load', localStorage.load())

	store.subscribe(function(mutation, state) {
		if (mutation.type === 'cardLibrary/push' || mutation.type === 'cardLibrary/delete') {
			let dataCopy = JSON.parse(JSON.stringify(state.cardLibrary.data))
			for (let cardIndex in dataCopy) {
				let card = dataCopy[cardIndex]
				card.customImageData = ''
			}
			localStorage.save(dataCopy)
		}
	})
}

export const undoRedoPlugin = (store) => {
	undoRedoHistory.init(store)

	let firstState = JSON.parse(JSON.stringify(store.state))
	undoRedoHistory.addState(firstState)

	let addStateDebouncedFunction = debounce(100, (state) => {
		undoRedoHistory.addState(JSON.parse(JSON.stringify(state)))
	})

	store.subscribe((mutation, state) => {
		addStateDebouncedFunction(state)
	})
}

export const undoRedoHistory = {
	store: {},
	history: [],
	currentIndex: -1,

	init(store) {
		this.store = store
	},

	addState(state) {
		// Invalidate old timeline
		if (this.currentIndex + 1 < this.history.length) {
			this.history.splice(this.currentIndex + 1)
		}

		this.history.push({ state: state })
		this.currentIndex++
	},

	undo(root) {
		const prevState = this.history[this.currentIndex - 1]
		if (prevState === undefined) {
			return
		}
		this.store.replaceState(JSON.parse(JSON.stringify(prevState.state)))
		this.fireEvents(root, this.history[this.currentIndex], prevState)
		this.currentIndex--
	},

	redo(root) {
		const nextState = this.history[this.currentIndex + 1]
		if (nextState === undefined) {
			return
		}
		this.store.replaceState(JSON.parse(JSON.stringify(nextState.state)))
		this.fireEvents(root, this.history[this.currentIndex], nextState)
		this.currentIndex++
	},

	fireEvents(root, previousState, targetState) {
		if (JSON.stringify(previousState.state.cardState) !== JSON.stringify(targetState.state.cardState)) {
			root.$emit(Event.CARD_STATE_UPDATED)
		}
		if (previousState && JSON.stringify(previousState.state.cardLibrary) !== JSON.stringify(targetState.state.cardLibrary)) {
			localStorage.save(targetState.state.cardLibrary.data)
		}
	}
}
