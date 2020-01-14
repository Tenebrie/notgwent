<script>
import { AttackType, Type } from '../util/constant'

export default {
	namespaced: true,
	state: {
		cardName: '',
		cardTitle: '',
		cardDescription: '',
		cardTribe: '',
		cardType: Type.PAWN,

		power: 10,
		attack: 5,
		health: 5,
		attackRange: 1,
		healthArmor: 0,
		initiative: 5,
		attackType: AttackType.NORMAL,
		customImageData: '',
		customImageOffsetX: 0,
		customImageOffsetY: 0,
		customImageZoom: 0
	},
	mutations: {
		load(state, value) {
			state.cardName = value.cardName
			state.cardTitle = value.cardTitle
			state.cardDescription = value.cardDescription
			state.cardTribe = value.cardTribe
			state.cardType = value.cardType

			state.power = value.power || 10
			state.attack = value.attack
			state.health = value.health
			state.attackRange = value.attackRange
			state.healthArmor = value.healthArmor
			state.initiative = value.initiative
			state.attackType = value.attackType
			state.customImageData = value.customImageData
			state.customImageOffsetX = value.customImageOffsetX
			state.customImageOffsetY = value.customImageOffsetY
			state.customImageZoom = value.customImageZoom || 0
		},
		clear(state) {
			state.cardName = ''
			state.cardTitle = ''
			state.cardDescription = ''
			state.cardTribe = ''
			state.cardType = Type.PAWN

			state.power = 5
			state.attack = 5
			state.health = 5
			state.attackRange = 1
			state.healthArmor = 0
			state.initiative = 10
			state.attackType = AttackType.NORMAL
			state.customImageData = ''
			state.customImageOffsetX = 0
			state.customImageOffsetY = 0
			state.customImageZoom = 0
		},
		setCardName(state, value) {
			state.cardName = value
		},
		setCardTitle(state, value) {
			state.cardTitle = value
		},
		setCardDescription(state, value) {
			state.cardDescription = value
		},
		setCardTribe(state, value) {
			state.cardTribe = value
		},
		setCardType(state, value) {
			state.cardType = value
		},

		setPower(state, value) {
			if (value.length > 0 && isNaN(value)) {
				state.power = 10
				return
			} else if (value.length === 0) {
				return
			}

			let power = parseInt(value)
			state.power = Math.max(1, Math.min(power, 99))
		},
		setAttack(state, value) {
			if (value.length > 0 && isNaN(value)) {
				state.attack = 5
				return
			} else if (value.length === 0) {
				return
			}

			let attack = parseInt(value)
			state.attack = Math.max(0, Math.min(attack, 99))
		},
		setHealth(state, value) {
			if (value.length > 0 && isNaN(value)) {
				state.attack = 5
				return
			} else if (value.length === 0) {
				return
			}

			let health = parseInt(value)
			state.health = Math.max(1, Math.min(health, 99))
		},
		setAttackRange(state, value) {
			state.attackRange = value
		},
		setHealthArmor(state, value) {
			state.healthArmor = value
		},
		setInitiative(state, value) {
			if (value.length > 0 && isNaN(value)) {
				state.initiative = 10
				return
			} else if (value.length === 0) {
				return
			}

			let initiative = parseInt(value)
			state.initiative = Math.max(1, Math.min(initiative, 99))
		},
		setAttackType(state, value) {
			state.attackType = value
		},
		setCustomImageData(state, value) {
			state.customImageData = value
		},
		setCustomImageOffsetX(state, value) {
			if (value.length > 0 && isNaN(value)) {
				state.customImageOffsetX = 0
				return
			} else if (value.length === 0) {
				return
			}

			state.customImageOffsetX = parseInt(value)
		},
		setCustomImageOffsetY(state, value) {
			if (value.length > 0 && isNaN(value)) {
				state.customImageOffsetY = 0
				return
			} else if (value.length === 0) {
				return
			}

			state.customImageOffsetY = parseInt(value)
		},
		setCustomImageZoom(state, value) {
			if (value.length > 0 && isNaN(value)) {
				state.customImageZoom = 0
				return
			} else if (value.length === 0) {
				return
			}

			state.customImageZoom = parseInt(value)
		},
		clearCustomImageData(state) {
			state.customImageData = ''
			state.customImageOffsetX = 0
			state.customImageOffsetY = 0
			state.customImageZoom = 0
		}
	}
}
</script>
