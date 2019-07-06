<template>
	<transition name="slide">
		<div class="toolbar-tab tab-texts">
			<div class="warning">
				Custom image will not be saved into local storage.
			</div>
			<custom-art-file-selector />
			<clear-custom-art-button />
			<custom-art-offset-x-textbox />
			<custom-art-offset-y-textbox />
		</div>
	</transition>
</template>

<script>
import CustomArtFileSelector from '../components/CustomArtFileSelector.vue'
import CustomArtOffsetXTextbox from '../components/CustomArtOffsetXTextbox'
import CustomArtOffsetYTextbox from '../components/CustomArtOffsetYTextbox'
import ClearCustomArtButton from '../components/ClearCustomArtButton'

export default {
	components: {
		ClearCustomArtButton,
		CustomArtFileSelector,
		CustomArtOffsetXTextbox,
		CustomArtOffsetYTextbox
	}
}
</script>

<style lang='scss' scoped>
	.tab-texts {
		.warning {
			margin: 10px;
		}
	}
</style>
