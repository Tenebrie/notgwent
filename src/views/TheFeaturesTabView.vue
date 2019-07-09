<template>
	<transition name="slide-fade" appear>
		<div class="toolbar-tab tab-features">
			<card-name></card-name>
			<features-card-title-textbox />
			<base-divider />
			<card-budget-label :displayed-label="DisplayedBudgetLabel.TRIBE_COST" />
			<card-tribe></card-tribe>
			<base-divider />
			<card-budget-label />
			<card-description></card-description>
			<base-divider />
			<div class="dropdowns">
				<card-type-dropdown />
				<card-initiative-textbox />
			</div>
			<base-divider />
			<card-budget-label :displayed-label="DisplayedBudgetLabel.ATTACK_COST" />
			<div class="dropdowns">
				<card-attack-dropdown />
				<card-attack-range-dropdown />
				<card-attack-type-dropdown />
			</div>
			<base-divider />
			<card-budget-label :displayed-label="DisplayedBudgetLabel.HEALTH_COST" />
			<div class="dropdowns">
				<card-health-dropdown />
				<card-health-armor-dropdown />
			</div>
		</div>
	</transition>
</template>

<script>
import BaseDivider from '../components/BaseDivider'
import cardName from '../components/FeaturesCardNameTextbox.vue'
import cardTribe from '../components/FeaturesCardTribeTextbox.vue'
import cardDescription from '../components/FeaturesCardDescriptionTextbox.vue'
import CardAttackDropdown from '../components/CardAttackDropdown'
import CardHealthDropdown from '../components/CardHealthDropdown'
import CardInitiativeTextbox from '../components/CardInitiativeTextbox'
import FeaturesCardTitleTextbox from '../components/FeaturesCardTitleTextbox'
import CardAttackTypeDropdown from '../components/CardAttackTypeDropdown'
import CardTypeDropdown from '../components/CardTypeDropdown'
import CardBudgetLabel from '../components/CardBudgetLabel'
import CardAttackRangeDropdown from '../components/CardAttackRangeDropdown'
import CardHealthArmorDropdown from '../components/CardHealthArmorDropdown'
import { DisplayedBudgetLabel } from '../util/constant'

export default {
	components: {
		CardHealthArmorDropdown,
		CardAttackRangeDropdown,
		BaseDivider,
		CardBudgetLabel,
		CardTypeDropdown,
		CardAttackTypeDropdown,
		FeaturesCardTitleTextbox,
		CardInitiativeTextbox,
		CardAttackDropdown,
		CardHealthDropdown,
		cardName,
		cardDescription,
		cardTribe
	},

	computed: {
		DisplayedBudgetLabel: function() { return DisplayedBudgetLabel }
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
