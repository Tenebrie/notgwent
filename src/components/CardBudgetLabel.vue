<template>
	<div class="card-budget-label">
		<span>
			<i class="fas fa-coins"></i>
			<span v-if="isDisplayingAttackCost"> Budget cost: {{ powerCost }}</span>
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
			healthArmor: state => state.cardState.healthArmor,
			initiative: state => state.cardState.initiative,
			tribe: state => state.cardState.cardTribe,
			description: state => state.cardState.cardDescription
		}),

		isDisplayingAttackCost: function() { return this.displayedLabel === DisplayedBudgetLabel.ATTACK_COST },
		isDisplayingTribeCost: function() { return this.displayedLabel === DisplayedBudgetLabel.TRIBE_COST },
		isDisplayingDescriptionLabel: function() { return !this.displayedLabel || this.displayedLabel === DisplayedBudgetLabel.DESCRIPTION },

		powerCost: function() {
			if (this.attack < 0) {
				return 0
			}

			let powerCost
			powerCost = this.attack * this.initiative
			powerCost += (this.attackRange - 1) * 10
			powerCost += this.healthArmor * 15
			if (this.attackType === AttackType.HEALING) {
				powerCost += 5
			}
			return Math.round(powerCost)
		},

		tribeCost: function() {
			let tribeCost = 0
			if (this.tribe.length > 0) {
				tribeCost = this.tribe.split(';').length * 5
			}
			return Math.round(tribeCost)
		},

		descriptionCost: function() {
			let descriptionCost = 0
			let costTagPattern = /<cost=([0-9\-.]+)[\s/]*>/g

			let parsedCost = costTagPattern.exec(this.description)
			while (parsedCost) {
				descriptionCost += parseInt(parsedCost[1])
				parsedCost = costTagPattern.exec(this.description)
			}

			return descriptionCost
		},

		budget: function() {
			let totalCost = this.powerCost + this.tribeCost + this.descriptionCost
			return this.maximumBudget - totalCost
		},

		maximumBudget: function() {
			if (this.type === Type.LEADER) { return 200 }
			if (this.type === Type.HERO) { return 150 }
			return 120
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
