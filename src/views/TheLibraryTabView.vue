<template>
	<transition name="slide">
		<div class="toolbar-tab tab-output">
			<div class='toolbar-tab-content'>
				<main-table></main-table>
			</div>
		</div>
	</transition>
</template>

<script>
import mainTable from '../components/TheLibraryContentList.vue'

export default {
	components: {
		mainTable
	}
}
</script>
