<template>
	<div class="card-budget-label">
		<span>
			<i class="fas fa-coins"></i>
			<span v-if="isDisplayingAttackCost"> Budget cost: {{ attackCost }}</span>
			<span v-if="isDisplayingHealthCost"> Budget cost: {{ healthCost }}</span>
			<span v-if="isDisplayingTribeCost"> Budget cost: {{ tribeCost }}</span>
			<span v-if="isDisplayingDescriptionLabel"> Card effect budget: {{ budget }} / {{ maximumBudget }}</span>
		</span>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { AttackType, DisplayedBudgetLabel, Type } from '../util/constant'

export default {
	props: {
		displayedLabel: String
	},
	components: {
	},
	computed: {
		...mapState({
			type: state => state.cardState.cardType,
			attack: state => state.cardState.attack,
			attackRange: state => state.cardState.attackRange,
			attackType: state => state.cardState.attackType,
			health: state => state.cardState.health,
			healthArmor: state => state.cardState.healthArmor,
			initiative: state => state.cardState.initiative,
			tribe: state => state.cardState.cardTribe
		}),

		isDisplayingAttackCost: function() { return this.displayedLabel === DisplayedBudgetLabel.ATTACK_COST },
		isDisplayingHealthCost: function() { return this.displayedLabel === DisplayedBudgetLabel.HEALTH_COST },
		isDisplayingTribeCost: function() { return this.displayedLabel === DisplayedBudgetLabel.TRIBE_COST },
		isDisplayingDescriptionLabel: function() { return !this.displayedLabel || this.displayedLabel === DisplayedBudgetLabel.DESCRIPTION },

		attackCost: function() {
			let attackCost = 0
			if (this.attack >= 0) {
				attackCost = this.attack * Math.pow(1.2, (this.attackRange - 1))
			}

			if (this.attackType === AttackType.HEALING) {
				attackCost *= 1.5
			} else {
				attackCost *= 1 + (100 - this.initiative) * 0.015
			}
			return Math.round(attackCost)
		},

		healthCost: function() {
			let healthCost = 0
			if (this.health > 0) {
				healthCost = this.health * Math.pow(1.5, this.healthArmor)
			}
			return Math.round(healthCost)
		},

		tribeCost: function() {
			let tribeCost = 0
			if (this.tribe.length > 0) {
				tribeCost = this.tribe.split(';').length * 2
			}
			return Math.round(tribeCost)
		},

		budget: function() {
			let attackCost = this.attackCost
			let healthCost = this.healthCost
			let tribeCost = this.tribeCost

			let totalCost = attackCost + healthCost + tribeCost
			return this.maximumBudget - totalCost
		},

		maximumBudget: function() {
			let baseBudget = 15
			let initiativePerPoint = 10
			if (this.type === Type.HERO) {
				baseBudget = 20
				initiativePerPoint = 8
			}
			if (this.type === Type.LEADER) {
				baseBudget = 25
				initiativePerPoint = 6
			}
			return baseBudget + Math.round(this.initiative / initiativePerPoint)
		}
	},
	methods: {
		...mapMutations({
			setInitiative: 'cardState/setInitiative'
		}),

		onInput: function(value) {
			if (value.length > 0 && isNaN(value)) {
				this.setInitiative(50)
				return
			}

			if (value.length === 0) {
				return
			}

			let initiative = parseInt(value)
			let normalizedInitiative = Math.max(1, Math.min(initiative, 99))
			this.setInitiative(-1)
			this.setInitiative(normalizedInitiative)
		}
	}
}
</script>

<style lang="scss" scoped>
	.card-budget-label {
		margin: 10px;
	}
</style>
