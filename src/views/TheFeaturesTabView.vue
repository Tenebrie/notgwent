<template>
	<transition name="slide-fade" appear>
		<div class="toolbar-tab tab-features">
			<base-textbox :value='cardName' @input='setCardName' placeholder='Name'>Card name</base-textbox>
			<base-textbox :value='cardTitle' @input='setCardTitle' placeholder='Title'>Card title</base-textbox>
			<base-divider />
			<card-budget-label :displayed-label="DisplayedBudgetLabel.TRIBE_COST" />
			<base-textbox :value='cardTribe' @input='setCardTribe' placeholder='Tribe'>Card tribes</base-textbox>
			<base-divider />
			<card-budget-label />
			<base-textbox :value='cardDescription' @input='setCardDescription' :rows='6' placeholder="A description of the card's effect">Card description</base-textbox>
			<base-divider />
			<div class="dropdowns">
				<card-type-dropdown />
			</div>
			<base-divider />
			<card-budget-label :displayed-label="DisplayedBudgetLabel.ATTACK_COST" />
			<div class="dropdowns">
				<base-textbox :value='cardPower' @input='setCardPower' placeholder='10'>Power</base-textbox>
				<base-textbox :value='cardAttack' @input='setCardAttack' placeholder='5'>Attack</base-textbox>
				<card-attack-range-dropdown />
				<card-attack-type-dropdown />
				<card-health-armor-dropdown />
			</div>
		</div>
	</transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BaseTextbox from '../components/BaseTextbox'
import BaseDivider from '../components/BaseDivider'
import { DisplayedBudgetLabel } from '../util/constant'
import CardBudgetLabel from '../components/CardBudgetLabel'
import CardTypeDropdown from '../components/CardTypeDropdown'
import CardAttackTypeDropdown from '../components/CardAttackTypeDropdown'
import CardAttackRangeDropdown from '../components/CardAttackRangeDropdown'
import CardHealthArmorDropdown from '../components/CardHealthArmorDropdown'

export default {
	components: {
		BaseTextbox,
		BaseDivider,
		CardBudgetLabel,
		CardTypeDropdown,
		CardAttackTypeDropdown,
		CardAttackRangeDropdown,
		CardHealthArmorDropdown
	},

	computed: {
		...mapState({
			cardName: state => state.cardState.cardName,
			cardTitle: state => state.cardState.cardTitle,
			cardTribe: state => state.cardState.cardTribe,
			cardDescription: state => state.cardState.cardDescription,
			cardPower: state => state.cardState.power,
			cardAttack: state => state.cardState.attack,
			cardHealth: state => state.cardState.health,
			cardInitiative: state => state.cardState.initiative
		}),

		DisplayedBudgetLabel: function() { return DisplayedBudgetLabel }
	},

	methods: {
		...mapMutations({
			setCardName: 'cardState/setCardName',
			setCardTitle: 'cardState/setCardTitle',
			setCardTribe: 'cardState/setCardTribe',
			setCardDescription: 'cardState/setCardDescription',
			setCardPower: 'cardState/setPower',
			setCardAttack: 'cardState/setAttack',
			setCardHealth: 'cardState/setHealth',
			setCardInitiative: 'cardState/setInitiative'
		})
	}
}
</script>

<style lang="scss" scoped>
	.tab-features {
		.dropdowns {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;

			/deep/div {
				flex-grow: 0;
			}
		}
	}
</style>
