<script>
import { AttackType, Element, PathType, Type } from '../util/constant'

export default {
	namespaced: true,
	state: {
		isFreeDraw: false,
		isFreeBuild: false,
		isFreeMove: false,
		isPermanent: false,
		cardName: '',
		cardTitle: '',
		cardDescription: '',
		cardTribe: '',
		cardType: Type.PAWN,
		cardPathType: PathType.NORMAL,
		cardElement: Element.GENERIC,
		cardGoldCost: 0,
		cardManaCost: 0,

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
			state.isFreeDraw = value.isFreeDraw
			state.isFreeBuild = value.isFreeBuild
			state.isFreeMove = value.isFreeMove
			state.isPermanent = value.isPermanent
			state.cardType = value.cardType
			state.cardPathType = value.cardPathType
			state.cardElement = value.cardElement
			state.cardGoldCost = value.cardGoldCost
			state.cardManaCost = value.cardManaCost

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
			if (state.cardType === Type.PRIME) {
				state.cardType = Type.PAWN
			}
			if (state.cardElement !== Element.GENERIC) {
				state.cardElement = Element.GENERIC
			}
		},
		clear(state) {
			state.cardName = ''
			state.cardTitle = ''
			state.cardDescription = ''
			state.cardTribe = ''
			state.isFreeDraw = false
			state.isFreeBuild = false
			state.isFreeMove = false
			state.isPermanent = false
			state.cardType = Type.PAWN
			state.cardPathType = PathType.NORMAL
			state.cardElement = Element.GENERIC
			state.cardGoldCost = 0
			state.cardManaCost = 0

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
		setFreeBuild(state, value) {
			state.isFreeBuild = value
		},
		setFreeDraw(state, value) {
			state.isFreeDraw = value
		},
		setFreeMove(state, value) {
			state.isFreeMove = value
		},
		setPermanent(state, value) {
			state.isPermanent = value
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
		setCardPathType(state, value) {
			state.cardPathType = value
		},
		setCardElement(state, value) {
			state.cardElement = value
		},
		setCardGoldCost(state, value) {
			state.cardGoldCost = value
		},
		setCardManaCost(state, value) {
			state.cardManaCost = value
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
			state.customImageOffsetX = value
		},
		setCustomImageOffsetY(state, value) {
			state.customImageOffsetY = value
		},
		setCustomImageZoom(state, value) {
			state.customImageZoom = value
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
