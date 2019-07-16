<template>
	<transition name="slide-fade" appear>
		<div class="toolbar-tab tab-texts">
			<custom-art-file-selector />
			<clear-custom-art-button />
			<custom-art-offset-x-textbox />
			<custom-art-offset-y-textbox />
			<custom-art-zoom-textbox />
		</div>
	</transition>
</template>

<script>
import CustomArtFileSelector from '../components/CustomArtFileSelector.vue'
import CustomArtOffsetXTextbox from '../components/CustomArtOffsetXTextbox'
import CustomArtOffsetYTextbox from '../components/CustomArtOffsetYTextbox'
import ClearCustomArtButton from '../components/ClearCustomArtButton'
import CustomArtZoomTextbox from '../components/CustomArtZoomTextbox'

export default {
	components: {
		CustomArtZoomTextbox,
		ClearCustomArtButton,
		CustomArtFileSelector,
		CustomArtOffsetXTextbox,
		CustomArtOffsetYTextbox
	}
}
</script>

<style lang='scss' scoped>
	.tab-texts {
	}
</style>
