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

		attack: 5,
		attackRange: 1,
		healthArmor: 0,
		initiative: 10,
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

			state.attack = value.attack
			if (value.attackRange) state.attackRange = value.attackRange
			state.health = value.health
			if (value.healthArmor) state.healthArmor = value.healthArmor
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

			state.attack = 5
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

		setAttack(state, value) {
			state.attack = value
		},
		setAttackRange(state, value) {
			state.attackRange = value
		},
		setHealthArmor(state, value) {
			state.healthArmor = value
		},
		setInitiative(state, value) {
			state.initiative = value
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
