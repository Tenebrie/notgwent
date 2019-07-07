<template>
	<transition name="slide-fade" appear>
		<div class="toolbar-tab tab-features">
			<card-name></card-name>
			<features-card-title-textbox />
			<card-tribe></card-tribe>
			<card-description></card-description>
			<div class="dropdowns">
				<card-type-dropdown />
				<card-attack-dropdown />
				<card-health-dropdown />
				<card-initiative-textbox />
				<card-attack-type-dropdown />
			</div>
		</div>
	</transition>
</template>

<script>
import cardName from '../components/FeaturesCardNameTextbox.vue'
import cardTribe from '../components/FeaturesCardTribeTextbox.vue'
import cardDescription from '../components/FeaturesCardDescriptionTextbox.vue'
import CardAttackDropdown from '../components/CardAttackDropdown'
import CardHealthDropdown from '../components/CardHealthDropdown'
import CardInitiativeTextbox from '../components/CardInitiativeTextbox'
import FeaturesCardTitleTextbox from '../components/FeaturesCardTitleTextbox'
import CardAttackTypeDropdown from '../components/CardAttackTypeDropdown'
import CardTypeDropdown from '../components/CardTypeDropdown'

export default {
	components: {
		CardTypeDropdown,
		CardAttackTypeDropdown,
		FeaturesCardTitleTextbox,
		CardInitiativeTextbox,
		CardAttackDropdown,
		CardHealthDropdown,
		cardName,
		cardDescription,
		cardTribe
	}
}
</script>

<style lang="scss" scoped>
	.tab-features {
		.dropdowns {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
		}
	}
</style>
